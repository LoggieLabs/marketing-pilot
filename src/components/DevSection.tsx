import { Terminal, ArrowRight, Code, Boxes, Cpu } from 'lucide-react';
import { BlueprintLattice } from './shared/BlueprintLattice';
import { useRequestAccess } from '../context/RequestAccessContext';

export function DevSection() {
  const { handleRequestAccessClick } = useRequestAccess();

  // Example workflow only - no install commands
  const cliCode = `# Anchor a file
loggie anchor ./document.pdf

# Verify a file
loggie verify ./document.pdf --cid bafybeig...

# Check proof status
loggie status bafybeig...`;

  const features = [
    { icon: Terminal, label: 'CLI' },
    { icon: Code, label: 'TypeScript' },
    { icon: Boxes, label: 'React' },
    { icon: Cpu, label: 'Node.js' },
  ];

  return (
    <section id="developers" className="relative py-20 md:py-28 overflow-hidden">
      {/* Static blueprint lattice - same as SolutionSection */}
      <BlueprintLattice />

      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 z-10 section-separator" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Built for developers
            </h2>
            <p className="text-gray-400 mb-6">
              Loggie is designed to integrate directly into applications via SDKs and automation interfaces.
              During the pilot phase, access is provided through scoped evaluations rather than public packages.
            </p>

            <ul className="space-y-4 mb-6">
              {[
                'CLI interface for scripts and automation (pilot preview)',
                'SDK interfaces for React, Node.js, and backend services (pilot access)',
                'No vendor lock-in — standard IPFS CIDs',
                'Open protocols with self-hostable verification paths',
                'Enterprise-grade cryptography designed for long-lived systems'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-loggie-cyan/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-gray-500 text-xs mb-8">
              Omni&apos;s post-quantum cryptography is rolling out through controlled enterprise pilots.
            </p>

            <a
              href="#request-access"
              onClick={handleRequestAccessClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-loggie-purple/90 hover:bg-loggie-purple
                         text-white font-medium rounded-xl transition-all"
            >
              Request Developer Pilot Access
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-gray-500 text-xs mt-3">
              Access to SDKs and CLI tooling is currently provided through scoped pilots.
            </p>
          </div>

          {/* Right: Code snippet */}
          <div className="relative">
            {/* Label above terminal */}
            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
              Example CLI workflow (pilot preview)
            </p>

            <div className="code-material rounded-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <span className="text-gray-500 text-sm ml-2">terminal</span>
              </div>

              {/* Code */}
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-gray-300 font-mono">
                  {cliCode.split('\n').map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line.startsWith('#') ? (
                        <span className="text-gray-500">{line}</span>
                      ) : line.startsWith('loggie') ? (
                        <>
                          <span className="text-loggie-cyan/80">loggie</span>
                          <span className="text-white">{line.slice(6)}</span>
                        </>
                      ) : (
                        <span className="text-white">{line}</span>
                      )}
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            {/* Disclaimer below code */}
            <p className="text-xs text-gray-500 mt-3 text-center">
              Interface shown for illustrative purposes. Tooling is currently available through pilot access.
            </p>

            {/* SDK logos/icons */}
            <div className="flex items-center justify-center gap-6 mt-6">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="text-center group">
                  <div className="w-12 h-12 rounded-lg card-material flex items-center justify-center mb-1
                                 group-hover:border-loggie-purple/20 transition-colors">
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-loggie-purple/80 transition-colors" />
                  </div>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 text-center mt-4">
              Interfaces available via pilot access
            </p>
          </div>
        </div>
      </div>

      {/* Section separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 section-separator" />
    </section>
  );
}
