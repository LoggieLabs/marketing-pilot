/**
 * Environment configuration for intake encryption.
 *
 * The endpoint, the guard and the error messages below are from
 * 5e63f3f ("read intake endpoint from VITE_INTAKE_ENDPOINT env var") and are
 * kept verbatim. Intake does NOT post to this site — it goes to the
 * secure-intake worker, and the guard exists because loggielabs.com has no
 * intake worker behind it.
 *
 * Cloudflare Pages env var to set:
 *   VITE_INTAKE_ENDPOINT=https://secure-intake.omnituum.com/api/intake
 *
 * What changed: `createIntakeClient()` used to live here and statically
 * imported @omnituum/secure-intake-client. That package's published tarball
 * currently arrives without its `dist/`, which made the whole marketing site
 * unbuildable because of one form. The client is now constructed lazily in
 * lib/requestAccess.ts; this module stays pure config so it can be imported
 * from anywhere without dragging the encryptor in.
 */

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
