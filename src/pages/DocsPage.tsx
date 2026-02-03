import { PilotPageLayout } from '../components/PilotPageLayout';

export function DocsPage() {
  return (
    <PilotPageLayout
      title="Documentation"
      subtitle="Developer resources for pilot participants."
    >
      <section className="space-y-6 text-gray-300">
        <p>
          Documentation and developer resources are available to approved Loggie
          pilot participants. Access is provided as part of the pilot onboarding
          process.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Access Required</h2>
        <p>
          SDK documentation, API references, and integration guidance are currently
          available only to organizations participating in the Loggie pilot program.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">What's Included</h2>
        <p>
          Pilot participants receive access to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>SDK installation and quickstart guidance</li>
          <li>API reference documentation</li>
          <li>Integration examples and representative code samples</li>
          <li>Direct support channels during the pilot period</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Getting Started</h2>
        <p>
          Once approved for the pilot, participants receive credentials and links
          to access the documentation portal as part of onboarding. A designated
          pilot contact will guide initial setup and integration.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Public Documentation</h2>
        <p>
          Public documentation will be released prior to general availability.
          During the pilot phase, documentation is refined in collaboration with
          pilot participants based on real-world integration feedback.
        </p>
      </section>
    </PilotPageLayout>
  );
}
