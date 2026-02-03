import { BlueprintLattice } from './shared/BlueprintLattice';

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden">
      {/* Static blueprint lattice */}
      <BlueprintLattice />

      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 z-10 section-separator" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Our mission
          </h2>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            In an era of AI-generated content and digital manipulation,
            proving authenticity shouldn't require trusting a third party.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Loggie is infrastructure for permanent digital truth.
            Built for developers, enterprises, and systems that require proof.
            We believe in open protocols, decentralized infrastructure, and user sovereignty.
            Your data, your proof, your control.
          </p>

          {/* Values */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <div className="card-material rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-loggie-cyan/10 border border-loggie-cyan/20
                              flex items-center justify-center mx-auto mb-3">
                <span className="text-loggie-cyan text-xl">&#9877;</span>
              </div>
              <h4 className="text-white font-semibold mb-1">Open Source</h4>
              <p className="text-gray-500 text-sm">Fully transparent and auditable</p>
            </div>
            <div className="card-material rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-loggie-purple/10 border border-loggie-purple/20
                              flex items-center justify-center mx-auto mb-3">
                <span className="text-loggie-purple text-xl">&#9741;</span>
              </div>
              <h4 className="text-white font-semibold mb-1">Decentralized</h4>
              <p className="text-gray-500 text-sm">No single point of failure</p>
            </div>
            <div className="card-material rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20
                              flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 text-xl">&#9881;</span>
              </div>
              <h4 className="text-white font-semibold mb-1">Permanent</h4>
              <p className="text-gray-500 text-sm">Proof that lasts forever</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 section-separator" />
    </section>
  );
}
