import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution, TxHash, Block, Address } from './shared/Proof';
import { ANCHORS, CONTRACT_MAP } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   §5 — PROVE IT EXISTED

   The most legible, most demoable and most immediately valuable thing in the
   product, and the one thing an Instagram post can never do. This is the
   section that sells.

   HARD RULE, inherited from the branding review: nothing here may be a
   facsimile. The old site's PreviewSection carried a fabricated
   "Block #18,234,567", a fake CID and a floating green VERIFIED badge — a
   product claiming verifiable truth must not advertise with a fake
   verification screenshot. No genuine capture of the certificate export
   exists in the repo yet, so this section ships as type plus the real mono
   receipts, which the spec explicitly permits. Every value below resolves on
   sepolia.etherscan.io right now. Replace with a real capture when one is
   taken; never with a rendering of one.
   ═══════════════════════════════════════════════════════════════════════ */

const ANCHOR_CONTRACT = CONTRACT_MAP.find((row) => row.actual === 'NotarizationAnchor');

export function ProveItSection() {
  return (
    <SectionWrapper id="prove-it">
      <SectionHeading eyebrow="PROOF ONE">Prove it existed. Let anyone check it without asking you.</SectionHeading>

      <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl space-y-5">
          <p className="text-lg text-gray-300 leading-relaxed">
            Pick a file and press Publish proof. Loggie writes a fingerprint of it, with a
            timestamp, onto a public blockchain, and hands you back a printable certificate plus a
            machine-readable file carrying the hash, the transaction, the block number and a QR
            code. Send that to a client, a lawyer or a court.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Whoever opens it does not need a Loggie account, a wallet, or your permission. The page
            fetches the file from the public storage network, recomputes the fingerprint in their
            own browser, and re-reads the blockchain record itself. It does not take our word for
            anything — it redoes the maths.
          </p>

          <Caution>
            These are real transactions on Ethereum's Sepolia test network. The proof is real and
            anyone can check it; the ETH that paid for it is not real money. Nothing of ours is
            deployed on Ethereum mainnet. Anchoring is always something you confirm in your wallet
            — it never happens to you.
          </Caution>
        </div>

        {/* The two real anchors. Mono receipts, both resolvable. */}
        <div className="code-material rounded-xl p-6">
          <p className="mono text-2xs text-loggie-cyan/90">Two anchors you can open right now</p>

          <dl className="mt-5 space-y-6">
            <div>
              <dt className="text-sm text-gray-300 leading-relaxed">{ANCHORS.journal.what}</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <Block value={ANCHORS.journal.block} />
                <TxHash value={ANCHORS.journal.tx} />
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-300 leading-relaxed">{ANCHORS.recovered.what}</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <Block value={ANCHORS.recovered.block} />
                <TxHash value={ANCHORS.recovered.tx} />
              </dd>
              <dd className="mono text-2xs text-gray-400 mt-2 break-all">{ANCHORS.recovered.cid}</dd>
            </div>
          </dl>

          <div className="section-separator my-6" aria-hidden="true" />

          <p className="mono text-2xs text-gray-400 leading-relaxed">
            recomputed in the reader's browser — @helia/verified-fetch against
            trustless-gateway.link, dweb.link and ipfs.io; the Anchored event parsed with viem
          </p>

          {ANCHOR_CONTRACT ? (
            <p className="mt-4 flex flex-wrap items-center gap-2 mono text-2xs text-gray-400">
              roots land on {ANCHOR_CONTRACT.actual}
              <Address value={ANCHOR_CONTRACT.address} label={ANCHOR_CONTRACT.actual} />
            </p>
          ) : null}
        </div>
      </div>

      {/* What goes on the chain, and the thing for material people argue about. */}
      <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-5xl">
        <div className="card-material rounded-xl p-6">
          <h3 className="text-base font-semibold text-white">What goes on the chain</h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            A fingerprint, a pointer and a timestamp. Never the file, never its name, never its
            contents.
          </p>
        </div>

        <div className="card-material rounded-xl p-6">
          <h3 className="text-base font-semibold text-white">
            For evidence people may dispute
          </h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            Loggie also has an experimental claim protocol for attaching evidence, support,
            disputes and resolution history to one precise statement. It records provenance rather
            than deciding truth, and nothing in it is ever deleted or rewritten. There is
            deliberately no money, no staking and no bond behind it yet.
          </p>
          {/* No link: there is no Bonded Claims page to send anyone to. When one
              exists, this is where it goes. Never link a page that isn't there. */}
        </div>
      </div>

      <Evidence>
        proof-export.ts emits schema loggie.proof-of-existence.v1 carrying the hash, transaction,
        block and QR code; verifier/main.ts recomputes the CID and parses the Anchored event, closed
        as LA-24b. The two anchors above are recorded in JOURNAL_V1.md §6 and the seal.v3 adoption
        matrix's final three-control recovery acceptance. Bonded Claims state was validated against
        four independent sources that all agreed across Sepolia blocks 11,637,920–11,640,911;
        the escrow half is deliberately unbuilt.
      </Evidence>
    </SectionWrapper>
  );
}
