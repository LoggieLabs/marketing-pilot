import { Bot, FileCheck, ClipboardList, Code } from 'lucide-react';

const useCases = [
  {
    icon: Bot,
    title: 'Immutable AI Outputs',
    description: 'Prove exactly what an AI generated, when it was created, and by whom.',
    iconColor: 'text-purple-400',
  },
  {
    icon: FileCheck,
    title: 'On-chain Proof of Files',
    description: 'Create permanent, verifiable timestamps for any digital file.',
    iconColor: 'text-cyan-400',
  },
  {
    icon: ClipboardList,
    title: 'Audit & Compliance Logs',
    description: 'Maintain tamper-proof records for audits, compliance, and legal evidence.',
    iconColor: 'text-green-400',
  },
  {
    icon: Code,
    title: 'Developer Infrastructure',
    description: 'Embed verification directly into your applications using SDKs and CLIs.',
    iconColor: 'text-orange-400',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="relative py-20 md:py-28 material-substrate material-noise">
      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for real-world use cases
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Loggie provides verifiable proof infrastructure across creators, teams, and enterprises.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="card-material rounded-2xl p-6 transition-all cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-black/30 border border-white/5
                              flex items-center justify-center mb-4 ${useCase.iconColor}`}>
                <useCase.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
              <p className="text-sm text-gray-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
}
