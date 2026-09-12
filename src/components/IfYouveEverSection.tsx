import { FileCheck, Scale, ShieldOff, FlaskConical, NotebookPen } from 'lucide-react';
import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   §12 — IF YOU'VE EVER NEEDED TO PROVE SOMETHING

   Lets the reader find themselves in one sentence, and warms the page back
   up between two heavy disclosure sections and the ask. Second-person
   situations, not persona cards — and it ends on the most ordinary one.

   Every compliance chip from the old site is gone: HIPAA, CJIS, GLBA,
   SEC/FINRA, SOX, FedRAMP, SOC 2, Government, State regulators. None was
   supported by any certification and all of them pushed the page back into
   enterprise register. Do not reintroduce them.

   NO PHOTOGRAPHY AND NO STOCK PEOPLE anywhere on this site. A product that
   refuses fabricated screenshots should not advertise with fabricated faces.
   ═══════════════════════════════════════════════════════════════════════ */

const SITUATIONS = [
  {
    icon: FileCheck,
    text: 'You delivered on the 14th. The client says it was the 20th. You have a certificate with a timestamp and a QR code, and they can check it without going through you.',
  },
  {
    icon: Scale,
    text: "You're assembling evidence, and you need a dated, independently re-checkable record of a document — with no platform holding it that could be made to hand it over.",
  },
  {
    icon: ShieldOff,
    text: "Someone sent you something they shouldn't be seen sending. The encrypted object on the network carries no filename, and your inbox cannot be enumerated by strangers.",
  },
  {
    icon: FlaskConical,
    text: "You have a finding you're not ready to publish. You want a dated record that you had it first, without disclosing what it is.",
  },
  {
    icon: NotebookPen,
    text: "You keep a diary. You'd like it to survive the laptop, without a company being able to read it.",
  },
] as const;

export function IfYouveEverSection() {
  return (
    <SectionWrapper id="if-youve-ever">
      <SectionHeading eyebrow="WHO IT'S FOR">If you've ever needed to prove something.</SectionHeading>

      <p className="mt-8 max-w-2xl text-xl leading-relaxed text-gray-200">
        You want your important digital history to survive the service that created it.
      </p>

      <ul className="mt-10 max-w-2xl space-y-6">
        {SITUATIONS.map((situation) => {
          const Icon = situation.icon;
          return (
            <li key={situation.text} className="flex gap-4">
              <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-1.5" aria-hidden="true" />
              <p className="text-base text-gray-300 leading-relaxed">{situation.text}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-12 max-w-2xl text-2xl sm:text-3xl font-semibold text-white leading-snug tracking-[-0.02em]">
        Or you'd just like somewhere to put things that stays yours.
      </p>
    </SectionWrapper>
  );
}
