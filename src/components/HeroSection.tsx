import { ArrowRight } from 'lucide-react';
import { AbstractBackground } from './shared/AbstractBackground';
import { StatusStrip } from './shared/Proof';

const APP_URL = 'https://app.loggielabs.com';

/*
 * The hero has one job and thirty seconds to do it: land three ideas.
 *   I control it.  I can recover it.  Other people can verify it.
 *
 * Everything else the page knows waits its turn. The fee and the
 * no-subscription line used to sit here and were moved to the getting-started
 * section, where there is room to answer the question they provoke — "no
 * markup, so who gets the 0.01?" — instead of just raising it.
 */
export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-clip">
      {/*
        The hex lattice with a verification pulse propagating through it every
        eight seconds. It is not decoration — it is the thesis, animated, at
        zero image weight, and it already honours prefers-reduced-motion.
        This is the only place on the site it appears.
      */}
      <AbstractBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:py-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything you keep
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              online is{' '}
            </span>
            <span className="bg-gradient-to-r from-loggie-purple to-loggie-cyan bg-clip-text text-transparent">
              on loan.
            </span>
            <br />
            <span className="text-white">Loggie hands you the deed.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
            One wallet signature creates a private identity only you control — then opens it as
            files, a journal, messages, contacts and a public feed.
          </p>

          <p className="mt-4 text-lg text-gray-400 leading-relaxed max-w-2xl">
            Your private content is encrypted on your device before it leaves it. There is no Loggie
            account to suspend and no password for us to reset.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={APP_URL}
              className="px-7 py-3.5 bg-loggie-purple hover:bg-loggie-purple/90 text-white
                         font-medium rounded-lg transition-colors text-base
                         inline-flex items-center justify-center gap-2"
            >
              Open Loggie
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            {/*
              The spec's secondary CTA is /demo — a redirect to a real public
              Loggie profile, readable with no wallet and no signature. No inbox
              has been designated for it yet, and fabricating an address here
              would break the rule the whole site is built on. Until an owner
              names one, this scrolls to the product tour. See README →
              "Open decisions".
            */}
            <a
              href="#six-rooms"
              className="px-7 py-3.5 text-gray-300 hover:text-white font-medium
                         border border-gray-700 hover:border-gray-600 rounded-lg
                         transition-colors text-base inline-flex items-center justify-center"
            >
              See how it works
            </a>
          </div>

          {/* The four things that would make the rest of this page a lie if they
              were not said out loud. Never move this to the footer. */}
          <StatusStrip short className="mt-10" />
        </div>
      </div>
    </section>
  );
}
