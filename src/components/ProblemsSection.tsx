import { AlertTriangle, FileQuestion, ShieldOff, Scale } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: 'AI outputs can be altered',
    description: 'Without proof of origin, AI-generated content can be modified, disputed, or fabricated after the fact.',
    color: 'text-red-400',
  },
  {
    icon: FileQuestion,
    title: 'Files lose provenance',
    description: 'Digital files have no inherent timestamp or ownership. Metadata is easily stripped or altered.',
    color: 'text-yellow-400',
  },
  {
    icon: ShieldOff,
    title: 'Trust is fragile',
    description: 'Centralized systems can be hacked, altered, or shut down. Your proof disappears with them.',
    color: 'text-orange-400',
  },
  {
    icon: Scale,
    title: 'Compliance pressure is rising',
    description: 'Courts, regulators, and auditors increasingly require cryptographic proof — not screenshots, not databases, not claims.',
    color: 'text-purple-400',
  },
];

export function ProblemsSection() {
  return (
    <section id="problems" className="relative py-20 md:py-28 material-substrate material-noise material-inset">
      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why verification now matters
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            In a world of AI generation and digital manipulation,
            proving authenticity is no longer optional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="card-material rounded-2xl p-8 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-black/30 border border-white/5
                              flex items-center justify-center mb-6
                              group-hover:border-white/10 transition-colors ${problem.color}`}>
                <problem.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-gray-400">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Transition cue */}
        <div className="mt-16 text-center">
          <div className="inline-block w-px h-12 bg-gradient-to-b from-transparent via-gray-600 to-transparent mb-6" />
          <p className="text-gray-500 text-lg">
            Loggie replaces trust assumptions with cryptographic proof.
          </p>
        </div>
      </div>

      {/* Section separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
}
