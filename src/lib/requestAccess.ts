/**
 * Client-side encrypted intake submission
 *
 * This file is now a thin re-export layer over @omnituum/secure-intake-client.
 * For new code, prefer importing from the package directly.
 *
 * @deprecated Import from "@omnituum/secure-intake-client/presets/pilot-access" instead
 */

import { createIntakeClient } from "./env";

// Re-export types
export type {
  RequestFormData,
  PilotAccessKind,
  SubmitResult,
  CryptoCapability,
} from "@omnituum/secure-intake-client/presets/pilot-access";

// Create singleton client (lazy init on first use)
let client: ReturnType<typeof createIntakeClient> | null = null;

function getClient() {
  if (!client) {
    client = createIntakeClient();
  }
  return client;
}

/**
 * Check if the browser has required crypto primitives.
 * @deprecated Use createIntakeClient().checkCryptoCapability() instead
 */
export async function checkCryptoCapability(force = false) {
  return getClient().checkCryptoCapability(force);
}

/**
 * Clear cached capability to force re-check.
 * @deprecated Use createIntakeClient().resetCryptoCapabilityCache() instead
 */
export function resetCryptoCapabilityCache() {
  return getClient().resetCryptoCapabilityCache();
}

/**
 * Submit encrypted intake request.
 * @deprecated Use createIntakeClient().submit() instead
 */
export async function submitRequestAccess(
  formData: import("@omnituum/secure-intake-client/presets/pilot-access").RequestFormData,
  kind: "request_access" | "request_pilot_access" = "request_pilot_access",
  honeypot?: string
) {
  return getClient().submit(formData, kind, honeypot);
}

// Export normalization for tests
export { normalizeMultiline } from "@omnituum/secure-intake-client";
