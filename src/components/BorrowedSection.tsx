import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Address, Evidence } from './shared/Proof';
import { BlueprintLattice } from './shared/BlueprintLattice';
import { CONTRACT_MAP } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   MOST OF YOUR DIGITAL LIFE IS BORROWED SPACE

   Act one, second beat. Names the problem in terms of custody rather than
   disaster: the older framing ("an account can be suspended") was a list of
   things going wrong, which suits an evidence product. The real observation
   is quieter and applies even when nothing goes wrong at all — almost
   everything you have made lives in somebody else's database, and its
   continued existence is a business decision you do not get a vote on.

   The carved stone is the way in, and it carries no claim at all. It just
   sets the comparison the rest of the page has to earn: we produce far more
   than anyone before us, and much of it is more fragile than six letters cut
   into a rock.

   THE ABSOLUTE IS STILL SCOPED. "Loggie is designed so those failures do not
   determine whether your identity and recoverable history still exist" —
   identity and recoverable history, not everything. A file you never anchored
   dies with the laptop, and the page says so later.
   ═══════════════════════════════════════════════════════════════════════ */

/** Where it actually lives, and who decides. */
const BORROWED = [
  { yours: 'Your photos', theirs: 'live in somebody’s account.' },
  { yours: 'Your posts', theirs: 'live on somebody’s platform.' },
  { yours: 'Your messages', theirs: 'live inside somebody’s service.' },
  { yours: 'Your identity', theirs: 'is whatever their database says it is.' },
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

const INBOX_FACTORY = CONTRACT_MAP.find((row) => row.actual === 'InboxFactoryV7');

export function BorrowedSection() {
  return (
    <SectionWrapper id="borrowed" className="overflow-hidden">
      <BlueprintLattice />

      <div className="relative z-10">
        <SectionHeading
          eyebrow="WHY THIS IS DIFFERENT"
          lede={<>Everything you keep online is on loan. Loggie hands you the deed.</>}
        >
          Most of your digital life is borrowed space.
        </SectionHeading>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="max-w-2xl">
            <dl>
              {BORROWED.map((row) => (
                <div
                  key={row.yours}
                  className="border-t border-white/[0.06] py-4 first:border-t-0 first:pt-0"
                >
                  <dt className="inline text-xl leading-relaxed text-white">{row.yours} </dt>
                  <dd className="inline text-xl leading-relaxed text-gray-400">{row.theirs}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 text-lg leading-relaxed text-gray-300">
              None of that requires anything to go wrong. It is simply where the material sits, and
              whose decision it is whether it stays there. Loggie is designed so that decision stops
              being somebody else's — so your identity and recoverable history do not depend on a
              company still being here, a subscription still being paid, or an account still being
              open.
            </p>
          </div>

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

        {/* The comparison the rest of the page has to earn. No claim in it. */}
        <figure className="mt-16 max-w-2xl border-l-2 border-loggie-purple/40 pl-6">
          <blockquote className="text-lg text-gray-300 leading-relaxed">
            There is a boulder on the Huron River with a name cut into it, more than a century old.
            Nobody knows who carved it, exactly when, or what became of them. But the mark is still
            there.
          </blockquote>
          <figcaption className="mt-4 text-base text-gray-400 leading-relaxed">
            We produce more in a week than that person produced in a lifetime, and almost none of it
            is as durable as six letters in a rock. A platform closes. A format changes. A payment
            lapses. A password dies with the person who knew it.
          </figcaption>
        </figure>

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
