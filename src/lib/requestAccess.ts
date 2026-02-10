/**
 * Client-side encrypted intake submission
 *
 * Encrypts form data locally before sending to server.
 * Server never sees plaintext PII.
 */

import { hybridEncrypt, blake3 } from "@omnituum/pqc-shared";
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
    system: data.system.trim(),
    useCase: data.useCase,
    timeline: data.timeline,
    compliance: [...data.compliance].sort(),
  };
}

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
 * @returns Submission result
 */
export async function submitRequestAccess(
  formData: RequestFormData,
  kind: "request_access" | "request_pilot_access" = "request_pilot_access"
): Promise<SubmitResult> {
  try {
    // Normalize for consistent hashing
    const normalized = normalizeFormData(formData, kind);

    // Generate deterministic ID
    const id = generateRequestId(normalized);

    // Get org public keys
    const orgPubKeys = getOrgPublicKeys();

    // Encrypt normalized payload (hybridEncrypt is async due to Kyber)
    const plaintext = JSON.stringify(normalized);
    const encoder = new TextEncoder();
    const encrypted = await hybridEncrypt(encoder.encode(plaintext), orgPubKeys);

    // Build envelope
    const envelope = {
      v: ENVELOPE_VERSION,
      id,
      encrypted: JSON.stringify(encrypted),
    };

    // Submit to intake endpoint
    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(envelope),
    });

    if (!response.ok && response.status !== 200) {
      const errorData = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: errorData.error || `Server error: ${response.status}`,
      };
    }

    const result = await response.json();

    if (result.ok) {
      return { ok: true, id: result.id, status: result.status };
    } else {
      return { ok: false, error: result.error || "Unknown error" };
    }
  } catch (err) {
    console.error("Intake submission error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Submission failed",
    };
  }
}
