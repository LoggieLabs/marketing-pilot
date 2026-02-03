import { ArrowRight, FileText, Database, Link as LinkIcon, Lock } from 'lucide-react';
import { BlueprintLattice } from './shared/BlueprintLattice';

export function SolutionSection() {
  return (
    <section id="solution" className="relative py-20 md:py-28 overflow-hidden">
      {/* Static blueprint lattice - same family as hero, but "blueprint view" */}
      <BlueprintLattice />

      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 z-10 section-separator" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How Loggie solves this
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A simple three-step process to create permanent, verifiable proof.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          {/* Input */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl card-material
                            flex items-center justify-center mb-4 transition-all">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <span className="text-white font-medium">Any Digital Asset</span>
            <span className="text-sm text-gray-500">Files, AI outputs, data</span>
          </div>

          {/* Arrow */}
          <div className="hidden md:block">
            <ArrowRight className="w-8 h-8 text-loggie-purple/50" />
          </div>
          <div className="md:hidden">
            <ArrowRight className="w-8 h-8 text-loggie-purple/50 rotate-90" />
          </div>

          {/* Loggie - with micro-pulse accent */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full card-material border-loggie-purple/20
                            flex items-center justify-center mb-6 transition-all">
              {/* Inner icon with very subtle pulse - opacity only, 15s cycle */}
              <div className="w-20 h-20 bg-gradient-to-br from-loggie-purple/70 to-loggie-cyan/70 rounded-2xl
                            flex items-center justify-center animate-micro-pulse">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>
            <span className="text-loggie-purple font-bold text-xl">LOGGIE</span>
            <span className="text-sm text-gray-500">Hash + Anchor</span>
          </div>

          {/* Arrow */}
          <div className="hidden md:block">
            <ArrowRight className="w-8 h-8 text-loggie-cyan/50" />
          </div>
          <div className="md:hidden">
            <ArrowRight className="w-8 h-8 text-loggie-cyan/50 rotate-90" />
          </div>

          {/* Outputs */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl card-material border-loggie-purple/15
                              flex items-center justify-center mb-4 transition-all">
                <LinkIcon className="w-10 h-10 text-loggie-purple/70" />
              </div>
              <span className="text-white font-medium">On-chain Proof</span>
              <span className="text-sm text-gray-500">Blockchain tx</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl card-material border-loggie-cyan/15
                              flex items-center justify-center mb-4 transition-all">
                <Database className="w-10 h-10 text-loggie-cyan/70" />
              </div>
              <span className="text-white font-medium">CID</span>
              <span className="text-sm text-gray-500">Content address</span>
            </div>
          </div>
        </div>

        {/* Process bullets */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-loggie-purple/10 border border-loggie-purple/15
                           flex items-center justify-center mx-auto mb-3">
              <span className="text-loggie-purple/80 font-bold">1</span>
            </div>
            <p className="text-gray-400 text-sm">SHA-256 hash created</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-loggie-purple/10 border border-loggie-purple/15
                           flex items-center justify-center mx-auto mb-3">
              <span className="text-loggie-purple/80 font-bold">2</span>
            </div>
            <p className="text-gray-400 text-sm">Proof anchored via wallet or signing key</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-loggie-purple/10 border border-loggie-purple/15
                           flex items-center justify-center mx-auto mb-3">
              <span className="text-loggie-purple/80 font-bold">3</span>
            </div>
            <p className="text-gray-400 text-sm">CID + transaction returned</p>
          </div>
        </div>
      </div>

      {/* Section separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 section-separator" />
    </section>
  );
}
