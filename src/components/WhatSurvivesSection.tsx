import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   WHAT WOULD YOU KEEP?

   The emotional payload, and the section that separates Loggie from
   encrypted cloud storage.

   The old page's closest line was "the moment you think 'I might need this
   later'" — which is a good line about the next few years. This is the step
   past it: someone may want this after I am gone, and eventually after
   everyone who remembers making it is gone too.

   The 1900 thought experiment does the work no feature list can. Ordinary
   people's diaries, letters and photographs from a century ago are treated as
   extraordinary now precisely because so little of it survived. We are
   producing vastly more and keeping vastly less of it in any form a
   great-grandchild could open.

   NO DURABILITY WARRANTY APPEARS HERE. Not "will last", not "forever", not a
   number of years. The honest framing is the design objective — most software
   is built around the lifetime of a company, and the question this product
   asks is what it would take to build a personal record around a longer one.
   check-claims fails the build on the warranty phrasings.
   ═══════════════════════════════════════════════════════════════════════ */

const KEEPSAKES = [
  'A journal kept for forty years.',
  'Photographs of your parents, and of theirs.',
  'A child’s first years, as they happened.',
  'The writing, music or work you made.',
  'Conversations you would not want to lose.',
  'What you saw during something that mattered.',
] as const;

export function WhatSurvivesSection() {
  return (
    <SectionWrapper id="what-survives">
      <SectionHeading
        eyebrow="WHAT IT'S FOR"
        lede={<>Not "I might need this later." Closer to "someone may want this after I'm gone."</>}
      >
        What would you want to still exist?
      </SectionHeading>

      <ul className="mt-12 grid gap-x-12 gap-y-4 sm:grid-cols-2 max-w-4xl">
        {KEEPSAKES.map((k) => (
          <li
            key={k}
            className="border-t border-white/[0.06] pt-4 text-lg leading-relaxed text-gray-300"
          >
            {k}
          </li>
        ))}
      </ul>

      <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl space-y-5">
          <p className="text-lg text-gray-300 leading-relaxed">
            Imagine an ordinary person in 1900 — a machinist, a teacher, a mother, someone stepping
            off a boat. Not anyone famous. If their letters, photographs, working notes and the
            people they knew had come through intact, a historian today would call it
            extraordinary.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Almost none of it did. Not because those lives mattered less, but because keeping things
            was hard and nobody was doing it on purpose.
          </p>
          <p className="text-lg text-white leading-relaxed font-medium">
            What will someone in 2150 wish an ordinary person in 2026 had kept?
          </p>
        </div>

        {/* The ambition, stated as an objective. Never as a guarantee. */}
        <div className="card-material rounded-xl p-7 md:p-8">
          <p className="mono text-2xs text-loggie-cyan/90">The design objective</p>
          <p className="mt-5 text-lg text-gray-200 leading-relaxed">
            Most software is designed around the lifetime of a company.
          </p>
          <p className="mt-4 text-lg text-gray-200 leading-relaxed">
            We are asking what it would take to design a personal record around the lifetime of
            history.
          </p>
          <p className="mt-6 text-sm text-gray-400 leading-relaxed">
            That is an objective, not a promise. Nobody can honestly tell you how long anything
            digital will last, and this page will not be the first to try. What can be said is how
            the thing is built, and what it would still need for that objective to hold — both of
            which are further down.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
