import { useCallback, useState, type ReactNode } from 'react';
import { Check, ChevronRight, Copy, ExternalLink } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   PROOF PRIMITIVES

   The site's whole argument is "you don't have to trust us" — so the page
   is built so that a claim and its evidence cannot be separated. These are
   the pieces that enforce it.

   THE RULE FOR ANYONE EDITING THIS SITE: every value passed to <Address>,
   <TxHash>, <Block> or <Evidence> must be a real value copied from the
   repository or read off the chain. There are no placeholder addresses,
   no illustrative block numbers, and no mock screenshots anywhere on this
   site. A product claiming verifiable truth does not advertise with fake
   verification.
   ═══════════════════════════════════════════════════════════════════════ */

const EXPLORER = 'https://sepolia.etherscan.io';

function truncate(value: string, head = 6, tail = 4): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}

function useCopy(value: string) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard?.writeText(value).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => {
        /* Clipboard blocked (insecure context, denied permission). The value is
           visible and the explorer link still works, so there is nothing to
           recover from and nothing to apologise for. */
      },
    );
  }, [value]);
  return { copied, copy };
}

/* ── Addresses ──────────────────────────────────────────────────────── */

interface AddressProps {
  /** The real, full contract address. Never truncate before passing it in. */
  value: string;
  /** What a visitor calls this thing, e.g. "your inbox factory". Optional. */
  label?: string;
  className?: string;
}

/**
 * A deployed Sepolia contract address: truncated for reading, copyable in
 * full, and linked to the block explorer so the claim beside it can be
 * checked without asking us for anything.
 */
export function Address({ value, label, className = '' }: AddressProps) {
  const { copied, copy } = useCopy(value);

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <a
        href={`${EXPLORER}/address/${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mono text-2xs sm:text-xs text-gray-300 hover:text-loggie-cyan
                   transition-colors border-b border-gray-700 hover:border-loggie-cyan/60"
        title={label ? `${label} — ${value}` : value}
      >
        {truncate(value)}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Address copied' : `Copy address ${value}`}
        className="text-gray-600 hover:text-gray-300 transition-colors"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
        ) : (
          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </button>
    </span>
  );
}

/** A real transaction hash on Sepolia, linked to the explorer. */
export function TxHash({ value, className = '' }: { value: string; className?: string }) {
  return (
    <a
      href={`${EXPLORER}/tx/${value}`}
      target="_blank"
      rel="noopener noreferrer"
      title={value}
      className={`mono text-2xs sm:text-xs text-gray-300 hover:text-loggie-cyan transition-colors
                  border-b border-gray-700 hover:border-loggie-cyan/60 ${className}`}
    >
      {truncate(value, 10, 5)}
    </a>
  );
}

/** A real Sepolia block number, linked to the explorer. */
export function Block({ value, className = '' }: { value: number; className?: string }) {
  return (
    <a
      href={`${EXPLORER}/block/${value}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`mono text-2xs sm:text-xs text-gray-300 hover:text-loggie-cyan transition-colors
                  border-b border-gray-700 hover:border-loggie-cyan/60 ${className}`}
    >
      block {value.toLocaleString('en-US')}
    </a>
  );
}

/* ── The proof rule ─────────────────────────────────────────────────── */

/**
 * The site's one structural device, and the thing that makes the whole page
 * work: a claim and the artefact behind it, welded together.
 *
 * It is COLLAPSED by default. The citations are the reason to believe the
 * sentence above them, but a reader who has not yet decided they care should
 * not have to walk through `setup-tasks.ts:23-29` to reach the next idea.
 * Open it and you get file paths, test names, CIDs and block numbers — enough
 * to go and check the claim yourself.
 *
 * A block carrying this is making a claim with a checkable artefact behind it.
 * A block without one is making no verifiable claim — the absence is
 * information, so never add this for visual rhythm.
 */
export function Evidence({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <details className={`group mt-6 max-w-2xl ${className}`}>
      <summary
        className="inline-flex cursor-pointer list-none items-center gap-2 text-2xs
                   text-gray-400 transition-colors hover:text-loggie-cyan
                   [&::-webkit-details-marker]:hidden"
      >
        <span className="proof-rule shrink-0" aria-hidden="true" />
        <span className="mono">Evidence &amp; source references</span>
        <ChevronRight
          className="h-3 w-3 shrink-0 transition-transform group-open:rotate-90"
          aria-hidden="true"
        />
      </summary>
      <p className="mono mt-3 text-2xs leading-relaxed text-gray-400">{children}</p>
    </details>
  );
}

/* ── Section furniture ──────────────────────────────────────────────── */

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
  /** Optional standfirst under the headline. */
  lede?: ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, children, lede, className = '' }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="mono text-2xs text-loggie-cyan/90 mb-4">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.1] tracking-[-0.02em]">
        {children}
      </h2>
      {lede ? <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-2xl">{lede}</p> : null}
    </div>
  );
}

/* ── Semantic states, borrowed from the app so both speak with one voice ── */

/** Amber — "public, be careful" and "this is a limit, not a promise". */
export function Caution({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm
                  leading-relaxed text-amber-200/90 ${className}`}
    >
      {children}
    </div>
  );
}

/** Green — verified, done, recoverable. */
export function Affirm({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-green-400 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" aria-hidden="true" />
      {children}
    </span>
  );
}

/* ── The status strip ───────────────────────────────────────────────────
   The four things that would make the rest of the page a lie if they were
   not said out loud. Rendered as a copy of the app's own bottom-right
   chrome, so the first thing a visitor sees is a piece of the real product.
   It appears in the hero and again above the final call to action —
   verbatim both times. Do not soften it and do not move it to the footer.
   ─────────────────────────────────────────────────────────────────────── */

export const STATUS_FACTS = [
  "Public beta on Ethereum's Sepolia test network",
  'Not independently audited',
  'Desktop browser + MetaMask',
  'Creating your inbox costs 0.01 test ETH plus gas',
  'No subscription, no plan, no checkout',
] as const;

/**
 * The hero's shorter cut. The two facts it drops — the inbox fee and the
 * absence of a subscription — are money questions, and a four-word fragment
 * raises them without answering them ("no markup, so who gets the 0.01?").
 * They get a full, plain answer in the getting-started section instead.
 * Nothing here contradicts the full strip; it is a subset, never a softening.
 */
export const STATUS_FACTS_SHORT = [
  'Public beta',
  'Ethereum Sepolia test network',
  'Desktop browser + MetaMask',
  'Not independently audited',
] as const;

export function StatusStrip({
  className = '',
  short = false,
}: {
  className?: string;
  /** Hero variant: the four facts that need no further explanation. */
  short?: boolean;
}) {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-lg
                  border border-white/[0.07] bg-gray-900/90 px-3.5 py-2.5 backdrop-blur ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 animate-micro-pulse" aria-hidden="true" />
      {(short ? STATUS_FACTS_SHORT : STATUS_FACTS).map((fact, i, all) => (
        <span key={fact} className="mono text-2xs text-gray-400">
          {fact}
          {i < all.length - 1 ? <span className="text-gray-700 ml-2">·</span> : null}
        </span>
      ))}
    </div>
  );
}

/* ── Links out ──────────────────────────────────────────────────────── */

export function Outbound({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-loggie-cyan hover:text-loggie-cyan/80
                  transition-colors ${className}`}
    >
      {children}
      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
    </a>
  );
}
