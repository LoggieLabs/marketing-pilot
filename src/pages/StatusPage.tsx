import { PageLayout } from '../components/PageLayout';
import { Address } from '../components/shared/Proof';
import {
  SHIPPED,
  PARTIAL,
  LIMITS,
  LIMIT_GROUPS,
  FINDINGS,
  FINDINGS_SUMMARY,
  CONTRACT_MAP,
  LAST_VERIFIED,
  CONTACT,
} from '../data/status';

const severityColour: Record<string, string> = {
  HIGH: 'text-red-400',
  MEDIUM: 'text-amber-300',
  INFO: 'text-gray-400',
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-white tracking-[-0.02em] mt-16 mb-6 scroll-mt-28">
      {children}
    </h2>
  );
}

/**
 * The ledger. Everything on this page is rendered from src/data/status.ts, so
 * there is exactly one place to update when reality moves — and that file
 * carries the maintenance contract.
 *
 * This page is load-bearing: the whole site claims you do not have to trust us,
 * and this is where that claim is cashed. If it goes stale, the site starts
 * lying without anybody deciding to.
 */
export function StatusPage() {
  return (
    <PageLayout
      wide
      title="Status"
      subtitle="What works, what is narrower than it sounds, what is missing, and every contract defect we know about. Nothing here is rounded in our favour."
    >
      <p className="mono text-2xs text-gray-400">
        Last checked {LAST_VERIFIED} · if this page is out of date, that is a bug —{' '}
        <a href={`mailto:${CONTACT}`} className="text-gray-400 hover:text-white transition-colors">
          {CONTACT}
        </a>
      </p>

      {/* ── Shipped ─────────────────────────────────────────────────── */}
      <Heading id="shipped">Working today</Heading>
      <ul className="space-y-6">
        {SHIPPED.map((item) => (
          <li key={item.name} className="border-l-2 border-green-400/50 pl-5">
            <h3 className="text-base font-semibold text-white">{item.name}</h3>
            <p className="mt-1.5 text-sm text-gray-300 leading-relaxed">{item.detail}</p>
            <p className="mono text-2xs text-gray-400 mt-2 break-words">{item.source}</p>
          </li>
        ))}
      </ul>

      {/* ── Partial ─────────────────────────────────────────────────── */}
      <Heading id="partial">Real, but narrower than it sounds</Heading>
      <ul className="space-y-6">
        {PARTIAL.map((item) => (
          <li key={item.name} className="border-l-2 border-amber-400/50 pl-5">
            <h3 className="text-base font-semibold text-white">{item.name}</h3>
            <p className="mt-1.5 text-sm text-gray-300 leading-relaxed">{item.detail}</p>
            <p className="mono text-2xs text-gray-400 mt-2 break-words">{item.source}</p>
          </li>
        ))}
      </ul>

      {/* ── Limits ──────────────────────────────────────────────────── */}
      <Heading id="limits">What Loggie can't do yet</Heading>
      {/* Grouped, because a flat list put "no likes" beside "unaudited" as
          though they were the same kind of fact. Groups come from status.ts. */}
      {LIMIT_GROUPS.map((group) => {
        const rows = LIMITS.filter((l) => l.kind === group.kind);
        if (!rows.length) return null;
        return (
          <div key={group.kind} className="mt-8 first:mt-0">
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            <p className="mt-1 text-sm text-gray-400 leading-relaxed">{group.blurb}</p>
            <ol className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {rows.map((limit) => (
                <li key={limit.headline} className="py-5">
                  <p className="text-base leading-relaxed">
                    <span className="text-amber-300 font-medium">{limit.headline}</span>{' '}
                    <span className="text-gray-300">{limit.detail}</span>
                  </p>
                  <p className="mono text-2xs text-gray-400 mt-2 break-words">{limit.source}</p>
                </li>
              ))}
            </ol>
          </div>
        );
      })}

      {/* ── Defect registry ─────────────────────────────────────────── */}
      <Heading id="defects">Contract defects</Heading>
      <p className="text-base text-gray-300 leading-relaxed">
        {FINDINGS_SUMMARY.total} findings on record — {FINDINGS_SUMMARY.high} high,{' '}
        {FINDINGS_SUMMARY.medium} medium, {FINDINGS_SUMMARY.info} info. A source fix is not a
        deployed fix: {FINDINGS_SUMMARY.stillOnChain} of {FINDINGS_SUMMARY.total} are still present
        in the deployed bytecode on Sepolia. That is a large part of why there is no real money in
        these contracts.
      </p>

      <div className="overflow-x-auto mt-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[40rem]">
          <caption className="sr-only">
            Known contract defects, their severity, whether they are fixed in source, and whether
            they are still present in the deployed Sepolia bytecode
          </caption>
          <thead>
            <tr className="border-b border-white/[0.12]">
              <th scope="col" className="py-3 pr-4 text-2xs font-medium text-gray-400 uppercase">
                Finding
              </th>
              <th scope="col" className="py-3 pr-4 text-2xs font-medium text-gray-400 uppercase">
                Severity
              </th>
              <th scope="col" className="py-3 pr-4 text-2xs font-medium text-gray-400 uppercase">
                In source
              </th>
              <th scope="col" className="py-3 text-2xs font-medium text-gray-400 uppercase">
                On Sepolia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.07]">
            {FINDINGS.map((f) => (
              <tr key={f.id}>
                <td className="py-3.5 pr-4 align-top">
                  <span className="text-sm text-gray-200">{f.title}</span>
                  <span className="mono block text-2xs text-gray-400 mt-1">{f.contracts}</span>
                </td>
                <td className={`py-3.5 pr-4 align-top mono text-2xs ${severityColour[f.severity]}`}>
                  {f.severity}
                </td>
                <td className="py-3.5 pr-4 align-top text-2xs text-gray-400">{f.status}</td>
                <td
                  className={`py-3.5 align-top text-2xs ${
                    f.onChain === 'fixed' ? 'text-green-400' : 'text-amber-300'
                  }`}
                >
                  {f.onChain}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mono text-2xs text-gray-400 mt-4 break-words">
        Generated {FINDINGS_SUMMARY.generated} · {FINDINGS_SUMMARY.source}
      </p>

      {/* ── Contracts ───────────────────────────────────────────────── */}
      <Heading id="contracts">Deployed contracts</Heading>
      <p className="text-base text-gray-300 leading-relaxed">
        24 contracts are deployed on Ethereum's Sepolia test network. 13 of the 13 we checked have
        their source published and verified on Etherscan. Zero are deployed on Ethereum mainnet —
        that address file is literally an empty object. Below are the ones you actually touch.
      </p>

      <ul className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {CONTRACT_MAP.map((row) => (
          <li key={row.address} className="py-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-sm font-medium text-white">{row.familiar}</span>
              <span className="mono text-2xs text-gray-400">{row.actual}</span>
              <Address value={row.address} label={row.actual} />
            </div>
            <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{row.note}</p>
          </li>
        ))}
      </ul>

      <div className="section-separator my-12" aria-hidden="true" />

      <p className="text-sm text-gray-400 leading-relaxed">
        No outside security firm has reviewed this code, and no audit is booked. We are not going to
        use the word secure while that is true.
      </p>
    </PageLayout>
  );
}
