import { PilotPageLayout } from '../components/PilotPageLayout';

export function DocsPage() {
  return (
    <PilotPageLayout
      title="Documentation"
      subtitle="Developer resources for pilot participants."
    >
      <section className="space-y-6 text-gray-300">
        <p>
          Documentation and developer resources are available to approved
          pilot participants. Access is provided as part of the pilot onboarding
          process.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Pilot Access Required</h2>
        <p>
          SDK documentation, API references, and integration guides are currently
          available only to organizations participating in the pilot program.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">What's Included</h2>
        <p>
          Pilot participants receive access to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>SDK installation and quickstart guides</li>
          <li>API reference documentation</li>
          <li>Integration examples and code samples</li>
          <li>Direct support channel access</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Getting Started</h2>
        <p>
          Once approved for the pilot, you'll receive credentials and links
          to access the full documentation portal. Your pilot contact will
          guide you through the onboarding process.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Public Documentation</h2>
        <p>
          Comprehensive public documentation will be released alongside
          general availability. During the pilot phase, we're refining
          documentation based on participant feedback.
        </p>
      </section>
    </PilotPageLayout>
  );
}
