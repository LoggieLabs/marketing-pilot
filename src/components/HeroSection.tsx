import { ArrowRight } from 'lucide-react';
import { AbstractBackground } from './shared/AbstractBackground';
import { StatusStrip } from './shared/Proof';

const APP_URL = 'https://app.loggielabs.com';

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

          <p className="mt-8 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl">
            One wallet signature builds a private identity nobody else holds — then opens it as
            files, a journal, messages, your people and a public feed. Everything private is
            encrypted on your own machine before it leaves it. There is no account to close and no
            password to reset, because there is no account.
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
              names one, this scrolls to the product tour instead. See
              README.md → "Open decisions".
            */}
            <a
              href="#six-rooms"
              className="px-7 py-3.5 text-gray-300 hover:text-white font-medium
                         border border-gray-700 hover:border-gray-600 rounded-lg
                         transition-colors text-base inline-flex items-center justify-center"
            >
              See what's inside first
            </a>
          </div>

          {/* The four things that would make the rest of this page a lie if they
              were not said out loud. Never move this to the footer. */}
          <StatusStrip className="mt-10" />

          <p className="mt-5 text-sm text-gray-400 leading-relaxed max-w-2xl">
            Loggie charges you nothing and takes no markup. The only money that moves is the
            network's own fee and the protocol fee on actions you choose to put on-chain on
            Sepolia — and today those are paid in free test ETH.
          </p>
        </div>
      </div>
    </section>
  );
}
