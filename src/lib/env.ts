/**
 * Environment configuration for intake encryption
 */

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
