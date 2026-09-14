/* ═══════════════════════════════════════════════════════════════════════
   THE STATUS LEDGER — the single source for /status, the "what it can't do
   yet" section, and the defect table.

   This is a data file on purpose. The previous version of this website went
   seven months out of date because its claims lived in prose scattered across
   ten components. A stale honesty section is worse than no honesty section:
   it is exactly how a site starts lying without anybody deciding to.

   MAINTENANCE CONTRACT
     • `lastVerified` must be re-stamped every time this file is reviewed,
       whether or not anything changed.
     • Every row must trace to a file in the monorepo, named in `source`.
     • If you cannot find the evidence, delete the row. Do not soften it.

   Owner: security@loggielabs.com  (see open question — this needs a person,
   not a mailbox, before launch.)
   ═══════════════════════════════════════════════════════════════════════ */

export const LAST_VERIFIED = '2026-09-11';
export const CONTACT = 'security@loggielabs.com';

export interface Capability {
  name: string;
  detail: string;
  source: string;
}

/** Working today, in the app a visitor can open right now. */
export const SHIPPED: Capability[] = [
  {
    name: 'Identity from one signature',
    detail:
      'Connect a wallet, sign one message, and your signing, encryption and post-quantum keys are derived on your own machine. The same wallet and message reproduce the same keys anywhere.',
    source: 'sdk/loggie-sdk/packages/core/src/seeded-keys.ts; cm-01-mnemonic-recovery-e2e.test.ts',
  },
  {
    name: 'Your own inbox contract',
    detail:
      'One transaction deploys a minimal-proxy clone of the UserInboxV7 template. Your wallet is its sole owner from that moment.',
    source: 'InboxFactoryV7 0xBb9aF0dB4B678619CCF1C788300Fa2B6Bc4dF570 (Sepolia)',
  },
  {
    name: 'Files, encrypted before they leave',
    detail:
      'Sealed in the browser under SEAL_SUITE_1. Each file shows one of five plain words: Saved, Private, Backed up, Published, Needs attention.',
    source: 'src/web/components/file-panel/lib/human-status.ts + totality/monotonicity test',
  },
  {
    name: 'Proof of existence, checkable by anyone',
    detail:
      'A fingerprint, a timestamp and a pointer go on chain on Sepolia. The exported certificate carries the hash, transaction, block and a QR code. The verifier needs no wallet and no Loggie account.',
    source: 'proof-export.ts (schema loggie.proof-of-existence.v1); verifier/main.ts',
  },
  {
    name: 'Journal',
    detail:
      'A private diary anchored to your inbox the moment you save it, so it survives the laptop. Live-accepted on Sepolia 2026-09-11.',
    source: 'package-docs/research/2026-09-11_JOURNAL_V1.md',
  },
  {
    name: 'Feed and composer',
    detail:
      'Posts from you and the people you follow in the order things happened. Up to four images, link previews, drafts and mentions. EXIF, GPS and camera data stripped in the browser before upload.',
    source: 'package-docs/research/2026-09-11_FEED_COMPOSER_V2.md; image-metadata.ts',
  },
  {
    name: 'Contacts that rebuild themselves',
    detail:
      'Who you follow and who you have allowed reconstruct on a new machine from public evidence. Your nicknames and private notes stay in an encrypted vault only you can open.',
    source: 'contact-graph.ts + contacts-vault.ts',
  },
  {
    name: 'Recovery from an encrypted backup',
    detail:
      'Connect the same wallet on a different computer and approve one signature. Identity and keys restore from the encrypted backup your inbox points at.',
    source: '.agent/reviews/external-acceptance-run-01.md; setBackupPointer on UserInboxV7Impl.sol',
  },
  {
    name: 'Content that survives your machine',
    detail:
      'Encrypted content is copied to an independent public node. Four objects were served byte-exact from ipfs.io and dweb.link after the originating node went dark.',
    source: 'package-docs/research/RUX-F7_C3_INDEPENDENT_NODE.md',
  },
  {
    name: 'Several personas per wallet',
    detail:
      'One wallet can own a personal Loggie and a work Loggie, each with its own name, contacts and feed, each sealed to its own keypair.',
    source: 'Identity silo spec + live registry',
  },
];

/** Real, but narrower than it sounds. Say the boundary out loud. */
export const PARTIAL: Capability[] = [
  {
    name: 'Metadata-blind sealing covers Files, Journal and the contacts vault',
    detail:
      'Messaging deliberately stays on the older loggie.seal.v2 envelope, which carries routing hints in the clear. The five-field claim does not extend to Messages.',
    source: 'SEAL_V3_ADOPTION_MATRIX.md row 19 — "LEG — INTENTIONALLY NOT SEAL-V3"',
  },
  {
    name: 'Cross-device recovery is demonstrated, not proven',
    detail:
      'What has been shown is cross-origin recovery in the same browser plus one external-machine run. A clean second machine is named in our own docs as a stronger gate we have not yet cleared.',
    source: 'JOURNAL_V1.md §7; external-acceptance-run-01.md',
  },
  {
    name: 'Files do not anchor automatically',
    detail:
      'Journal entries anchor when you save. Files anchor only when you ask. Anything still showing "Saved" lives on one machine and is not in your backup.',
    source: 'SEAL_V3_ADOPTION_MATRIX known data-loss boundary',
  },
  {
    name: 'The IPFS build is behind the live app',
    detail:
      'app.loggie.eth resolves to an immutable build from 2026-09-02, which predates Journal, Feed Composer V2 and the source-of-truth remediation. It proves the escape hatch exists; it is not today’s app.',
    source: '.last-ipfs-cid.txt / .ipfs-builds.log',
  },
  {
    name: 'ConversationThreadFactory is deployed but unused',
    detail:
      'Correctly wired on Sepolia; no thread has ever been created on chain there. We publish the dead row too.',
    source: 'exports/addresses/sepolia.json 0xF60e6a83E4A4451c14e1a632bd1fba5B48B0d346',
  },
];

/** The required disclosure. No apology, no roadmap dates. */
export interface Limit {
  headline: string;
  detail: string;
  source: string;
}

export const LIMITS: Limit[] = [
  {
    headline: "It's on a test network.",
    detail:
      "Everything runs on Ethereum's Sepolia test network. The proofs are real and independently checkable, the ETH is not real money, and nothing of ours is deployed on Ethereum mainnet — that address file is literally an empty object.",
    source: 'read-provider.ts SEPOLIA_CHAIN_ID = 11155111; exports/addresses/mainnet.json = {}',
  },
  {
    headline: "It hasn't been audited.",
    detail:
      'No outside security firm has reviewed this code, and no audit is booked. That is a gate we have set for mainnet, not for this pilot.',
    source: 'AUDIT_CHECKLIST.md; PHASE_A_MAINNET_PILOT.md §5',
  },
  {
    headline: 'It needs a desktop browser and MetaMask.',
    detail:
      'Phone layouts, offline use, Coinbase Wallet, Rabby and WalletConnect are not there yet. It will load on a phone, but the panels have not been reflowed for small screens.',
    source: 'Open gaps LA-01, LA-02, LA-04',
  },
  {
    headline: 'Creating your inbox costs 0.01 ETH plus gas.',
    detail:
      'Test ETH, free from a public faucet — but you do need a funded wallet, and that is the real limit on "for everybody" today.',
    source: 'Live InboxFactoryV7 fee read 2026-09-05, routed 100% to RevenueRouter',
  },
  {
    headline: 'An unanchored file lives on one machine.',
    detail:
      'Journal entries anchor when you save. Files do not yet. Anything still marked Saved is not in your backup.',
    source: 'SEAL_V3_ADOPTION_MATRIX known data-loss boundary',
  },
  {
    headline: "Messages don't get the metadata-blind envelope.",
    detail:
      'Files, Journal and the contacts vault do. Messaging deliberately stays on an older envelope that carries routing hints in the clear.',
    source: 'SEAL_V3_ADOPTION_MATRIX row 19',
  },
  {
    headline: 'There are no likes and no reactions.',
    detail:
      'On purpose. A like that costs no blockchain transaction could not be made to survive, so we did not ship a fake one.',
    source: '2026-09-11_REACTION_TRANSPORT_OPEN_QUESTIONS.md — not implemented, not designed',
  },
  {
    headline: 'Nothing can be deleted.',
    detail:
      'An anchored record cannot be un-anchored, and the Journal has no erasure. We do not offer a right to be forgotten we cannot deliver.',
    source: "The product's own statement on anchor permanence",
  },
  {
    headline: 'We run two services ourselves.',
    detail:
      'The default storage gateway and the feed index. Both are replaceable and the index is never the source of truth — your browser re-derives the feed from the chain and falls back to a full scan when the index is missing — but they are real services we operate.',
    source: 'SOCIAL_INDEXER_V1_SPEC.md §0 — "Materialized discovery only, never canonical truth"',
  },
];

/* ── The defect registry ────────────────────────────────────────────────
   Generated upstream by scripts/gen-findings.mjs, which has a --check mode
   that fails when it goes stale. Reproduced here verbatim — severity,
   status and on-chain state unchanged. Do not edit the wording to be kinder.
   ─────────────────────────────────────────────────────────────────────── */

export interface Finding {
  id: number;
  severity: 'HIGH' | 'MEDIUM' | 'INFO';
  title: string;
  status: string;
  onChain: 'still present' | 'fixed';
  contracts: string;
}

export const FINDINGS_SUMMARY = {
  total: 11,
  high: 6,
  medium: 4,
  info: 1,
  stillOnChain: 9,
  generated: '2026-08-19',
  source: 'contracts/loggie-contracts/package-docs/findings/FINDINGS.md',
};

export const FINDINGS: Finding[] = [
  {
    id: 1,
    severity: 'HIGH',
    title: 'Curve round-trip loss (spread applied three times)',
    status: 'fixed in source',
    onChain: 'still present',
    contracts: 'BondingCurve',
  },
  {
    id: 2,
    severity: 'HIGH',
    title: 'aiCustomizationFee permanently 0 (no setter in V5)',
    status: 'fixed in source',
    onChain: 'still present',
    contracts: 'LoggieCIDV5_StagedGovernance',
  },
  {
    id: 3,
    severity: 'HIGH',
    title: 'Buyback swaps with minOut = 0; maxSlippageBps unused',
    status: 'fixed in source',
    onChain: 'still present',
    contracts: 'LoggieToken',
  },
  {
    id: 4,
    severity: 'HIGH',
    title: 'Price-floor counters never decrement and are inflatable',
    status: 'partially fixed',
    onChain: 'still present',
    contracts: 'LoggieToken, TokenTreasury',
  },
  {
    id: 5,
    severity: 'HIGH',
    title: 'ConversationThreadFactory not authorized — thread creation reverts',
    status: 'fixed in source',
    onChain: 'fixed',
    contracts: 'ConversationThreadFactory',
  },
  {
    id: 6,
    severity: 'HIGH',
    title: 'AIInboxFactory registers inboxes into a prior registry generation',
    status: 'fixed in source',
    onChain: 'fixed',
    contracts: 'AIInboxFactory',
  },
  {
    id: 7,
    severity: 'MEDIUM',
    title: 'InboxFactory V2–V4 soft-fail revenue routing',
    status: 'scoped out of v1',
    onChain: 'still present',
    contracts: 'InboxFactoryLegacy',
  },
  {
    id: 8,
    severity: 'MEDIUM',
    title: 'anchorBatch charges for duplicate roots; fee = 0 strands overpay',
    status: 'fixed in source',
    onChain: 'still present',
    contracts: 'NotarizationAnchor',
  },
  {
    id: 9,
    severity: 'MEDIUM',
    title: 'Custom splits keyed per caller, not per (caller, sourceType)',
    status: 'fixed in source',
    onChain: 'still present',
    contracts: 'RevenueRouter',
  },
  {
    id: 10,
    severity: 'MEDIUM',
    title: 'Router events unreliable for accounting',
    status: 'fixed in source',
    onChain: 'still present',
    contracts: 'RevenueRouter',
  },
  {
    id: 11,
    severity: 'INFO',
    title: 'Search stakes seizable via owner emergencyWithdraw',
    status: 'open',
    onChain: 'still present',
    contracts: 'LoggieSearch, ContentReputation',
  },
];

/* ── The contract map ───────────────────────────────────────────────────
   Every noun a visitor meets in the app, mapped to an address they can
   paste into a block explorer. All values copied from
   contracts/loggie-contracts/exports/addresses/sepolia.json.
   ─────────────────────────────────────────────────────────────────────── */

export interface ContractRow {
  /** What a visitor calls it. */
  familiar: string;
  /** What it actually is. */
  actual: string;
  address: string;
  /** Why it matters to a person, in one line. */
  note: string;
}

export const CONTRACT_MAP: ContractRow[] = [
  {
    familiar: 'Your inbox',
    actual: 'InboxFactoryV7',
    address: '0xBb9aF0dB4B678619CCF1C788300Fa2B6Bc4dF570',
    note: 'Deploys your inbox as a minimal-proxy clone. Your wallet is its sole owner.',
  },
  {
    familiar: 'The inbox template',
    actual: 'UserInboxV7Impl',
    address: '0x2B9Da0F844E5307789c454d8ED9Fa02Fe526c00a',
    note: 'The shared implementation every inbox clones — which is why owning a real contract is cheap.',
  },
  {
    familiar: 'Your identity',
    actual: 'LoggieCIDV5_StagedGovernance',
    address: '0xe231128c4cA394AF23709e9E49F6C7A2c415Ec85',
    note: 'The registry. The only contract address the app stores; every other one is read out of it at runtime.',
  },
  {
    familiar: '— its logic',
    actual: 'LoggieCIDV5Upgradeable',
    address: '0xDD34114A6B41aBDcc2FBb91F5D9098BaD4128DDE',
    note: 'The implementation the registry proxy delegates to.',
  },
  {
    familiar: 'Your proof',
    actual: 'NotarizationAnchor',
    address: '0x4c9B44dabCad44fB92b3DaB975EA3547D294faD3',
    note: 'Where a Merkle root of your fingerprints lands when you publish a proof.',
  },
  {
    familiar: 'Your identity token',
    actual: 'IdentityNFTv2',
    address: '0xe9EF982C8a042A550740Bd4f896Ae5AA7bf7256a',
    note: 'Optional. An ERC-721 named "Loggie Identity", symbol LOGID. The deployed token is transferable.',
  },
  {
    familiar: 'Where the fee goes',
    actual: 'RevenueRouter',
    address: '0x998081262fC49e7bE9232eF97E91011d2A8C89fa',
    note: 'Splits protocol fees in the same transaction that collects them, rather than invoicing later.',
  },
  {
    familiar: 'The honest row',
    actual: 'ConversationThreadFactory',
    address: '0xF60e6a83E4A4451c14e1a632bd1fba5B48B0d346',
    note: 'Deployed and correctly wired on Sepolia. No thread has ever been created on chain. We publish the dead row too.',
  },
];

/* ── Real anchors ───────────────────────────────────────────────────────
   Live Sepolia transactions. Every value below is real and resolvable on
   sepolia.etherscan.io. Never replace these with illustrative values.
   ─────────────────────────────────────────────────────────────────────── */

export const ANCHORS = {
  journal: {
    block: 11683681,
    tx: '0x20de7a49ec3865b589fe68eab1e564e37ec7a6103eef2fdf347b1e5cbe18977f',
    what: 'A private journal entry, anchored on save.',
  },
  recovered: {
    block: 11593941,
    tx: '0xe7557a869cd7a9af0f3d38a4746a0636b656cfbdcd927cf5216739fb6cf95743',
    cid: 'bafkreibdalyqyr7ykeds2c4rysfp7bpebfvxniuepzbtizydjnmgfucgyy',
    what: 'A file anchored, then recovered after a full browser wipe.',
  },
} as const;

/* ── The sealed-object audit ────────────────────────────────────────────
   Values from SEAL_V3_ADOPTION_MATRIX.md, "Hard privacy acceptance
   (Fixture A, live wire)": a sealed file fetched anonymously from a public
   gateway on 2026-08-29 and read byte by byte.
   ─────────────────────────────────────────────────────────────────────── */

export const SEAL_AUDIT = {
  /** The real object that was fetched. Resolvable on any public IPFS gateway. */
  cid: 'bafkreid7ikoojzvt7bwubz7h2l6kytpf4amr7is5iq6iupwux3m5i6zdwq',
  date: '2026-08-29',
  /** Every top-level key the object has. There are five. */
  present: ['ct', 'nonce', 'slots', 'suite', 'v'] as const,
  /** Confirmed absent by substring audit of the raw bytes. */
  absent: [
    'wallet',
    'identityHash',
    'persona',
    'filename',
    'mime',
    'createdAt',
    'hint',
    'meta',
    'scheme',
    'aead',
    'recipients',
  ] as const,
  /** Slots carried for a single real recipient — the second is a decoy. */
  slots: 2,
  realRecipients: 1,
} as const;

/* ── The Covenant ────────────────────────────────────────────────────────
   contracts/loggie-covenant — the constitutional layer, architecture
   generation "Loggie0".

   READ THIS BEFORE WRITING ANY COPY ABOUT IT. Its own README states
   "Status: SPECIFICATION — no contracts, by design", and COVENANT.md states
   "ratified in principle · not yet enforced by code". The contracts/
   directory is empty on purpose. Nothing on this site may describe the
   Covenant as deployed, enforced, live, or protecting anyone today.

   What IS true today is narrower and measurable, and it is the part worth
   leading with: opening a Loggie envelope is pure local cryptography over
   bytes. openEnvelopeV3(envelope, secrets) takes two local arguments — no
   provider, no contract, no gateway, no fetch — so the data layer already
   satisfies the Covenant. The contract layer does not.
   ─────────────────────────────────────────────────────────────────────── */

export const COVENANT = {
  status: 'Specification. Ratified in principle, not yet enforced by code.',
  /** The defensible formulation, quoted from the spec. Do not broaden it. */
  formulation:
    'Protocol compatibility cannot be revoked. Access to Loggie Labs infrastructure can be. Moderation is allowed; erasure is not.',
  source: 'contracts/loggie-covenant/package-docs/specs/COVENANT.md',
  /** Measured, and the reason the claim above is not just an aspiration. */
  measured:
    'openEnvelopeV3(envelope, secrets) — two local arguments, no provider, no contract, no gateway, no fetch',
  measuredSource: 'sdk/loggie-sdk/packages/core/src/crypto/envelope/open-v3.ts',
} as const;

/** The escape hatches that exist today, independent of Loggie Labs. */
export const ESCAPE_HATCHES = [
  {
    what: 'The app itself is published as an immutable build',
    detail:
      'A content-addressed copy of the interface that nobody can alter after the fact, reachable through any public gateway.',
    value: 'bafybeigwsgipomgtflk6hiqpge2dushrpkr7sg47eohkkghfqrz3mj4dyq',
    source: 'products/loggie-app/.ipfs-builds.log (build of 2026-09-02)',
  },
  {
    what: 'It resolves without our DNS',
    detail:
      'app.loggie.eth carries that build as its contenthash, verified serving through a public ENS gateway.',
    value: 'app.loggie.eth',
    source: '.agent/reviews/external-acceptance-run-01.md',
  },
  {
    what: 'Your content is served by nodes we do not run',
    detail:
      'Four objects were fetched byte-exact from ipfs.io and dweb.link by an independent node after the originating machine went dark.',
    value: 'Kubo 0.42.0, independent operator',
    source: 'package-docs/research/RUX-F7_C3_INDEPENDENT_NODE.md',
  },
  {
    what: 'Opening your own record needs nothing of ours',
    detail:
      'Decryption is local cryptography over bytes. No company, no server, no chain, no network — the bytes and your keys are the whole requirement.',
    value: 'openEnvelopeV3(envelope, secrets)',
    source: 'sdk/loggie-sdk/packages/core/src/crypto/envelope/open-v3.ts',
  },
] as const;
