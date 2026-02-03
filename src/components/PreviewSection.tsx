import { CheckCircle, FileText, Hash, Link as LinkIcon } from 'lucide-react';

export function PreviewSection() {
  return (
    <section id="preview" className="relative py-20 md:py-28 material-substrate material-noise overflow-hidden">
      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      {/* Subtle atmospheric glow - "proof in action" visual moment */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(34, 211, 238, 0.04) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Example verification output
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Below is a real verification output generated from an internal reference environment.
            It demonstrates the structure and auditability of a Loggie proof — CID, hash, and on-chain anchor.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Product Screenshot - one of 3 rich visual moments */}
          <div className="relative code-material rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-black/30 border border-white/5 rounded-md px-3 py-1 text-sm text-gray-400 max-w-xs mx-auto text-center">
                  loggie.xyz/app
                </div>
              </div>
            </div>

            {/* App content */}
            <div className="p-8">
              <div className="flex items-start gap-6">
                {/* File info */}
                <div className="flex-shrink-0 w-16 h-16 card-material rounded-xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-loggie-purple/80" />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">quarterly-report-2024.pdf</h3>
                    <p className="text-gray-500 text-sm">Uploaded December 21, 2024 at 10:30 AM</p>
                  </div>

                  {/* Verification details */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="card-material rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <LinkIcon className="w-4 h-4 text-loggie-cyan/80" />
                        <span className="text-xs text-gray-500 uppercase">CID</span>
                      </div>
                      <code className="text-loggie-cyan text-sm font-mono block truncate">
                        bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
                      </code>
                    </div>

                    <div className="card-material rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="w-4 h-4 text-loggie-purple/80" />
                        <span className="text-xs text-gray-500 uppercase">SHA-256</span>
                      </div>
                      <code className="text-loggie-purple text-sm font-mono block truncate">
                        0x8f3a7b2c...4d5e6f1a
                      </code>
                    </div>

                    <div className="card-material rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400/80" />
                        <span className="text-xs text-gray-500 uppercase">Status</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-semibold">Verified</span>
                        <span className="text-xs text-gray-500">Block #18,234,567</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating verified badge - vertically centered with header row */}
            <div className="absolute top-[22px] right-4 -translate-y-1/2 bg-green-500/80 backdrop-blur-sm
                            px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-green-500/20">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Verified</span>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-sm text-gray-500 mt-6">
            This output is generated from a real proof flow — shown here as a reference example, not a public launch interface.
          </p>
        </div>
      </div>

      {/* Section separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
}
