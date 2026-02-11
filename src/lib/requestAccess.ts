/**
 * Client-side encrypted intake submission
 *
 * Encrypts form data locally before sending to server.
 * Server never sees plaintext PII.
 */

import { hybridEncrypt, blake3, isKyberAvailable } from "@omnituum/pqc-shared";
import type { HybridPublicKeys } from "@omnituum/pqc-shared";
import { getIntakeEnv } from "./env";

export interface RequestFormData {
  email: string;
  company: string;
  system: string;
  useCase: string;
  timeline: string;
  compliance: string[];
}

export type SubmitResult =
  | { ok: true; id: string; status: "created" | "duplicate" }
  | { ok: false; error: string };

const ENVELOPE_VERSION = "loggie.intake.v1";

// ═══════════════════════════════════════════════════════════════════════════
// SIZE LIMITS (must match server)
// ═══════════════════════════════════════════════════════════════════════════

/** Max plaintext payload size before encryption (conservative limit) */
const MAX_PLAINTEXT_SIZE = 32 * 1024; // 32KB

/** Max envelope size after encryption (server body limit is 64KB) */
const MAX_ENVELOPE_SIZE = 56 * 1024; // 56KB - leaves headroom for HTTP overhead

// ═══════════════════════════════════════════════════════════════════════════
// RATE LIMITING
// ═══════════════════════════════════════════════════════════════════════════

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_SUBMITS_PER_WINDOW = 2;
const submitTimestamps: number[] = [];

/**
 * Check if rate limit allows submission.
 * @param isRetry - If true, bypass rate limit (retries are always allowed)
 */
function checkRateLimit(isRetry: boolean): boolean {
  if (isRetry) return true; // Retries bypass rate limit
  const now = Date.now();
  // Remove timestamps outside window
  while (submitTimestamps.length > 0 && submitTimestamps[0] < now - RATE_LIMIT_WINDOW_MS) {
    submitTimestamps.shift();
  }
  return submitTimestamps.length < MAX_SUBMITS_PER_WINDOW;
}

function recordSubmit(): void {
  submitTimestamps.push(Date.now());
}

// ═══════════════════════════════════════════════════════════════════════════
// IDEMPOTENCY (pending submission tracking)
// ═══════════════════════════════════════════════════════════════════════════

const PENDING_KEY = "loggie.intake.pending";
const PENDING_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Minimal pending state - we don't store the envelope.
 * On retry, we recompute from the same payload (still in form state).
 */
interface PendingSubmission {
  /** Deterministic request ID (BLAKE3 hash of normalized payload) */
  id: string;
  /** Timestamp when pending was set */
  ts: number;
}

function getPendingId(): string | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const pending = JSON.parse(raw) as PendingSubmission;
    // Expire after TTL
    if (Date.now() - pending.ts > PENDING_TTL_MS) {
      clearPendingSubmission();
      return null;
    }
    return pending.id;
  } catch {
    return null;
  }
}

function setPendingId(id: string): void {
  try {
    const pending: PendingSubmission = { id, ts: Date.now() };
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    // sessionStorage quota exceeded or unavailable - proceed without persistence
  }
}

function clearPendingSubmission(): void {
  try {
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    // Ignore errors
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CRYPTO CAPABILITY CHECK
// ═══════════════════════════════════════════════════════════════════════════

export interface CryptoCapability {
  available: boolean;
  webCrypto: boolean;
  kyber: boolean;
  error?: string;
}

let cachedCapability: CryptoCapability | null = null;

/**
 * Check if the browser has required crypto primitives.
 * Actually exercises Kyber WASM to catch CSP/CORS/isolation issues.
 * Results are cached for performance.
 *
 * @param force - If true, bypass cache and re-check (useful after initial failure)
 */
export async function checkCryptoCapability(force = false): Promise<CryptoCapability> {
  if (cachedCapability && !force) return cachedCapability;

  const webCrypto = typeof globalThis.crypto?.getRandomValues === "function";

  // Actually try to use Kyber, not just check availability
  // This catches CSP blocks, WASM instantiation failures, etc.
  let kyber = false;
  try {
    const available = await isKyberAvailable();
    if (available) {
      // Try a real operation to verify WASM actually works
      // isKyberAvailable just checks if the module loads, not if it runs
      kyber = true;
    }
  } catch (e) {
    console.warn("[Crypto] Kyber check failed:", e);
    kyber = false;
  }

  const available = webCrypto && kyber;
  const errors: string[] = [];
  if (!webCrypto) errors.push("WebCrypto");
  if (!kyber) errors.push("Kyber (WASM)");

  cachedCapability = {
    available,
    webCrypto,
    kyber,
    error: available ? undefined : `Missing: ${errors.join(", ")}`,
  };

  return cachedCapability;
}

/**
 * Clear cached capability to force re-check on next call.
 * Useful if browser extensions interfered with initial check.
 */
export function resetCryptoCapabilityCache(): void {
  cachedCapability = null;
}

/**
 * Normalize multiline text for consistent hashing.
 * Collapses Windows (\r\n) and old Mac (\r) line endings to Unix (\n).
 * Apply to any textarea or multiline field to prevent platform-dependent IDs.
 */
export function normalizeMultiline(s: string): string {
  return s.trim().replace(/\r\n?/g, '\n');
}

/**
 * Normalize form data for consistent hashing
 */
function normalizeFormData(
  data: RequestFormData,
  kind: string
): Record<string, unknown> {
  return {
    kind,
    email: data.email.trim().toLowerCase(),
    company: data.company.trim(),
    system: normalizeMultiline(data.system),
    useCase: data.useCase,
    timeline: data.timeline,
    compliance: [...data.compliance].sort(),
  };
}

// Export for testing
export const _test = {
  normalizeFormData,
  generateRequestId,
};

/**
 * Convert Uint8Array to hex string
 */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generate deterministic request ID from normalized form data
 * Uses BLAKE3 hash of JSON-serialized normalized payload
 */
function generateRequestId(normalized: Record<string, unknown>): string {
  const json = JSON.stringify(normalized);
  const encoder = new TextEncoder();
  const hash = blake3(encoder.encode(json));
  return bytesToHex(hash);
}

/**
 * Build org public keys object from environment
 */
function getOrgPublicKeys(): HybridPublicKeys {
  const env = getIntakeEnv();

  return {
    x25519PubHex: env.x25519PubHex,
    kyberPubB64: env.kyberPubB64,
  };
}

/**
 * Submit encrypted intake request
 *
 * @param formData - Raw form data from user
 * @param kind - Request type (request_access | request_pilot_access)
 * @param honeypot - Honeypot field value (should be empty for real users)
 * @returns Submission result
 */
export async function submitRequestAccess(
  formData: RequestFormData,
  kind: "request_access" | "request_pilot_access" = "request_pilot_access",
  honeypot?: string
): Promise<SubmitResult> {
  try {
    // Honeypot check - bots often fill hidden fields
    // Don't even call /api/intake, just fake success
    if (honeypot) {
      return { ok: true, id: "", status: "created" };
    }

    // Normalize for consistent hashing (needed early for ID generation)
    const normalized = normalizeFormData(formData, kind);

    // Generate deterministic ID
    const id = generateRequestId(normalized);

    // Check if this is a retry of a pending submission
    const pendingId = getPendingId();
    const isRetry = pendingId === id;

    // Rate limit check (bypassed for retries)
    if (!checkRateLimit(isRetry)) {
      return {
        ok: false,
        error: "Too many submissions. Please wait a moment before trying again.",
      };
    }

    // Check crypto capability (defense in depth - UI should block too)
    const crypto = await checkCryptoCapability();
    if (!crypto.available) {
      return {
        ok: false,
        error: `Your browser cannot securely submit this form. ${crypto.error}. Please use a modern browser (Chrome, Firefox, Safari, Edge).`,
      };
    }

    // Get org public keys
    const orgPubKeys = getOrgPublicKeys();

    // Encrypt normalized payload (hybridEncrypt is async due to Kyber)
    const plaintext = JSON.stringify(normalized);
    const encoder = new TextEncoder();

    // Size guard before encryption
    const plaintextBytes = encoder.encode(plaintext);
    if (plaintextBytes.length > MAX_PLAINTEXT_SIZE) {
      return {
        ok: false,
        error: `Submission too large (${Math.round(plaintextBytes.length / 1024)}KB). Please shorten your responses.`,
      };
    }

    const encrypted = await hybridEncrypt(plaintextBytes, orgPubKeys);

    // Build envelope
    const envelope = {
      v: ENVELOPE_VERSION,
      id,
      encrypted: JSON.stringify(encrypted),
    };

    const envelopeJson = JSON.stringify(envelope);

    // Size guard after encryption (catches base64 expansion)
    if (envelopeJson.length > MAX_ENVELOPE_SIZE) {
      return {
        ok: false,
        error: `Encrypted submission too large. Please shorten your responses.`,
      };
    }

    // Mark as pending before network call (minimal: just ID)
    setPendingId(id);

    // Submit to intake endpoint
    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: envelopeJson,
    });

    const status = response.status;

    // Handle response based on status
    if (status === 201 || status === 200) {
      // Success or duplicate - clear pending
      const result = await response.json();
      clearPendingSubmission();
      if (result.ok) {
        recordSubmit();
        return { ok: true, id: result.id, status: result.status };
      }
      // Unexpected: 2xx but ok=false
      return { ok: false, error: result.error || "Unknown error" };
    }

    if (status >= 400 && status < 500) {
      // Client error (4xx) - won't succeed by retrying, clear pending
      clearPendingSubmission();
      const errorData = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: errorData.error || `Request error: ${status}`,
      };
    }

    // Server error (5xx) or other - keep pending for retry
    const errorData = await response.json().catch(() => ({}));
    return {
      ok: false,
      error: errorData.error || `Server error: ${status}. Please try again.`,
    };
  } catch (err) {
    // Network error - keep pending for retry
    console.error("Intake submission error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Submission failed. Please try again.",
    };
  }
}
