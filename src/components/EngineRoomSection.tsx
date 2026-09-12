import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Address, Outbound } from './shared/Proof';
import { CONTRACT_MAP } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   §9 — THE BUILDING

   The flagship section. Its job is to make the contract ecosystem the reason
   the earlier emotional claims are true — not by drawing an architecture
   diagram, but by mapping every noun the visitor has already met to an
   address they can paste into a block explorer.

   The prose sits in one column and reads as a specification. That is the
   flex: a page that has spent eight sections being warm can afford one
   section that is simply exact.

   This section carries the second of the site's three permitted uses of the
   brand gradient — one hairline, under the four-part structure. The wordmark
   and the scrollbar are the other two. Do not add a third here.
   ═══════════════════════════════════════════════════════════════════════ */

export function EngineRoomSection() {
  return (
    <SectionWrapper id="engine-room">
      <SectionHeading eyebrow="INSPECT THE PROTOCOL">Nothing important is hidden behind the app.</SectionHeading>

      <div className="mt-10 max-w-3xl space-y-5">
        <p className="text-lg text-gray-300 leading-relaxed">
          You don't need to understand this section to use Loggie. It's here because everything
          above should be independently inspectable.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          Here is the part most products keep in a whitepaper. Every noun you have just read has an
          address.
        </p>
      </div>

      {/* The one permitted gradient hairline. */}
      <div
        className="h-px w-full max-w-3xl my-10 bg-gradient-to-r from-loggie-purple via-loggie-cyan to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-3xl space-y-5">
        <p className="text-base text-gray-300 leading-relaxed">
          The app stores exactly one contract address — the Loggie registry. Every factory, inbox
          implementation and anchor address is read out of it at runtime, and a scripted check fails
          the build if anyone hardcodes a second one. That is not tidiness. It is why a rogue factory
          cannot be slipped into the system, and why your inbox cannot be orphaned by a redeploy.
        </p>
        <p className="text-base text-gray-300 leading-relaxed">
          Your inbox is a minimal-proxy clone of a shared template, which is why owning a real
          contract costs a fraction of deploying one. When the registry moved to its permanent
          upgradeable address in August, 23 existing registrations covering 13 users were replayed in
          19 public transactions and the migration tool was then permanently disabled. Nobody had to
          do anything.
        </p>
        <p className="text-base text-gray-300 leading-relaxed">
          The encryption underneath is standard and stacked: X25519 combined with ML-KEM-1024, the
          algorithm NIST standardised as FIPS 203. The post-quantum library is public, MIT-licensed
          and installable today as{' '}
          <code className="mono text-loggie-cyan">@omnituum/pqc-shared</code> —{' '}
          <Outbound href="https://www.npmjs.com/package/@omnituum/pqc-shared">on npm</Outbound>.
          Loggie builds the protocol; the primitives are Omnituum's and we do not take credit for
          them.
        </p>
        <p className="text-base text-gray-300 leading-relaxed">
          Three things we won't pretend: Loggie is not fully decentralised, not independently
          audited, and not on mainnet. Loggie Labs runs the default storage gateway and the feed
          index. Both are replaceable, and the index is never the source of truth — your browser
          re-derives the feed from the chain itself and silently falls back to a full scan when the
          index is missing — but they are real services we operate, and pretending otherwise would
          be the first lie on this page.
        </p>
      </div>

      {/* The table. Not cards: this is reference material and should look like it. */}
      <div className="mt-14 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[44rem]">
          <caption className="sr-only">
            Loggie contracts deployed on Ethereum's Sepolia test network, mapped to what a visitor
            calls them
          </caption>
          <thead>
            <tr className="border-b border-white/[0.12]">
              <th scope="col" className="py-3 pr-6 mono text-2xs font-normal text-gray-400">
                what you call it
              </th>
              <th scope="col" className="py-3 pr-6 mono text-2xs font-normal text-gray-400">
                what it actually is
              </th>
              <th scope="col" className="py-3 mono text-2xs font-normal text-gray-400">
                where it lives
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {CONTRACT_MAP.map((row) => (
              <tr key={row.address} className="group">
                <td className="py-4 pr-6 align-top">
                  <span className="text-sm font-medium text-white">{row.familiar}</span>
                </td>
                <td className="py-4 pr-6 align-top">
                  <span className="mono text-2xs text-gray-300">{row.actual}</span>
                  <span className="block text-2xs text-gray-400 leading-relaxed mt-1.5 max-w-sm">
                    {row.note}
                  </span>
                </td>
                <td className="py-4 align-top whitespace-nowrap">
                  <Address value={row.address} label={row.actual} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-gray-400 leading-relaxed max-w-3xl">
        24 contracts are deployed on Ethereum's Sepolia test network. 13 of the 13 we checked have
        their source published and verified on Etherscan. Zero are on Ethereum mainnet — that
        address file is literally an empty object.
      </p>

      {/* The two neighbouring surfaces, each with its boundary stated. */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-5xl">
        <div className="card-material rounded-xl p-6">
          <h3 className="text-base font-semibold text-white">Under the app</h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            18 MIT-licensed TypeScript packages doing the identity, envelope, chain and social
            work, with a public API frozen in version control so renaming an exported function fails
            the build until the change is committed on purpose. The app depends on twelve of them.
          </p>
          <p className="mono text-2xs text-gray-400 mt-3">
            not published to npm — the app and SDK sources are not public yet
          </p>
        </div>

        <div className="card-material rounded-xl p-6">
          <h3 className="text-base font-semibold text-white">Also in a terminal</h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            <code className="mono text-loggie-cyan">loggie</code> puts the same identity format, the
            same envelopes and the same contracts on the same network into a terminal. It is
            MIT-licensed and in open development — not released, not on npm, and moving one identity
            between the two doors is not wired up yet.
          </p>
        </div>
      </div>

      <Evidence>
        addresses.ts on Sepolia: "LoggieCID is the ONLY stored address … all other contract addresses
        MUST be discovered on-chain", enforced by check-address-hygiene.sh inside{' '}
        <code className="mono">pnpm check:all</code>. Every address in the table is copied from
        contracts/loggie-contracts/exports/addresses/sepolia.json, which holds 24 entries;
        mainnet.json holds none. 13 of 13 checked are verified on Etherscan (evidence/cutover-run.log
        lines 217-230). Inboxes are EIP-1167 minimal-proxy clones. CUTOVER_EVIDENCE_2026-08-19.md
        §2-§3: 23 pairs, 13 users, 19 transactions, migrator disposed.
        SOCIAL_INDEXER_V1_SPEC.md §0: "Materialized discovery only, never canonical truth".
      </Evidence>
    </SectionWrapper>
  );
}
