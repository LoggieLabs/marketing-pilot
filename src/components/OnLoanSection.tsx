import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Address, Evidence } from './shared/Proof';
import { BlueprintLattice } from './shared/BlueprintLattice';
import { CONTRACT_MAP } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   §2 — THE FEELING, NAMED

   Type only: no cards, no icons, no illustration. After the motion of the
   hero this is meant to read like a page in a book, so the only devices are
   a heading, four hairline-separated statements and one paragraph.

   Writing rules held here: no brand names, no breach statistics, and none of
   the ideology vocabulary (sovereignty, surveillance capitalism, take back
   control). The product's own voice is flat and specific; a rant would break
   the page on the second scroll.

   Every sentence of the turn is redeemed further down the page — keys on your
   own machine in §3 (no-account), encryption before upload in §7
   (nobody-reading), the public ledger in §9 (engine-room) — so nothing here
   is a standalone claim. What the evidence line carries is the shipped source
   for each one, plus the one address a reader can actually paste into a block
   explorer.
   ═══════════════════════════════════════════════════════════════════════ */

/** The four sentences, verbatim from the section spec. Do not reword. */
const LIVED = [
  'An account can be suspended.',
  "A password can be reset by someone who isn't you.",
  'A company can read what you wrote in order to decide what to sell you.',
  'A laptop can die and take ten years with it.',
] as const;

/* InboxFactoryV7, read out of the contract map rather than retyped — the
   checkable artefact behind "not in a database we control". */
const INBOX_FACTORY = CONTRACT_MAP.find((row) => row.actual === 'InboxFactoryV7');

export function OnLoanSection() {
  return (
    /* noSeparator: this section sits directly beneath the hero, which is the
       case the primitive documents for it. It also keeps the hairline joint out
       from under the lattice canvas, which paints its own ground. */
    <SectionWrapper id="on-loan" noSeparator className="overflow-hidden">
      {/* The same structure family as the hero, drawn flat at its existing 6%:
          something you register without reading it. Static — no drift, no pulse. */}
      <BlueprintLattice />

      <div className="relative z-10">
        <SectionHeading eyebrow="WHY THIS EXISTS">
          An account can be closed. A password can be reset by someone who isn't you.
        </SectionHeading>

        <ul className="mt-12 max-w-2xl">
          {LIVED.map((statement) => (
            <li
              key={statement}
              className="border-t border-white/[0.06] py-5 first:border-t-0 first:pt-0
                         text-xl leading-relaxed text-gray-300"
            >
              {statement}
            </li>
          ))}
        </ul>

        {/* The turn. Deliberately one size quieter than the four fears above it. */}
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-gray-300">
          Loggie is built so none of those sentences can be written about it — not as a
          promise, as a structure. Your keys are made on your own machine. Your private
          things are encrypted before they leave it. The record of what's yours lives on a
          public ledger and in content-addressed storage, not in a database we control.
        </p>

        <Evidence>
          Shipped onboarding microcopy, setup-tasks.ts:26 — "A name and keys made on this
          device. Nothing leaves it until you attach the identity to your inbox." Sealed in
          the browser before it is uploaded: create-seal-v3.ts,
          file-panel/utils/encrypt-file.ts.
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
