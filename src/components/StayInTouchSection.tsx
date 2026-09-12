import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, StatusStrip, Evidence } from './shared/Proof';
import { IntakeForm } from './IntakeForm';

/**
 * The last section. It catches the large fraction of readers who cannot or will
 * not install a wallet today — and the form is itself the smallest working
 * version of the thesis the page just spent fourteen sections arguing.
 *
 * The page closes on the same status strip it opened with, verbatim. If the
 * strip ever reads differently in the two places, one of them is lying.
 */
export function StayInTouchSection() {
  return (
    <SectionWrapper id="stay-in-touch" className="bg-loggie-void">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <SectionHeading eyebrow="STAY IN TOUCH">Tell us where to find you when mainnet opens.</SectionHeading>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl">
            One field: your email. Everything else is optional.
          </p>

          <p className="mt-5 text-base text-gray-400 leading-relaxed max-w-2xl">
            Your message is encrypted in your browser before it is sent. Our server stores the
            ciphertext and cannot read it; only an offline key on a laptop that is not connected to
            this site can open it. That is the same idea the rest of the product is built on — this
            form is just the smallest version of it.
          </p>

          <Evidence>
            functions/api/intake.ts inserts the ciphertext verbatim with no decrypt path · schema.sql
            has no plaintext column · submission id is a client-computed BLAKE3 digest the server only
            shape-validates · visitor IPs are salted and SHA-256 hashed
          </Evidence>
        </div>

        <div>
          <IntakeForm />
          <StatusStrip className="mt-8" />
        </div>
      </div>
    </SectionWrapper>
  );
}
