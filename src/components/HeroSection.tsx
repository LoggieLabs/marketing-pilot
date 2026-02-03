import { ArrowRight, ChevronDown } from 'lucide-react';
import { AbstractBackground } from './shared/AbstractBackground';
import { useRequestAccess } from '../context/RequestAccessContext';

export function HeroSection() {
  const { handleRequestAccessClick } = useRequestAccess();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-clip">
      {/* Procedural abstract background */}
      <AbstractBackground />

      {/* Main content - centered */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
            {/* Headline - audit-first, calm */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-[1.15]">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Independent cryptographic proof
              </span>
              <br />
              <span className="bg-gradient-to-r from-loggie-purple to-loggie-cyan bg-clip-text text-transparent">
                for records, evidence,
              </span>
              <br />
              <span className="text-white">
                and automated decisions
              </span>
            </h1>

            {/* Subtext - audit/dispute/investigation focused */}
            <p className="text-lg sm:text-xl text-gray-400/80 max-w-2xl mx-auto mb-4 leading-relaxed">
              Verifiable under audit, dispute, or investigation — even years later
              and outside the originating system.
            </p>

            {/* Supporting line - infrastructure positioning */}
            <p className="text-sm text-gray-500 mb-8">
              Loggie provides an independent verification layer for systems
              where record integrity must hold up under scrutiny.
            </p>

            {/* CTAs - pilot-first funnel */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#request-access"
                onClick={handleRequestAccessClick}
                className="px-7 py-3.5 bg-loggie-purple/90 hover:bg-loggie-purple
                           text-white font-medium rounded-lg transition-colors
                           flex items-center gap-2 text-base"
              >
                Request Pilot Evaluation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="group px-7 py-3.5 text-gray-300 hover:text-white
                          font-medium transition-colors text-base
                          flex items-center gap-2 border border-gray-700/50 rounded-lg
                          hover:border-gray-600"
              >
                View How It Works
              </a>
            </div>

            {/* Helper text + tertiary link */}
            <p className="text-xs text-gray-500 mt-6 max-w-xl mx-auto">
              Scoped evaluations for regulated and high-risk systems.{' '}
              <a
                href="#developers"
                className="text-gray-400 hover:text-loggie-purple transition-colors"
              >
                Developer documentation →
              </a>
            </p>
        </div>
      </div>

      {/* Scroll indicator - static, no bounce */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#problems" className="flex flex-col items-center gap-2 text-gray-500/60 hover:text-gray-400 transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
