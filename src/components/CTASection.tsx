import { ArrowRight } from 'lucide-react';
import { useRequestAccess } from '../context/RequestAccessContext';

export function CTASection() {
  const { handleRequestAccessClick } = useRequestAccess();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Atmospheric background - one of 3 rich visual moments */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080C] via-loggie-purple/5 to-[#07080C] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 material-blueprint opacity-50 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready when your systems need it
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          Whether you&apos;re anchoring AI outputs, files, or critical records —
          Loggie provides permanent, verifiable proof without relying on trust.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6">
          {/* Primary CTA - Pilot Access */}
          <div className="text-center">
            <a
              href="#request-access"
              onClick={handleRequestAccessClick}
              className="px-8 py-4 bg-loggie-purple/90 hover:bg-loggie-purple
                         text-white font-semibold rounded-xl transition-colors
                         flex items-center justify-center gap-2 text-lg"
            >
              Request Pilot Access
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-gray-500 text-xs mt-2 max-w-[280px] mx-auto">
              Scoped evaluations for regulated and high-risk systems.
            </p>
          </div>

          {/* Secondary CTA - Reference Demo */}
          <div className="text-center">
            <a
              href="#preview"
              className="px-8 py-4 card-material
                        text-white font-medium rounded-xl transition-all
                        flex items-center justify-center gap-2 text-lg hover:border-white/20"
            >
              View Reference Demo
            </a>
            <p className="text-gray-500 text-xs mt-2 max-w-[280px] mx-auto">
              Explore how Loggie proofs are structured and verified.
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-10">
          Built on{' '}
          <a
            href="https://omnituum.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-loggie-purple transition-colors"
          >
            Omnituum&apos;s production-grade cryptographic substrate
          </a>
          , currently deployed through controlled enterprise pilots.
        </p>
      </div>
    </section>
  );
}
