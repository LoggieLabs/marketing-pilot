import { PilotPageLayout } from '../components/PilotPageLayout';

export function TermsPage() {
  return (
    <PilotPageLayout
      title="Terms of Service"
      subtitle="Pilot program terms and conditions."
    >
      <section className="space-y-6 text-gray-300">
        <p>
          These terms apply to participants in the Loggie pilot program.
          By participating in the pilot, you agree to the following conditions.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Program</h2>
        <p>
          Loggie is currently in a pilot phase with limited availability.
          Access is granted on an evaluation basis and may be modified or
          discontinued at our discretion.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Service Description</h2>
        <p>
          Loggie provides cryptographic proof services for digital assets.
          The service creates verifiable records of content existence and
          integrity using blockchain technology.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Loggie does not provide custody, storage, or hosting of user content.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Limitations</h2>
        <p>
          During the pilot phase:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Features and functionality may change without notice</li>
          <li>Service availability is not guaranteed</li>
          <li>Support is provided on a best-effort basis</li>
          <li>Usage limits may apply</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Acceptable Use</h2>
        <p>
          Pilot participants agree to use the service for lawful evaluation
          purposes only. Misuse may result in removal from the pilot program.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Feedback</h2>
        <p>
          We welcome feedback from pilot participants. Any feedback provided
          may be used to improve the service without obligation or compensation.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Changes to Terms</h2>
        <p>
          These terms may be updated as the pilot progresses. Participants will
          be notified of material changes. Continued participation constitutes
          acceptance of updated terms.
        </p>
      </section>
    </PilotPageLayout>
  );
}
