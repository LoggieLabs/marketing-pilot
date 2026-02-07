import { Globe, Lock, Hash, Eye, Shield, Building2 } from 'lucide-react';

const trustPoints = [
  {
    icon: Globe,
    title: 'Public Blockchain',
    description: 'Anchored on Ethereum. Anyone can verify your proof independently — no permissions, no gatekeepers.',
  },
  {
    icon: Lock,
    title: 'No Custody',
    description: 'Your data never leaves your device. Only cryptographic fingerprints are recorded on-chain.',
  },
  {
    icon: Hash,
    title: 'Deterministic Hashes',
    description: 'Identical content always produces the same proof. No ambiguity. No interpretation.',
  },
  {
    icon: Eye,
    title: 'Independent Verification',
    description: 'No need to trust Loggie. Verify directly on the blockchain — today or years from now.',
  },
  {
    icon: Building2,
    title: 'Enterprise-Ready',
    description: 'Designed for audits, compliance, and long-term evidence integrity — from day one.',
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="relative py-20 md:py-28 material-substrate material-noise">
      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trust replaced by cryptographic proof
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Loggie replaces fragile trust assumptions with math, transparency, and independent verification.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="card-material rounded-xl p-6 text-center transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-loggie-purple/10 border border-loggie-purple/20
                              flex items-center justify-center mx-auto mb-4">
                <point.icon className="w-6 h-6 text-loggie-purple/80" />
              </div>
              <h3 className="text-white font-semibold mb-2">{point.title}</h3>
              <p className="text-gray-400 text-sm">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Future-Proof Security callout */}
        <div className="mt-12 card-material rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-xl bg-loggie-cyan/10 border border-loggie-cyan/20
                            flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-loggie-cyan" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold text-lg mb-2">Future-Proof Security</h3>
              <p className="text-gray-400 text-sm mb-3">
                Loggie uses Omni&apos;s hybrid post-quantum cryptography to protect messages,
                identities, and files — built to remain secure as computing power evolves.
              </p>
              <a
                href="https://omnituum.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-loggie-cyan hover:text-loggie-purple transition-colors text-sm inline-flex items-center gap-1"
              >
                Learn about Omnituum post-quantum security
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
}
