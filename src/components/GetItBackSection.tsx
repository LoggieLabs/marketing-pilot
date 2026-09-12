import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution, Affirm } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   PROOF TWO — WIPE THE LAPTOP

   The deepest emotional payload on the page, and the best sentence on the
   site: "Wipe the laptop. Sign once. It comes back."

   It earns the staged treatment below because it is a test a reader can
   imagine performing, and understanding it requires no knowledge of
   Ethereum, IPFS, key derivation or post-quantum cryptography. That makes it
   worth more than several paragraphs of architecture.

   WRITING RULE, and it is not negotiable: describe recovery in exactly these
   words. Never attach "verified" or "proven" to cross-device recovery. What
   has been demonstrated is cross-origin recovery in the same browser plus one
   external-machine run; our own docs name a clean second machine as a stronger
   open gate.

   All three recovery states are shown, including the amber one. Showing only
   the green one would be both the less honest and the less persuasive choice.
   ═══════════════════════════════════════════════════════════════════════ */

const GONE = ['No keys.', 'No identity.', 'No local database.'] as const;

const NOT_NEEDED = ['No support ticket.', 'No password reset.', 'No company administrator.'] as const;

const RECOVERY_STATES = [
  { tone: 'green', label: 'Recoverable from any device' },
  { tone: 'amber', label: 'Recovery not enabled' },
  { tone: 'grey', label: 'Checking recovery' },
] as const;

export function GetItBackSection() {
  return (
    <SectionWrapper id="get-it-back">
      <SectionHeading eyebrow="PROOF TWO">Wipe the laptop. Sign once. It comes back.</SectionHeading>

      {/* The staged sequence. Three beats, each one a thing the reader can
          picture doing, with the payoff in the middle column. */}
      <ol className="mt-14 grid gap-6 md:grid-cols-3 items-stretch">
        <li className="code-material rounded-xl p-6">
          <p className="mono text-2xs text-gray-400">1 — delete everything local</p>
          <p className="mt-4 text-lg font-medium text-white">Clear the browser. Throw the machine away.</p>
          <ul className="mt-4 space-y-1.5">
            {GONE.map((line) => (
              <li key={line} className="text-sm text-gray-400">
                {line}
              </li>
            ))}
          </ul>
        </li>

        <li className="code-material rounded-xl p-6">
          <p className="mono text-2xs text-gray-400">2 — on a different computer</p>
          <p className="mt-4 text-lg font-medium text-white">
            Connect the same wallet. Sign once.
          </p>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            One signature. That is the entire recovery procedure.
          </p>
        </li>

        <li className="card-material rounded-xl p-6">
          <p className="mono text-2xs text-gray-400">3 — it comes back</p>
          <p className="mt-4 text-lg font-medium text-white">Your recoverable Loggie returns.</p>
          <p className="mt-4 text-sm">
            <Affirm>Recoverable from any device</Affirm>
          </p>
          <ul className="mt-4 space-y-1.5">
            {NOT_NEEDED.map((line) => (
              <li key={line} className="text-sm text-gray-400">
                {line}
              </li>
            ))}
          </ul>
        </li>
      </ol>

      <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl space-y-5">
          <p className="text-lg text-gray-300 leading-relaxed">
            Your identity and keys restore from an encrypted backup your own inbox points at, and
            your conversations, anchored files, anchored folder manifests, journal and contacts
            rebuild from the chain and the storage network. There is nobody to ask, because there is
            nobody in the loop.
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

          <p className="mt-6 text-sm text-gray-400 leading-relaxed">
            Your content survives your machine: encrypted content is copied to a second, physically
            separate node on the public storage network. When that copy cannot be confirmed, the app
            reports "incomplete" rather than claiming success.
          </p>

          <Caution className="mt-6">
            <strong className="font-semibold text-amber-200">What does not come back:</strong> files
            you never anchored, and local-only folder details. Anything still showing "Saved" lives
            only on the machine you made it on. Journal entries anchor the moment you save; files do
            not yet.
          </Caution>
        </div>
      </div>
    </SectionWrapper>
  );
}
