/**
 * Environment configuration for intake encryption
 */

import { createPilotAccessClient } from "@omnituum/secure-intake-client/presets/pilot-access";

export interface IntakeEnv {
  endpoint: string;
  x25519PubHex: string;
  kyberPubB64: string;
}

/**
 * Get intake config from Vite environment.
 * @throws if any required env var is missing or misconfigured
 */
export function getIntakeEnv(): IntakeEnv {
  const endpoint = import.meta.env.VITE_INTAKE_ENDPOINT;
  const x25519PubHex = import.meta.env.VITE_OMNITUUM_X25519_PUB_HEX;
  const kyberPubB64 = import.meta.env.VITE_OMNITUUM_KYBER_PUB_B64;

  if (!endpoint || !x25519PubHex || !kyberPubB64) {
    throw new Error(
      "Missing intake env vars. Set VITE_INTAKE_ENDPOINT, VITE_OMNITUUM_X25519_PUB_HEX, and VITE_OMNITUUM_KYBER_PUB_B64 in .env"
    );
  }

  // Guard: never post intake back to the app's own origin
  try {
    const host = new URL(endpoint).host;
    if (host.endsWith("loggielabs.com")) {
      throw new Error(
        "Misconfigured VITE_INTAKE_ENDPOINT: points at loggielabs.com. " +
        "Intake must be routed to the secure-intake worker, not the marketing site."
      );
    }
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error("VITE_INTAKE_ENDPOINT is not a valid URL: " + endpoint);
    }
    throw e;
  }

  return { endpoint, x25519PubHex, kyberPubB64 };
}

/**
 * Create the pilot access intake client configured with env vars.
 */
export function createIntakeClient() {
  const env = getIntakeEnv();
  return createPilotAccessClient({
    endpoint: env.endpoint,
    publicKeys: {
      x25519PubHex: env.x25519PubHex,
      kyberPubB64: env.kyberPubB64,
    },
  });
}
