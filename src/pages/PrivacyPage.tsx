import { PilotPageLayout } from '../components/PilotPageLayout';

export function PrivacyPage() {
  return (
    <PilotPageLayout
      title="Privacy Policy"
      subtitle="How we handle data during the pilot program."
    >
      <section className="space-y-6 text-gray-300">
        <p>
          This privacy policy applies to participants in the Loggie pilot program.
          It describes our current data practices during this evaluation phase.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Program Scope</h2>
        <p>
          Loggie is currently available through controlled pilot access only.
          Data handling practices described here apply specifically to pilot participants
          and may be updated prior to general availability.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Data We Collect</h2>
        <p>
          During the pilot, we collect information necessary to evaluate the service
          and support pilot participants:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Contact information provided during pilot registration</li>
          <li>Usage data to understand how the service is being evaluated</li>
          <li>Feedback and communications with our team</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Data We Do Not Collect</h2>
        <p>
          Loggie is designed around cryptographic proof, not data custody. We do not:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Store or host your files or digital assets</li>
          <li>Retain copies of content you verify</li>
          <li>Access private keys or wallet credentials</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Changes During Pilot</h2>
        <p>
          As an early-stage service, our practices may evolve. Pilot participants will
          be notified directly of any material changes to data handling before they
          take effect.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Contact</h2>
        <p>
          For questions about data practices during the pilot, reach out through the
          pilot access request form or your designated pilot contact.
        </p>
      </section>
    </PilotPageLayout>
  );
}
