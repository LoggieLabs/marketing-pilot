import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution, Affirm } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   §6 — WIPE THE LAPTOP

   The deepest emotional payload on the page — the fear of losing everything,
   answered structurally — and the section that demonstrates the honesty
   reflex by naming what does not come back and the bug that was found the
   hard way.

   WRITING RULE, and it is not negotiable: describe recovery in exactly these
   words. Never attach "verified" or "proven" to cross-device recovery. What
   has been demonstrated is cross-origin recovery in the same browser plus one
   external-machine run; our own docs name a clean second machine as a stronger
   open gate.

   All three recovery states are shown, including the amber one. Showing only
   the green one would be both the less honest and the less persuasive choice.
   ═══════════════════════════════════════════════════════════════════════ */

const RECOVERY_STATES = [
  { tone: 'green', label: 'Recoverable from any device' },
  { tone: 'amber', label: 'Recovery not enabled' },
  { tone: 'grey', label: 'Checking recovery' },
] as const;

export function GetItBackSection() {
  return (
    <SectionWrapper id="get-it-back">
      <SectionHeading eyebrow="PROOF TWO">Wipe the laptop. Sign once. It comes back.</SectionHeading>

      <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl space-y-5">
          <p className="text-lg text-gray-300 leading-relaxed">
            Disconnect. Clear the browser completely. Throw the machine away. On a different
            computer, connect the same wallet and approve one signature — your identity and keys
            restore from an encrypted backup your own inbox points at, and your conversations,
            anchored files, anchored folder manifests, journal and contacts rebuild from the chain
            and the storage network. There is no support ticket in that sentence, because there is
            nobody to ask.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            We found the sharp edge here the hard way. A test on a fresh machine recovered 0 of 12
            files, because a public blockchain node refused a query that reached back too far. It is
            a fixed bug now, with a bounded chunked scanner and a regression test named after the
            failure.
          </p>

          <Evidence>
            external-acceptance-run-01.md — zero-state run: inbox and encrypted backup found on
            chain, one-signature restore, conversations reconstructed from chain. FINDING 1 in the
            same run (MetaMask "range 26990 exceeds limit of 10000") is pinned by
            scan-logs-bounded.test.ts. setBackupPointer on UserInboxV7Impl.sol:878. Four objects
            were served byte-exact from ipfs.io and dweb.link by an independent Kubo node after the
            originating node went dark (RUX-F7_C3_INDEPENDENT_NODE.md).
          </Evidence>
        </div>

        <div>
          {/* The two panels, the one mono label between them. */}
          <div className="grid sm:grid-cols-2 gap-4 items-stretch">
            <div className="code-material rounded-xl p-5">
              <p className="mono text-2xs text-gray-400">browser site data cleared</p>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                No keys. No identity. No local database. A different computer entirely.
              </p>
            </div>
            <div className="code-material rounded-xl p-5">
              <p className="mono text-2xs text-gray-400">same wallet, one signature</p>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                <Affirm>Recoverable from any device</Affirm>
              </p>
            </div>
          </div>
          <p className="mono text-2xs text-gray-400 mt-3">between the two: 1 signature</p>

          {/* All three states the app will actually show you. */}
          <div className="mt-8">
            <p className="text-sm text-gray-400 leading-relaxed">
              The app never guesses. Home reads one of three honest lines, and Journal entries carry
              the same discipline per entry:
            </p>
            <ul className="mt-4 space-y-2.5">
              {RECOVERY_STATES.map((state) => (
                <li key={state.label} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      state.tone === 'green'
                        ? 'bg-green-400'
                        : state.tone === 'amber'
                          ? 'bg-amber-300'
                          : 'bg-gray-500'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      state.tone === 'green'
                        ? 'text-green-400'
                        : state.tone === 'amber'
                          ? 'text-amber-300'
                          : 'text-gray-400'
                    }`}
                  >
                    {state.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-sm text-gray-400 leading-relaxed">
            Your content survives your machine: encrypted content is copied to a second, physically
            separate node on the public storage network. When that copy cannot be confirmed, the app
            reports "incomplete" rather than claiming success.
          </p>
        </div>
      </div>

      <Caution className="mt-12 max-w-2xl">
        <strong className="font-semibold text-amber-200">What does not come back:</strong> files you
        never anchored, and local-only folder details. Anything still showing "Saved" lives only on
        the machine you made it on. Journal entries anchor the moment you save; files do not yet.
      </Caution>
    </SectionWrapper>
  );
}
