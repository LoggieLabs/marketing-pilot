import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence } from './shared/Proof';
import { LIMITS, LAST_VERIFIED, CONTACT } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   §11 — WHAT IT CAN'T DO YET

   The required disclosure, placed at the conversion point rather than the
   footer. A skeptic who reads this list and keeps scrolling has converted
   themselves, and this is where the mainnet review's "unaudited, where
   users read it" obligation is discharged.

   Every row on this page is rendered from src/data/status.ts → LIMITS.
   None of it is written as prose here on purpose: the previous site went
   seven months out of date because its claims lived in components, and a
   stale honesty section is worse than no honesty section. To change what
   this section says, change the data file — never this component.

   Owner of that file today: security@loggielabs.com. status.ts records its
   own open question, which stands: this needs a named person, not a
   mailbox, before launch.

   Deliberately undesigned, in the same document register as §10 — no
   background lattice, no cards, no icons, no motion — so the two sections
   read as one continuous act of disclosure.
   ═══════════════════════════════════════════════════════════════════════ */

export function CantDoYetSection() {
  return (
    <SectionWrapper id="cant-do-yet">
      <SectionHeading eyebrow="BEFORE YOU DECIDE" lede={<>No apology, no roadmap dates.</>}>
        What Loggie can't do yet.
      </SectionHeading>

      <ol className="mt-12 max-w-2xl">
        {LIMITS.map((limit, i) => (
          <li
            key={limit.headline}
            className="flex gap-4 sm:gap-5 py-5 border-t border-white/[0.06] first:border-t-0"
          >
            {/* The <ol> carries the numbering for assistive technology; this is
                the printed copy of it. */}
            <span className="mono text-2xs text-gray-400 pt-1 shrink-0 tabular-nums" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-base sm:text-lg leading-relaxed">
              <span className="text-amber-300 font-medium">{limit.headline}</span>{' '}
              <span className="text-gray-300">{limit.detail}</span>
            </p>
          </li>
        ))}
      </ol>

      {/* Not a limit, so not a numbered row and not in the data file — the
          turn the section ends on. */}
      <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed border-t border-white/[0.06] pt-8">
        <span className="text-amber-300 font-medium">If any of that is a dealbreaker:</span>{' '}
        <span className="text-gray-300">
          It should be. We would rather you found out here than after you moved your life in.
        </span>
      </p>

      {/* The source trail, joined straight out of the data file rather than
          retyped, so it cannot drift from the rows above it. */}
      <Evidence>{LIMITS.map((limit) => limit.source).join(' · ')}</Evidence>

      <p className="mono text-2xs text-gray-400 mt-6 max-w-2xl leading-relaxed">
        Last checked {LAST_VERIFIED}. If this list is out of date, that's a bug —{' '}
        <a
          href={`mailto:${CONTACT}`}
          className="text-gray-400 hover:text-loggie-cyan transition-colors
                     border-b border-gray-700 hover:border-loggie-cyan/60"
        >
          {CONTACT}
        </a>
        .
      </p>
    </SectionWrapper>
  );
}
