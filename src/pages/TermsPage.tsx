import { PageLayout } from '../components/PageLayout';

/*
 * Rewritten out of the pilot register: no invite-only framing, no NDA, no
 * "restricted availability". The honest availability language about a test
 * network is kept and sharpened, because it is now the most important part.
 *
 * NOT LEGAL ADVICE AND NOT LAWYER-REVIEWED. The open questions list flags this
 * page and /privacy as needing counsel before launch.
 */
export function TermsPage() {
  return (
    <PageLayout
      title="Terms"
      subtitle="What Loggie is, what it is not, and what we are not promising."
    >
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p>
          By using Loggie you accept these terms. If you do not, do not use it — nothing here is
          worth agreeing to something you disagree with.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">What Loggie is</h2>
        <p>
          Loggie is a user-owned identity, encrypted file space, journal, inbox and public feed. Your
          keys are generated on your own device. Records you choose to anchor are written to a public
          blockchain so that anyone can independently re-check them, without needing your permission
          or ours.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Public beta on a test network</h2>
        <p>
          Loggie runs on Ethereum's Sepolia test network. The proofs are real and independently
          checkable; the ETH that pays for them is test ETH and is not money. Nothing of ours is
          deployed on Ethereum mainnet. Test networks can be reset, reorganised or discontinued by
          parties entirely outside our control, and if that happens records anchored there may become
          unverifiable. Do not treat a Sepolia anchor as a permanent legal record.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">No audit, no warranty</h2>
        <p>
          No outside security firm has reviewed this code, and no audit is booked. Loggie is provided
          as-is and as-available, without warranties of any kind, express or implied, including
          merchantability, fitness for a particular purpose and non-infringement. We do not warrant
          that it will be uninterrupted, error-free, or that any record will remain retrievable.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">You hold your own keys</h2>
        <p>
          There is no account and no password, so there is no password reset and no support path that
          can restore access for you. If you lose access to the wallet your identity was derived
          from, and you have no encrypted backup the network can find, your content cannot be
          recovered by anyone, including us. Files you never anchored exist only on the machine you
          made them on.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Nothing can be deleted</h2>
        <p>
          An anchored record cannot be un-anchored. Public posts and anchors are permanent and public
          by design. Think before you publish.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Fees</h2>
        <p>
          Loggie charges no subscription and takes no markup. You pay the network's own transaction
          fee, plus a protocol fee on actions you choose to put on-chain — currently 0.01 ETH plus
          gas to create your inbox. On Sepolia these are paid in free test ETH. Fees are never
          refundable, because we never hold them.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Acceptable use</h2>
        <p>
          Do not use Loggie to publish content that is unlawful where you are, to harass or endanger
          anyone, to infringe someone else's rights, or to attack the network or other users. We
          cannot read your encrypted content and therefore cannot moderate it; that makes your own
          judgement the only control there is.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Loggie Labs is not liable for any indirect,
          incidental, special or consequential damages, or for lost data, lost profits or lost
          records, arising from your use of Loggie.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Changes</h2>
        <p>
          These terms may change as Loggie develops. Material changes will be published here before
          they take effect.
        </p>

        <h2 className="text-xl font-semibold text-white pt-6">Contact</h2>
        <p>
          <a href="mailto:security@loggielabs.com" className="text-loggie-cyan hover:underline">
            security@loggielabs.com
          </a>
        </p>
      </div>
    </PageLayout>
  );
}
