import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence } from './shared/Proof';
import { FINDINGS_SUMMARY } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   §10 — WE PUBLISH OUR OWN BUGS

   The thing that retroactively makes every claim above credible, and the one
   a competitor cannot copy without rebuilding their culture.

   DELIBERATELY THE LEAST DESIGNED SECTION ON THE PAGE, and that is the
   point: a plain table with hairline rules, no background lattice, no cards,
   no icons. It should read as a printed document rather than a features grid.
   Resist every instinct to make it look better.

   Green checks and amber warnings are mixed in the same table so it cannot
   read as a brag reel.

   SOURCING RULE: publish the counts and the practice. Never link the internal
   defect visualiser on 127.0.0.1:4173 or the internal docs site on
   localhost:3333 — the static copy at /status is the public surface.
   ═══════════════════════════════════════════════════════════════════════ */

export function OwnBugsSection() {
  return (
    <SectionWrapper id="own-bugs">
      <SectionHeading eyebrow="THE DIFFERENTIATOR">We publish our own bugs.</SectionHeading>

      <div className="mt-10 max-w-2xl space-y-5">
        <p className="text-lg text-gray-300 leading-relaxed">
          A product whose whole pitch is "you don't have to trust us" has exactly one duty: never
          say something it cannot show. Here is what that looks like in practice.
        </p>
        <p className="text-base text-gray-300 leading-relaxed">
          We keep a generated register of our own contract defects, and for each one we state
          whether it is fixed in the source or still present in the deployed contract. It is on our
          website, not only in our repository.
        </p>
      </div>

      {/* The full eleven-row register lives at /status. On the homepage the
          counts do the work: the table was a wall of solidity-specific rows a
          visitor could not act on, and burying the reader in it weakened the
          one sentence that actually lands. */}
      <div className="mt-10 max-w-2xl border-y border-white/[0.06] py-8">
        <p className="text-lg text-gray-200 leading-relaxed">
          Loggie currently has {FINDINGS_SUMMARY.total} recorded contract findings.{' '}
          {FINDINGS_SUMMARY.high} are high severity. {FINDINGS_SUMMARY.stillOnChain} remain present
          in deployed Sepolia bytecode.
        </p>
        <p className="mt-4 text-base text-gray-400 leading-relaxed">
          That is one reason Loggie is on a test network and does not handle real ETH. Every
          finding, its remediation, and the difference between what is fixed in source and what is
          still deployed is public.
        </p>
        <Link
          to="/status"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-loggie-cyan
                     hover:text-loggie-cyan/80 transition-colors"
        >
          View live status
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-12 max-w-2xl space-y-5">
        <p className="text-base text-gray-300 leading-relaxed">
          Our own architecture audit put roughly a hundred questions to the codebase and found
          forty-seven places where two parts of the system each believed they were the authority —
          including one fabricated constant that was shipping. We wrote it down, closed every
          release-blocking one, and left the list up.
        </p>
        <p className="text-base text-gray-300 leading-relaxed">
          We also retract. One of our own anchoring claims failed its evidence check and was
          withdrawn with a signed correction and the lesson attached: never infer chain state from a
          manually injected record.
        </p>
        <p className="text-base text-gray-300 leading-relaxed">
          And we threw out a marketing image of our own app because it contained a fake VERIFIED
          badge. A product claiming verifiable truth does not advertise with a fake verification
          screenshot.
        </p>
      </div>

      {/* The practices. Plain list, hairline rules, same document register. */}
      <dl className="mt-12 max-w-2xl divide-y divide-white/[0.06] border-y border-white/[0.06]">
        <div className="py-5">
          <dt className="text-sm font-semibold text-white">It refuses to weaken itself</dt>
          <dd className="mt-1.5 text-sm text-gray-400 leading-relaxed">
            Ask for post-quantum encryption when the other person has no post-quantum key and Loggie
            sends nothing at all. There is a test whose entire job is to prove that nothing happened.
          </dd>
        </div>
        <div className="py-5">
          <dt className="text-sm font-semibold text-white">It says incomplete instead of done</dt>
          <dd className="mt-1.5 text-sm text-gray-400 leading-relaxed">
            When the durability layer cannot confirm your content reached a second machine, it
            reports incomplete. It never reports a success it cannot prove.
          </dd>
        </div>
        <div className="py-5">
          <dt className="text-sm font-semibold text-white">It polices its own words</dt>
          <dd className="mt-1.5 text-sm text-gray-400 leading-relaxed">
            Tamper-evident — never tamper-proof, unhackable or quantum-proof. That rule is enforced
            in the metadata the app actually ships, not in a style guide nobody reads.
          </dd>
        </div>
        <div className="py-5">
          <dt className="text-sm font-semibold text-white">Seven gates before a build is trusted</dt>
          <dd className="mt-1.5 text-sm text-gray-400 leading-relaxed">
            SDK linkage, defense profile, address hygiene, indexer events, no inline ABI, envelope
            detection and envelope integrity — run as a single command.
          </dd>
        </div>
      </dl>

      <p className="mt-10 max-w-2xl text-lg text-gray-300 leading-relaxed">
        None of this makes Loggie secure. No outside firm has reviewed this code, and we are not
        going to use the word while that is true.
      </p>

      <Evidence>
        FINDINGS.md, generated by gen-findings.mjs with a --check mode that fails when stale: "11
        findings on record", "6 high, 4 medium, 1 info", "9 of 11 findings are still present in the
        deployed bytecode". APP_SDK_SOURCE_OF_TRUTH_AUDIT.md §2 and §13 — ~100 domain questions, 47
        competing-authority defects including a fabricated shipping constant, SOT-1…SOT-12 complete
        with 0 P0 remaining. seal-require-hybrid-failclosed.test.ts. NULL_REGISTRAR in
        src/web/durability/. package.json check:all runs exactly seven scripts.
        share-branding-evidence.md excludes the mock UI carrying fabricated CIDs and a VERIFIED
        badge.
      </Evidence>
    </SectionWrapper>
  );
}
