/**
 * Client-side encrypted intake submission.
 *
 * The encryptor (@omnituum/secure-intake-client) is loaded lazily, at submit
 * time, rather than imported statically. Two reasons:
 *
 *  1. It is a git dependency whose published tarball currently arrives without
 *     its `dist/` output, so a static import makes the whole marketing site
 *     unbuildable because of one form. See README → "Open decisions".
 *  2. It keeps the post-quantum crypto bundle off the critical path for the
 *     ~99% of visitors who never submit anything.
 *
 * The endpoint comes from lib/env.ts — VITE_INTAKE_ENDPOINT, pointing at the
 * secure-intake worker, with a guard that refuses to post intake back at
 * loggielabs.com. Never hardcode an endpoint here.
 *
 * SECURITY INVARIANT, and it is the only one that matters here: if the
 * encryptor cannot be loaded or cannot run, this module returns an error and
 * sends NOTHING. There is no plaintext fallback path, and there must never be
 * one — the form's entire claim is that the server only ever sees ciphertext.
 */

import { getIntakeEnv } from './env';

export interface RequestFormData {
  email: string;
  company: string;
  system: string;
  useCase: string;
  timeline: string;
  compliance: string[];
}

export type PilotAccessKind = 'request_access' | 'request_pilot_access';

export interface SubmitResult {
  ok: boolean;
  id?: string;
  status?: string;
  error?: string;
}

const UNAVAILABLE =
  "The encrypted form isn't available right now, so nothing was sent — we won't transmit this in the clear. Email hello@loggielabs.com instead.";

type IntakeClient = {
  submit: (data: RequestFormData, kind: string, honeypot?: string) => Promise<SubmitResult>;
  checkCryptoCapability: (force?: boolean) => Promise<unknown>;
  resetCryptoCapabilityCache: () => void;
};

let clientPromise: Promise<IntakeClient | null> | null = null;

function loadClient(): Promise<IntakeClient | null> {
  if (clientPromise) return clientPromise;

  clientPromise = (async () => {
    let env: ReturnType<typeof getIntakeEnv>;
    try {
      // Throws on a missing var, a bad URL, or an endpoint aimed at
      // loggielabs.com, which has no intake worker behind it.
      env = getIntakeEnv();
    } catch (err) {
      console.error('Intake disabled: intake environment is not configured.', err);
      return null;
    }

    try {
      // The specifier is held in a variable so neither TypeScript nor Vite
      // resolves it at build time: a missing or unbuilt package has to degrade
      // to a runtime error, not a build failure.
      const specifier = '@omnituum/secure-intake-client/presets/pilot-access';
      const mod = (await import(/* @vite-ignore */ specifier)) as {
        createPilotAccessClient: (cfg: unknown) => IntakeClient;
      };
      return mod.createPilotAccessClient({
        endpoint: env.endpoint,
        publicKeys: {
          x25519PubHex: env.x25519PubHex,
          kyberPubB64: env.kyberPubB64,
        },
      });
    } catch (err) {
      console.error('Intake disabled: the encryption client could not be loaded.', err);
      return null;
    }
  })();

  return clientPromise;
}

/** Check whether this browser has the primitives the encryptor needs. */
export async function checkCryptoCapability(force = false): Promise<unknown> {
  const client = await loadClient();
  return client ? client.checkCryptoCapability(force) : null;
}

export async function resetCryptoCapabilityCache(): Promise<void> {
  const client = await loadClient();
  client?.resetCryptoCapabilityCache();
}

/**
 * Encrypt in the browser, then POST the ciphertext. Returns an error — and
 * sends nothing at all — if encryption is unavailable for any reason.
 */
export async function submitRequestAccess(
  formData: RequestFormData,
  kind: PilotAccessKind = 'request_access',
  honeypot?: string,
): Promise<SubmitResult> {
  const client = await loadClient();
  if (!client) return { ok: false, error: UNAVAILABLE };

  try {
    return await client.submit(formData, kind, honeypot);
  } catch (err) {
    console.error('Intake submission failed before or during encryption.', err);
    return { ok: false, error: UNAVAILABLE };
  }
}
