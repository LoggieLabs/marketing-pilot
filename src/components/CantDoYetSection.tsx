import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence } from './shared/Proof';
import { LIMITS, LIMIT_GROUPS, LAST_VERIFIED, CONTACT } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   WHAT IT CAN'T DO YET

   The required disclosure, placed at the conversion point rather than the
   footer. A reader who gets through this and keeps scrolling has convinced
   themselves, and this is where the mainnet review's "unaudited, where users
   read it" obligation is discharged.

   TWO CORRECTIONS, both from review:

   1. It used to be one flat numbered list, which put "there are no likes"
      beside "the contracts are unaudited" as though they were the same sort
      of fact. They are not remotely the same class of limitation, and the
      flat list read as a wall of defects rather than an honest account of
      what is unfinished versus what Loggie deliberately is. The three groups
      live in status.ts so the categorisation sits with the data.

   2. The closing line was "If any of that is a dealbreaker, it should be."
      Across nine items of wildly different weight that reads as Loggie
      recommending its own rejection. What it meant was narrower — any one of
      these can be a fair reason to wait, and we would rather you knew now.
      It says that instead.

   Every row still renders from src/data/status.ts. None of it is written as
   prose here on purpose: the previous site went seven months out of date
   because its claims lived in components, and a stale honesty section is
   worse than no honesty section. To change what this section says, change
   the data file — never this component.

   Owner of that file today: security@loggielabs.com. status.ts records its
   own open question, which stands: this needs a named person, not a mailbox,
   before launch.

   Deliberately undesigned, in the same document register as the defect
   section — no background lattice, no cards, no icons, no motion — so the
   two read as one continuous act of disclosure.
   ═══════════════════════════════════════════════════════════════════════ */

export function CantDoYetSection() {
  return (
    <SectionWrapper id="cant-do-yet">
      <SectionHeading
        eyebrow="BEFORE YOU DECIDE"
        lede={<>No apology, no roadmap dates. Grouped so you can tell them apart.</>}
      >
        What Loggie can't do yet.
      </SectionHeading>

      <div className="mt-12 space-y-14">
        {LIMIT_GROUPS.map((group) => {
          const rows = LIMITS.filter((l) => l.kind === group.kind);
          if (!rows.length) return null;
          return (
            <div key={group.kind}>
              <h3 className="text-xl font-semibold text-white tracking-[-0.01em]">{group.title}</h3>
              <p className="mt-1.5 max-w-2xl text-sm text-gray-400 leading-relaxed">{group.blurb}</p>

              <ol className="mt-6 max-w-2xl">
                {rows.map((limit, i) => (
                  <li
                    key={limit.headline}
                    className="flex gap-4 sm:gap-5 py-5 border-t border-white/[0.06] first:border-t-0"
                  >
                    <span className="mono text-2xs text-gray-400 shrink-0 pt-1.5" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base leading-relaxed">
                      <span className="text-amber-300 font-medium">{limit.headline}</span>{' '}
                      <span className="text-gray-300">{limit.detail}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>

      {/* The turn. Not a limit, so not in the data file. */}
      <div className="mt-14 max-w-2xl border-t border-white/[0.06] pt-8 space-y-4">
        <p className="text-base sm:text-lg leading-relaxed text-gray-300">
          <span className="text-white font-medium">
            Some of these may matter a lot to you; others may not matter at all.
          </span>{' '}
          What matters is that you know them before you trust Loggie with something important.
        </p>
        <p className="text-base sm:text-lg leading-relaxed text-gray-300">
          We would rather you decide Loggie is not ready for you yet than discover a limitation
          after you have already built part of your record here.
        </p>
      </div>

      {/* The source trail, joined straight out of the data file rather than
          retyped, so it cannot drift from the rows above it. */}
      <Evidence>{LIMITS.map((limit) => limit.source).join(' · ')}</Evidence>

      <p className="mono text-2xs text-gray-400 mt-8">
        Last checked {LAST_VERIFIED}. If this list is out of date, that's a bug —{' '}
        <a href={`mailto:${CONTACT}`} className="text-gray-300 hover:text-white transition-colors">
          {CONTACT}
        </a>
      </p>
    </SectionWrapper>
  );
}
