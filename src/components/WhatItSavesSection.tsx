import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Caution } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   WHAT IT SAVES

   The site had no answer to "what is this worth?", which left every benefit
   abstract. This section gives one — as MECHANISMS, never as figures.

   HARD RULE: no number appears in this section and none may be added. We have
   measured nothing. A percentage or an hours-saved figure here would be the
   same class of defect as a fabricated block number, and it would be the
   first unfalsifiable claim on a page whose entire argument is that its
   claims are checkable. The caution at the end says so out loud, because a
   reader is entitled to know the difference between a mechanism and a
   benchmark.
   ═══════════════════════════════════════════════════════════════════════ */

const MECHANISMS = [
  {
    label: 'Reconstruction',
    text: 'Less time assembling a history after the fact, because it was recorded while it happened rather than gathered from three phones and an inbox afterwards.',
  },
  {
    label: 'Disagreement',
    text: 'Fewer rounds of argument about which version of a document existed on which date, because that particular question has an answer either side can check.',
  },
  {
    label: 'Loss',
    text: "Anchored material isn't sitting only on one laptop or inside one account that can be closed, locked or forgotten.",
  },
  {
    label: 'Verification',
    text: 'Whoever receives a certificate checks it themselves, in their own browser. They do not have to contact you, and they do not have to contact us.',
  },
  {
    label: 'Platform dependency',
    text: 'There is no subscription to keep paying in order to retain access to your own records.',
  },
] as const;

export function WhatItSavesSection() {
  return (
    <SectionWrapper id="what-it-saves">
      <SectionHeading eyebrow="WHAT IT'S WORTH">
        Build the record while it's happening, not after.
      </SectionHeading>

      <p className="mt-8 max-w-2xl text-lg text-gray-300 leading-relaxed">
        Most of the cost of a dispute is not the dispute. It is the weeks of reconstruction that come
        first — finding the photos, dating the estimates, working out which version of the file went
        out and when. That work is cheap while it is happening and expensive afterwards.
      </p>

      <dl className="mt-12 max-w-3xl divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {MECHANISMS.map((m) => (
          <div key={m.label} className="py-5 sm:flex sm:gap-8">
            <dt className="mono text-2xs text-loggie-cyan/90 sm:w-48 sm:shrink-0 sm:pt-1">
              {m.label}
            </dt>
            <dd className="mt-1.5 sm:mt-0 text-base text-gray-300 leading-relaxed">{m.text}</dd>
          </div>
        ))}
      </dl>

      <Caution className="mt-10 max-w-2xl">
        <strong className="font-semibold text-amber-200">We have not measured any of this.</strong>{' '}
        Those are the mechanisms, not a benchmark. You will find no percentages, no hours-saved
        figures and no case studies on this site, because we have not run the study that would
        justify one. When we have, it will say so and show its working.
      </Caution>
    </SectionWrapper>
  );
}
