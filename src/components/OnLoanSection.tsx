import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Address, Evidence } from './shared/Proof';
import { BlueprintLattice } from './shared/BlueprintLattice';
import { CONTRACT_MAP } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   WHY IT WORKS THIS WAY

   This section owns the line the site used to open with. As a hero it stated a
   philosophy before the reader had felt any pain, so they had to reverse-
   engineer the benefit out of the architecture. Arriving here — after the job
   and the situations — it lands, because by now the reader knows why the
   ownership question is the one underneath everything else.

   Names the failure modes first, then defines what "yours" actually means —
   operationally, as five checkable properties, not philosophically. That
   definition is the point of the section: "ownership" is Web3 rhetoric until
   you say which specific things stop depending on us.

   TWO CORRECTIONS LIVE HERE, both from review:

   1. The old list repeated "A password can be reset by someone who isn't you"
      as both the headline and a bullet. Fixed.

   2. The old turn read "Loggie is built so none of those sentences can be
      written about it". That absolute is broader than the implementation
      guarantees and contradicted our own disclosure: a file you never
      anchored dies with the laptop. The claim is now scoped to identity and
      recoverable history, which is what actually survives.

   Writing rules held here: no brand names, no breach statistics, and none of
   the ideology vocabulary (sovereignty, surveillance capitalism, take back
   control). The product's own voice is flat and specific; a rant would break
   the page on the second scroll.
   ═══════════════════════════════════════════════════════════════════════ */

/** The five failure modes, each one a thing a reader has personally lived. */
const FAILURES = [
  'An account can be suspended.',
  'A password can be reset by someone else.',
  'A platform can inspect what you store.',
  'A company can disappear.',
  'A computer can fail.',
] as const;

/**
 * What "yours" means here — five properties you can check, not a philosophy.
 * Each one is demonstrated later in the page.
 */
const OWNERSHIP = [
  'Your wallet controls the inbox.',
  'Your device derives the keys.',
  'Private content leaves your device already encrypted.',
  'Recovery does not require Loggie Labs.',
  'Public proofs can be checked without Loggie Labs.',
] as const;

/* InboxFactoryV7, read out of the contract map rather than retyped. */
const INBOX_FACTORY = CONTRACT_MAP.find((row) => row.actual === 'InboxFactoryV7');

export function OnLoanSection() {
  return (
    <SectionWrapper id="on-loan" className="overflow-hidden">
      {/* The same structure family as the hero, drawn flat at its existing 6%:
          something you register without reading. Static — no drift, no pulse. */}
      <BlueprintLattice />

      <div className="relative z-10">
        <SectionHeading
          eyebrow="WHY IT WORKS THIS WAY"
          lede={<>Your digital life shouldn't depend on somebody else's account database.</>}
        >
          Everything you keep online is on loan. Loggie hands you the deed.
        </SectionHeading>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="max-w-2xl">
            <ul>
              {FAILURES.map((statement) => (
                <li
                  key={statement}
                  className="border-t border-white/[0.06] py-4 first:border-t-0 first:pt-0
                             text-xl leading-relaxed text-gray-300"
                >
                  {statement}
                </li>
              ))}
            </ul>

            <p className="mt-10 text-lg leading-relaxed text-gray-300">
              Loggie is designed so those failures do not determine whether your identity and
              recoverable history still exist.
            </p>
          </div>

          {/* The operational definition. This is the section's real payload. */}
          <div className="card-material rounded-xl p-7">
            <p className="mono text-2xs text-loggie-cyan/90">What "yours" means here</p>
            <ul className="mt-5 space-y-4">
              {OWNERSHIP.map((property) => (
                <li key={property} className="flex gap-3 text-base leading-relaxed text-gray-200">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-loggie-purple"
                    aria-hidden="true"
                  />
                  {property}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-gray-400">
              Every one of those is demonstrated further down this page, with the artefact you would
              need to check it yourself.
            </p>
          </div>
        </div>

        <Evidence>
          Shipped onboarding microcopy, setup-tasks.ts:26 — "A name and keys made on this device.
          Nothing leaves it until you attach the identity to your inbox." Sealed in the browser
          before it is uploaded: create-seal-v3.ts, file-panel/utils/encrypt-file.ts.
          {INBOX_FACTORY ? (
            <>
              {' '}
              Your inbox is a contract your own wallet owns, deployed by {INBOX_FACTORY.actual} on
              Ethereum's Sepolia test network:{' '}
              <Address value={INBOX_FACTORY.address} label={INBOX_FACTORY.actual} />
            </>
          ) : null}
        </Evidence>
      </div>
    </SectionWrapper>
  );
}
