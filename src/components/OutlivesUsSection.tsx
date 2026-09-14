import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution } from './shared/Proof';
import { COVENANT, ESCAPE_HATCHES } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   WHAT HAPPENS WHEN WE'RE GONE

   The question every "we'll keep your history safe" promise has to answer and
   almost none do. Without an answer, asking someone to trust their record to
   Loggie is just asking them to trust Loggie — which is the thing the rest of
   the page spends its time refusing to do.

   THE HONESTY LINE HERE IS THE WHOLE SECTION. The Covenant is a
   SPECIFICATION. Its own repository says "Status: SPECIFICATION — no
   contracts, by design", and the spec itself says "ratified in principle ·
   not yet enforced by code". The contracts/ directory is empty on purpose.
   Presenting it as something that protects anyone today would be the single
   worst claim this site could make, because it is precisely the claim a
   reader cannot yet check.

   So the section leads with what IS measurable — the data layer already
   satisfies the Covenant, because decryption is local cryptography over bytes
   — and is explicit that the contract layer does not. The four escape hatches
   are all real and all verifiable today.
   ═══════════════════════════════════════════════════════════════════════ */

export function OutlivesUsSection() {
  return (
    <SectionWrapper id="outlives-us">
      <SectionHeading
        eyebrow="THE UNCOMFORTABLE QUESTION"
        lede={
          <>
            Any company can promise to look after your history. The only promise worth anything is
            one that does not need the company.
          </>
        }
      >
        What happens to all of this when we're gone?
      </SectionHeading>

      <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl space-y-5">
          <p className="text-lg text-gray-300 leading-relaxed">
            Loggie Labs is a small operation. Companies fold, get bought, lose interest, or simply
            stop. If your record only lasts as long as we do, then it is an account after all — and
            you have read far enough to know that is the thing we are trying not to build.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            One part of that answer already holds, and it is the part that matters most day to day.
            Opening your own material is local cryptography over bytes. It takes the file and your
            keys. Not a company, not a server, not the chain, not a network connection. If every
            machine we own went dark tonight, your encrypted files would open exactly as they do
            now.
          </p>

          <p className="text-base text-gray-400 leading-relaxed">
            The rest of the answer — making the protocol itself something no future owner of Loggie
            Labs can revoke — is being written as a constitution rather than a policy. Two rights:
            once your identity and inbox exist, nobody can take away their ability to function; and
            in exchange, nothing guarantees that we will host, index or feature them.
          </p>

          <blockquote className="border-l-2 border-loggie-purple/40 pl-5 text-base text-gray-300 leading-relaxed">
            {COVENANT.formulation}
            <footer className="mono text-2xs text-gray-400 mt-2">the Covenant, in its own words</footer>
          </blockquote>
        </div>

        <div>
          <p className="mono text-2xs text-gray-400 mb-4">What already works without us</p>
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {ESCAPE_HATCHES.map((h) => (
              <li key={h.what} className="py-4">
                <p className="text-base font-medium text-white">{h.what}</p>
                <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{h.detail}</p>
                <p className="mono text-2xs text-gray-400 mt-2 break-all">{h.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The status disclosure. This is the most important sentence in the
          section and it must never be softened into an implication that the
          Covenant protects anyone today. */}
      <Caution className="mt-12 max-w-2xl">
        <strong className="font-semibold text-amber-200">The Covenant is not built yet.</strong>{' '}
        {COVENANT.status} Its contracts directory is deliberately empty — nothing enters it until it
        earns the place. So the constitutional half of this answer is an intention you can read and
        hold us to, not a protection you have today. The four things listed beside it are the part
        that already works.
      </Caution>

      <Evidence>
        {COVENANT.source} — two rights, the engineering test that separates them, and the status
        line quoted above. The repository README records "SPECIFICATION — no contracts, by design",
        an unversioned root, and succession by an explicit successor rather than a V2; STEWARDSHIP.md
        defines stewards as holding typed operations only, with no generic executor and no ability to
        change the rules around their own powers. The measured half: {COVENANT.measured} —{' '}
        {COVENANT.measuredSource}. Escape hatches: {ESCAPE_HATCHES.map((h) => h.source).join(' · ')}.
      </Evidence>
    </SectionWrapper>
  );
}
