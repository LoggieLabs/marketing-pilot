#!/usr/bin/env node
/**
 * check-claims — the copy lint for this website.
 *
 * The site's entire argument is "you don't have to trust us". That only works
 * if nothing on it overclaims. This file is the mechanical half of that
 * promise: it fails the build when banned vocabulary, an unqualified chain
 * reference, or a known-fabricated value reappears in shipped copy.
 *
 * The rules come from three places that are themselves enforced elsewhere:
 *   • the ratified claim vocabulary in products/loggie-app/index.html
 *   • contracts/loggie-contracts/exports/addresses/mainnet.json, which is {}
 *   • the branding review that excluded a mock screenshot carrying a fake
 *     VERIFIED badge
 *
 * Run: node scripts/check-claims.mjs   (also wired into `pnpm build`)
 *
 * HOW IT READS A FILE: comments are stripped first (the rules are discussed at
 * length in them), then the remaining source is flattened into one whitespace-
 * normalised string so a sentence broken across four JSX lines is still judged
 * as one sentence. Rules then run against that text with a context window, so
 * "not independently audited" is not reported as claiming an audit.
 *
 * If a finding is genuinely a false positive, prefer adding a NEGATION pattern
 * over an exemption, and never weaken a rule to make a line pass.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SCAN = ['src', 'index.html'];
const CONTEXT = 140; // chars either side of a match used for negation checks

/**
 * Each rule: [pattern, why, negations]
 * A match is forgiven when any negation pattern appears in the context window —
 * that is how copy which states the ABSENCE of a thing stays legal.
 */
const BANNED = [
  // ── Security posture: no audit has been performed and none is booked ──
  [/\baudited\b/i, 'claims an audit; none has been performed or booked',
    [/\b(not|never|no|isn't|hasn't|without)\b[^.]{0,60}\baudited\b/i, /\bunaudited\b/i]],
  [/\bpenetration[- ]tested\b/i, 'claims a pentest', []],
  [/\bSOC ?2\b/i, 'claims a certification Loggie does not hold', [/\bnone\b|\bno\b|\bremoved\b|\bgone\b/i]],
  [/\b(HIPAA|FedRAMP|CJIS|GLBA)\b/i, 'compliance claim with no certification behind it',
    [/\bnone\b|\bno\b|\bremoved\b|\bgone\b|\bdelete\b/i]],
  [/\bFIPS[- ](certified|validated)\b/i, 'FIPS 203/204 are algorithm standards, not certifications Loggie holds', []],
  [/\bNIST[- ]certified\b/i, 'NIST does not certify Loggie', []],

  // ── Ratified vocabulary, enforced in the app's own shipped metadata ──
  [/\btamper[- ]proof\b/i, 'the ratified word is tamper-evident', [/\bnever\b|\bnot\b|\bbanned\b/i]],
  [/\bunhackable\b/i, 'ratified vocabulary violation', [/\bnever\b|\bnot\b|\bbanned\b/i]],
  [/\bquantum[- ]proof\b/i, 'ratified vocabulary violation', [/\bnever\b|\bnot\b|\bbanned\b/i]],
  [/\bmilitary[- ]grade\b/i, 'ratified vocabulary violation', [/\bnever\b|\bnot\b|\bbanned\b/i]],
  [/\bunbreakable\b/i, 'ratified vocabulary violation', [/\bnever\b|\bnot\b|\bbanned\b/i]],

  // ── Deployment reality ──
  [/\bon mainnet\b/i, 'nothing is deployed on Ethereum mainnet',
    [/\bnot\b|\bnothing\b|\bzero\b|\bno\b|\bwhen mainnet\b/i]],
  [/\blive on Base\b/i, 'not deployed on Base mainnet', []],

  // ── Cryptography accuracy: the shipped suite is ML-KEM-1024 ──
  [/\bML-KEM-768\b/, 'the shipped suite is ML-KEM-1024', []],
  [/\bKyber-768\b/i, 'the shipped suite is ML-KEM-1024', []],

  // ── Availability ──
  [/npm i(nstall)? @loggiecid\//i, 'no @loggiecid package is published to npm', []],
  [/\bLoggie Black\b/, 'retired codename; the public product name is Loggie', []],
  [/\bfully decentrali[sz]ed\b/i, 'Loggie Labs runs the gateway and the index', []],
  // "trustless-gateway.link" is a real public IPFS gateway hostname, not a claim.
  [/\btrustless\b(?!-gateway)/i, 'overclaim — two operated services remain', []],

  // ── Engagement features deliberately not shipped ──
  [/\bfollower counts?\b/i, 'not implemented and not designed', [/\bno\b|\bnot\b|\bnever\b/i]],

  // ── Fabricated values from the previous site. These must never return. ──
  [/18,?234,?567/, 'fabricated block number from the old PreviewSection', [/\bfabricated\b|\bfake\b|\bnever\b/i]],
  [/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/, 'fabricated CID from the old site', []],
  [/0x8f3a7b2c\.\.\.4d5e6f1a/, 'fabricated hash from the old site', []],
  [/loggie\.xyz/i, 'domain does not exist', []],
  [/docs\.loggie\.(io|xyz)/i, 'domain does not exist', []],
  [/github\.com\/loggie-xyz/i, 'organisation does not exist; it is LoggieLabs', []],
  [/localhost:3333|127\.0\.0\.1:4173/, 'internal-only service; never link it publicly', []],
];

/** Chain references must carry their qualifier in the same breath. */
const CHAIN = /\b(on[- ]chain|on Ethereum)\b/gi;
const CHAIN_QUALIFIER = /Sepolia|test network|testnet|mainnet/i;

function stripComments(src) {
  // Replace comment bodies with spaces so offsets stay meaningful.
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/\/\/[^\n]*/g, (m) => ' '.repeat(m.length))
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|html)$/.test(name)) out.push(p);
  }
  return out;
}

const files = [];
for (const target of SCAN) {
  const p = join(ROOT, target);
  try {
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  } catch {
    /* target absent; nothing to scan */
  }
}

let failures = 0;

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const stripped = stripComments(raw);

  // Flatten to one line so sentences wrapped across JSX lines read as sentences,
  // while keeping a map from flattened offset back to the original line number.
  const lineStarts = [];
  let flat = '';
  stripped.split('\n').forEach((line, idx) => {
    lineStarts.push({ at: flat.length, line: idx + 1 });
    flat += line.replace(/\s+/g, ' ') + ' ';
  });
  const lineAt = (offset) => {
    let lo = 0;
    for (const e of lineStarts) {
      if (e.at <= offset) lo = e.line;
      else break;
    }
    return lo;
  };

  const report = (offset, why, text) => {
    failures++;
    console.error(
      `${relative(ROOT, file)}:${lineAt(offset)}\n    …${text.trim().slice(0, 120)}…\n    ↳ ${why}\n`,
    );
  };

  for (const [re, why, negations] of BANNED) {
    const global = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    for (const m of flat.matchAll(global)) {
      const ctx = flat.slice(Math.max(0, m.index - CONTEXT), m.index + m[0].length + CONTEXT);
      if (negations.some((n) => n.test(ctx))) continue;
      report(m.index, why, ctx);
    }
  }

  for (const m of flat.matchAll(CHAIN)) {
    const ctx = flat.slice(Math.max(0, m.index - CONTEXT), m.index + m[0].length + CONTEXT);
    if (CHAIN_QUALIFIER.test(ctx)) continue;
    report(m.index, `"${m[0]}" with no Sepolia / test-network qualifier in the same breath`, ctx);
  }
}

/* ── Every published address must trace to the canonical manifest ──────────
   The contracts repo lives outside this one, so this check is skipped when it
   is not on disk (a Cloudflare Pages build, for instance) rather than failing.
   It is the mechanical half of "no fabricated values": run it locally before
   you ship a change that touches an address.
   ───────────────────────────────────────────────────────────────────────── */
const MANIFEST = join(
  ROOT,
  '../../../contracts/loggie-contracts/exports/addresses/sepolia.json',
);
try {
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const known = new Set(
    Object.values(manifest)
      .filter((v) => typeof v === 'string' && /^0x[0-9a-fA-F]{40}$/.test(v))
      .map((v) => v.toLowerCase()),
  );

  const data = readFileSync(join(ROOT, 'src/data/status.ts'), 'utf8');
  // Exclude the 64-hex transaction hashes, whose first 40 hex chars would
  // otherwise look like an address.
  const withoutTxs = data.replace(/0x[0-9a-fA-F]{64}/g, '');
  const cited = new Set(withoutTxs.match(/0x[0-9a-fA-F]{40}/g) || []);

  for (const addr of cited) {
    if (!known.has(addr.toLowerCase())) {
      failures++;
      console.error(`src/data/status.ts\n    ${addr}\n    ↳ not present in exports/addresses/sepolia.json — no invented addresses\n`);
    }
  }
  const mainnet = JSON.parse(
    readFileSync(join(ROOT, '../../../contracts/loggie-contracts/exports/addresses/mainnet.json'), 'utf8'),
  );
  if (Object.keys(mainnet).filter((k) => !k.startsWith('_')).length > 0) {
    console.warn(
      'check-claims: mainnet.json is no longer empty. Every "nothing is on mainnet" sentence on this site needs rewriting.',
    );
  }
  console.log(`check-claims: ${cited.size} addresses verified against the canonical Sepolia manifest.`);
} catch {
  console.log('check-claims: contracts manifest not on disk — address verification skipped.');
}

if (failures) {
  console.error(
    `check-claims: ${failures} problem${failures === 1 ? '' : 's'}. Nothing ships with an overclaim in it.`,
  );
  process.exit(1);
}
console.log(`check-claims: ${files.length} files clean.`);
