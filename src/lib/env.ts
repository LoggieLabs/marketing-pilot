/**
 * Environment configuration for intake encryption
 */

import { createPilotAccessClient } from "@omnituum/secure-intake-client/presets/pilot-access";

export interface IntakeEnv {
  x25519PubHex: string;
  kyberPubB64: string;
}

/**
 * Get org public keys from Vite environment
 * @throws if required keys are missing
 */
export function getIntakeEnv(): IntakeEnv {
  const x25519PubHex = import.meta.env.VITE_OMNITUUM_X25519_PUB_HEX;
  const kyberPubB64 = import.meta.env.VITE_OMNITUUM_KYBER_PUB_B64;

  if (!x25519PubHex || !kyberPubB64) {
    throw new Error(
      "Missing org public keys. Set VITE_OMNITUUM_X25519_PUB_HEX and VITE_OMNITUUM_KYBER_PUB_B64 in .env"
    );
  }

  return { x25519PubHex, kyberPubB64 };
}

/**
 * Create the pilot access intake client configured with env public keys.
 * Call this once at app startup or lazily in component.
 */
export function createIntakeClient() {
  const env = getIntakeEnv();
  return createPilotAccessClient({
    endpoint: "/api/intake",
    publicKeys: {
      x25519PubHex: env.x25519PubHex,
      kyberPubB64: env.kyberPubB64,
    },
  });
}
