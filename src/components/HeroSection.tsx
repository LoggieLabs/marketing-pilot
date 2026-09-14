import { ArrowRight } from 'lucide-react';
import { AbstractBackground } from './shared/AbstractBackground';
import { StatusStrip } from './shared/Proof';

const APP_URL = 'https://app.loggielabs.com';

/*
 * The emotional centre of the product, and it is not evidence.
 *
 * This hero has been through three framings. It opened on "Everything you keep
 * online is on loan" — a philosophy, stated before the reader felt any pain.
 * It then opened on "Keep the record. Prove it later.", which fixed that but
 * landed the product as an evidence tool: the first thing a reader met was
 * disputes, claims and provenance, which reads as software for professionals.
 *
 * What Loggie actually is, is closer to personal continuity across time. Proof
 * and encryption are why it can make the promise; they are not the reason an
 * ordinary person should want it. The reason is older and much simpler — people
 * have always wanted to leave something behind that outlasts them.
 *
 * The evidence use cases are not gone. They moved to where they belong: strong
 * practical examples inside something larger, rather than the definition of it.
 *
 * DURABILITY IS STATED AS AN OBJECTIVE, NEVER A WARRANTY. "Built to remain
 * understandable" is a design intent we can defend. "Will survive a thousand
 * years" is not knowable and would be the first unfalsifiable sentence on a
 * page whose whole argument is that its claims are checkable. check-claims
 * fails the build on that class of promise.
 */
const KEEPS = [
  'Your photos.',
  'Your writing.',
  'Your files.',
  'Your conversations.',
  'The things you witnessed.',
  'The things you made.',
] as const;

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-clip">
      <AbstractBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:py-28">
        <div className="max-w-4xl">
          <p className="mono text-2xs text-loggie-cyan/90 mb-6">A record of being here</p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Keep your piece
            </span>
            <br />
            <span className="text-white">of history.</span>
          </h1>

          <ul className="mt-8 grid gap-x-10 gap-y-1.5 sm:grid-cols-2 max-w-xl">
            {KEEPS.map((k) => (
              <li key={k} className="text-lg text-gray-300">
                {k}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-2xl">
            Private while it's yours. Verifiable when it matters. Built to remain understandable
            after the platforms — and eventually the people — who created it are gone.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={APP_URL}
              className="px-7 py-3.5 bg-loggie-purple hover:bg-loggie-purple/90 text-white
                         font-medium rounded-lg transition-colors text-base
                         inline-flex items-center justify-center gap-2"
            >
              Open Loggie
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#borrowed"
              className="px-7 py-3.5 text-gray-300 hover:text-white font-medium
                         border border-gray-700 hover:border-gray-600 rounded-lg
                         transition-colors text-base inline-flex items-center justify-center"
            >
              Why this is different
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-400 leading-relaxed max-w-2xl">
            Everything private is encrypted on your own device before it leaves it. Opening it again
            needs the bytes and your keys — not a company, not a server, not even a network.
          </p>

          <StatusStrip short className="mt-6" />
        </div>
      </div>
    </section>
  );
}
