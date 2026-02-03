import { FileInput, Hash, Link as LinkIcon, ShieldCheck } from 'lucide-react';
import { BlueprintLattice } from './shared/BlueprintLattice';

const steps = [
  {
    step: 1,
    icon: FileInput,
    title: 'Select Content',
    description: 'Select or paste content. Your data never leaves your device unencrypted.',
  },
  {
    step: 2,
    icon: Hash,
    title: 'Hash + Anchor',
    description: 'Generate a cryptographic hash. Loggie prepares the on-chain anchor.',
  },
  {
    step: 3,
    icon: LinkIcon,
    title: 'Blockchain Tx',
    description: 'Anchor the hash on-chain. One signature, permanent proof.',
  },
  {
    step: 4,
    icon: ShieldCheck,
    title: 'Verifiable Proof',
    description: 'Verify content forever. Anyone can confirm authenticity.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden">
      {/* Static blueprint lattice */}
      <BlueprintLattice />

      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 z-10 section-separator" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How it works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Four simple steps to create permanent, verifiable proof.
            Designed to be deterministic, auditable, and independent of Loggie itself.
          </p>
        </div>

        <div className="relative">
          {/* Connection line - desktop only */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-loggie-purple/20 via-loggie-cyan/20 to-loggie-purple/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Step icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full card-material border-loggie-purple/15
                                  flex items-center justify-center relative z-10 transition-all">
                    <step.icon className="w-6 h-6 text-loggie-purple/60" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full
                                  bg-gradient-to-br from-loggie-purple/80 to-loggie-purple/60
                                  flex items-center justify-center text-xs font-bold text-white z-20">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example CID */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="code-material rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-3">Example verification result:</p>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-xs text-gray-500 block mb-1">CID</span>
                <code className="text-loggie-cyan/80 text-sm font-mono">bafybeig...qrst</code>
              </div>
              <div>
                <span className="text-xs text-gray-500 block mb-1">Hash</span>
                <code className="text-loggie-purple/80 text-sm font-mono">0x8f3a...b2c1</code>
              </div>
              <div>
                <span className="text-xs text-gray-500 block mb-1">Status</span>
                <span className="text-green-400/80 text-sm font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 section-separator" />
    </section>
  );
}
