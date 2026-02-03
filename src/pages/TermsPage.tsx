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
          By participating in the pilot, you agree to the conditions below.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Program</h2>
        <p>
          Loggie is currently operating in a limited pilot phase with restricted
          availability. Access is provided on an evaluation basis only and may be
          modified, limited, or discontinued at any time during the pilot period.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Service Description</h2>
        <p>
          Loggie provides cryptographic proof tooling designed to generate verifiable
          records of content existence and integrity. Proofs are created using
          cryptographic hashing and independent verification anchors.
        </p>
        <p className="text-gray-400 mt-3">
          Loggie does not provide custody, storage, or hosting of user content.
          User content remains under the control of the participant at all times.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Limitations</h2>
        <p>
          During the pilot phase:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Features and functionality may change without notice</li>
          <li>Service availability and performance are not guaranteed</li>
          <li>Support is provided on a best-effort basis</li>
          <li>Usage limits, scope restrictions, or access controls may apply</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Acceptable Use</h2>
        <p>
          Pilot participants agree to use the service solely for lawful evaluation
          purposes. Misuse, abuse, or use outside the intended evaluation scope may
          result in removal from the pilot program.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">No Warranties or Guarantees</h2>
        <p>
          The pilot service is provided "as is" for evaluation purposes only. Loggie
          does not guarantee legal admissibility, regulatory acceptance, or suitability
          for any specific use case. Participants are responsible for determining whether
          the service meets their requirements.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Feedback</h2>
        <p>
          Feedback from pilot participants is welcome. Any feedback provided may be
          used to improve the service without obligation or compensation.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Changes to Terms</h2>
        <p>
          These terms may be updated as the pilot progresses. Continued participation
          in the pilot following changes constitutes acceptance of the updated terms.
        </p>
      </section>
    </PilotPageLayout>
  );
}
