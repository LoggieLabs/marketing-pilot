import { ArrowRight } from 'lucide-react';
import { AbstractBackground } from './shared/AbstractBackground';
import { StatusStrip } from './shared/Proof';

const APP_URL = 'https://app.loggielabs.com';

/*
 * The hero leads with the job, not the mechanism.
 *
 * It used to open on "Everything you keep online is on loan. Loggie hands you
 * the deed." That line is good and it is still on the page — but it states a
 * philosophy before the reader has felt the pain, which left them to
 * reverse-engineer the benefit out of the architecture. Ownership is HOW
 * Loggie works. The reason to want it is narrower and far more legible:
 *
 *   keep the original · prove when you had it · get it back
 *
 * The four questions below are the ones people actually get asked, and the
 * moment a reader recognises one of them is the moment the product lands.
 */
const QUESTIONS = [
  'Do you still have the original?',
  'When did you receive this?',
  'Was this changed later?',
  'Can anyone verify that?',
] as const;

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-clip">
      {/*
        The hex lattice with a verification pulse propagating through it every
        eight seconds. It is not decoration — it is the thesis, animated, at
        zero image weight, and it already honours prefers-reduced-motion.
      */}
      <AbstractBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:py-28">
        <div className="max-w-4xl">
          <p className="mono text-2xs text-loggie-cyan/90 mb-6">A private record you can prove later</p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Keep the record.
            </span>
            <br />
            <span className="text-white">Prove it later.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Important photos, documents, messages and notes have a habit of becoming important only
            after something goes wrong.
          </p>

          <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-2xl">
            Loggie gives you one private place to keep them, recover them from another computer, and
            prove that a specific file existed in a specific form at a specific time.
          </p>

          <div className="mt-7 max-w-2xl">
            <p className="text-base text-gray-400">So when someone asks:</p>
            <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {QUESTIONS.map((q) => (
                <li key={q} className="text-base text-gray-200">
                  {q}
                </li>
              ))}
            </ul>
            <p className="mt-3.5 text-base text-gray-400">
              you have more than a screenshot or your word.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={APP_URL}
              className="px-7 py-3.5 bg-loggie-purple hover:bg-loggie-purple/90 text-white
                         font-medium rounded-lg transition-colors text-base
                         inline-flex items-center justify-center gap-2"
            >
              Open Loggie
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            {/* Points at two real Sepolia anchors a reader can open in a block
                explorer — the fastest way to see the thing actually work. */}
            <a
              href="#prove-it"
              className="px-7 py-3.5 text-gray-300 hover:text-white font-medium
                         border border-gray-700 hover:border-gray-600 rounded-lg
                         transition-colors text-base inline-flex items-center justify-center"
            >
              See a real proof
            </a>
          </div>

          <p className="mt-7 text-sm text-gray-400 leading-relaxed max-w-2xl">
            Your private material is encrypted on your device before it leaves it. When you choose to
            publish proof, anyone can verify the record without trusting Loggie Labs.
          </p>

          {/* The four things that would make the rest of this page a lie if they
              were not said out loud. Never move this to the footer. */}
          <StatusStrip short className="mt-6" />
        </div>
      </div>
    </section>
  );
}
