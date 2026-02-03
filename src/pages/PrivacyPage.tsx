import { PilotPageLayout } from '../components/PilotPageLayout';

export function PrivacyPage() {
  return (
    <PilotPageLayout
      title="Privacy Policy"
      subtitle="How data is handled during the Loggie pilot phase."
    >
      <section className="space-y-6 text-gray-300">
        <p>
          This privacy policy applies to participants in the Loggie pilot program.
          It describes current data handling practices during this evaluation phase.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Program Scope</h2>
        <p>
          Loggie is currently available through controlled pilot access only. The data
          practices described here apply specifically to pilot participants and may be
          updated prior to general availability.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Data We Collect</h2>
        <p>
          During the pilot, Loggie collects limited information necessary to operate,
          evaluate, and support the service, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Contact information provided during pilot registration</li>
          <li>Limited usage metadata related to feature interaction and system behavior</li>
          <li>Feedback, inquiries, and communications provided by pilot participants</li>
        </ul>
        <p className="text-gray-400 mt-3">
          This information is used solely to support pilot operations, improve reliability,
          and inform product development.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Data We Do Not Collect</h2>
        <p>
          Loggie is designed around cryptographic proof, not data custody. As part of the
          pilot program, Loggie does not:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Store, host, or retain user files or digital assets</li>
          <li>Retain copies of content that participants verify</li>
          <li>Access or store private keys, signing keys, or wallet credentials</li>
        </ul>
        <p className="text-gray-400 mt-3">
          User content remains under the control of the participant at all times.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Changes During the Pilot</h2>
        <p>
          As an early-stage service, data handling practices may evolve as the pilot
          progresses. Pilot participants will be notified of any material changes to
          data handling before such changes take effect.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Inquiries</h2>
        <p>
          Questions regarding data practices during the pilot phase can be submitted
          through the pilot access request process or via your designated pilot contact.
        </p>
      </section>
    </PilotPageLayout>
  );
}
