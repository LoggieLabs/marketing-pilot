import { PageLayout } from '../components/PageLayout';

/*
 * Rewritten out of the pilot register. The "What we do not collect" section is
 * kept almost verbatim from the previous version — it was the best copy on the
 * old site — with the pilot-programme scoping removed and the encrypted-intake
 * detail added, because that is now the only thing this website collects.
 *
 * NOT LEGAL ADVICE AND NOT LAWYER-REVIEWED. The open questions list flags this
 * page and /terms as needing counsel before launch.
 */
export function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy"
      subtitle="What this website collects, what the app does not, and what we cannot see even if we wanted to."
    >
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p>
          There are two separate things here: this marketing website, and the Loggie app at
          app.loggielabs.com. They collect very different amounts, so they are described separately.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">This website</h2>
        <p>
          If you fill in the email form, your submission is encrypted in your browser before it is
          sent. Our server stores the ciphertext and cannot read it — the database has no plaintext
          column, so this is structural rather than a promise. Only an offline key on a machine that
          is not connected to this site can open it.
        </p>
        <p>Alongside the ciphertext the server records:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>a submission id computed in your browser, which the server only shape-checks</li>
          <li>the time it arrived</li>
          <li>a salted SHA-256 hash of your IP address — not the address itself</li>
          <li>your browser's user-agent and referring page</li>
        </ul>
        <p className="text-gray-400">
          There is no analytics script, no advertising pixel, no session recording and no
          third-party tag on this site.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">What we do not collect</h2>
        <p>
          Loggie is designed around cryptographic proof, not data custody. Loggie does not:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Store, host, or retain your files or digital assets in readable form</li>
          <li>Retain copies of content you verify</li>
          <li>Access or store private keys, signing keys, or wallet credentials</li>
        </ul>
        <p className="text-gray-400">Your content remains under your control at all times.</p>

        <h2 className="text-xl font-semibold text-white pt-6">The app</h2>
        <p>
          Your keys are generated on your own device from a wallet signature. Files, journal entries
          and your private contacts vault are encrypted in your browser before anything is uploaded;
          the sealed object carries no filename, file type, timestamp, wallet address or recipient
          list. Messages are end-to-end encrypted but still use an older envelope that carries
          routing hints in the open — see{' '}
          <a href="/status" className="text-loggie-cyan hover:underline">
            Status
          </a>
          .
        </p>
        <p>
          Loggie Labs operates two services the app uses by default: a storage gateway and a feed
          discovery index. Both are replaceable, and the index is never the source of truth — your
          browser re-derives the feed from the chain. Both can see request metadata such as IP
          addresses and the content identifiers you ask for. They cannot read your encrypted
          content.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">What a public blockchain means</h2>
        <p>
          Anything you choose to anchor is written to Ethereum's Sepolia test network, which is
          public and permanent. What goes on the chain is a fingerprint, a pointer and a timestamp —
          never the file, its name or its contents. It cannot be deleted or un-anchored afterwards,
          by you or by us. The Journal has no erasure. We do not offer a right to be forgotten we
          cannot deliver.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Changes</h2>
        <p>
          Loggie is in public beta and these practices may change. Material changes will be
          published here before they take effect.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Questions</h2>
        <p>
          Write to{' '}
          <a href="mailto:security@loggielabs.com" className="text-loggie-cyan hover:underline">
            security@loggielabs.com
          </a>
          . Security disclosures are acknowledged within 72 hours, with a fix or mitigation targeted
          within 90 days.
        </p>
      </div>
    </PageLayout>
  );
}
