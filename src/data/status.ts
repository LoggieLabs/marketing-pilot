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

export const LAST_VERIFIED = '2026-09-18';
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
    name: 'Metadata-blind sealing now covers messages and shared files too',
    detail:
      'As of 2026-09-18 messages ship on loggie.seal.v3: one independently sealed envelope per destination including the sender\u2019s own copy, five public fields, distinct CIDs. What it does not hide is the Sepolia transaction that carries it — see "Messaging is not anonymous" below.',
    source: 'deployment-classA-classB-2026-09-18.md; message-v3-live-acceptance.md',
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

/**
 * The required disclosure. No apology, no roadmap dates.
 *
 * `kind` exists because a flat list put "no likes" and "the contracts are
 * unaudited" side by side as though they were the same sort of fact. They are
 * not, and presenting them that way reads as a wall of defects rather than an
 * honest account of what is unfinished versus what Loggie deliberately is.
 *
 *   unfinished  — will change. A gap, not a decision.
 *   deliberate  — chosen. Will not change without someone changing their mind.
 *   structural  — a property of the design. Cannot change without Loggie
 *                 becoming a different thing.
 */
export type LimitKind = 'unfinished' | 'deliberate' | 'structural';

export interface Limit {
  kind: LimitKind;
  headline: string;
  detail: string;
  source: string;
}

export const LIMIT_GROUPS: { kind: LimitKind; title: string; blurb: string }[] = [
  {
    kind: 'unfinished',
    title: 'Still unfinished',
    blurb: 'Gaps we intend to close. These are the ones most likely to be different next year.',
  },
  {
    kind: 'deliberate',
    title: 'Deliberate',
    blurb: 'Decisions, not omissions. They would change only if we changed our minds.',
  },
  {
    kind: 'structural',
    title: 'Structural',
    blurb: 'Properties of how Loggie works. These do not go away without it becoming something else.',
  },
];

export const LIMITS: Limit[] = [
  {
    kind: 'unfinished',
    headline: "It's on a test network.",
    detail:
      "Everything runs on Ethereum's Sepolia test network. The proofs are real and independently checkable, the ETH is not real money, and nothing of ours is deployed on Ethereum mainnet — that address file is literally an empty object.",
    source: 'read-provider.ts SEPOLIA_CHAIN_ID = 11155111; exports/addresses/mainnet.json = {}',
  },
  {
    kind: 'unfinished',
    headline: "It hasn't been audited.",
    detail:
      'No outside security firm has reviewed this code, and no audit is booked. That is a gate we have set for mainnet, not for this pilot.',
    source: 'AUDIT_CHECKLIST.md; PHASE_A_MAINNET_PILOT.md §5',
  },
  {
    kind: 'unfinished',
    headline: 'It needs a desktop browser and MetaMask.',
    detail:
      'Phone layouts, offline use, Coinbase Wallet, Rabby and WalletConnect are not there yet. It will load on a phone, but the panels have not been reflowed for small screens.',
    source: 'Open gaps LA-01, LA-02, LA-04',
  },
  {
    kind: 'unfinished',
    headline: 'Creating your inbox costs 0.01 ETH plus gas.',
    detail:
      'Test ETH, free from a public faucet — but you do need a funded wallet, and that is the real limit on "for everybody" today.',
    source: 'Live InboxFactoryV7 fee read 2026-09-05, routed 100% to RevenueRouter',
  },
  {
    kind: 'unfinished',
    headline: 'An unanchored file lives on one machine.',
    detail:
      'Journal entries anchor when you save. Files do not yet. Anything still marked Saved is not in your backup.',
    source: 'SEAL_V3_ADOPTION_MATRIX known data-loss boundary',
  },
  {
    // Replaces "Messages don't get the metadata-blind envelope", which shipped
    // on 2026-09-18 and is no longer true. The limitation that remains is real
    // and narrower: the envelope is blind, the transaction is not.
    kind: 'structural',
    headline: 'Messaging is not anonymous.',
    detail:
      'Message contents and envelope metadata are encrypted before upload. The blockchain still records transactions that can reveal which wallet posted to which inbox, and when. Message v3 removes public routing hints from the sealed object; it does not conceal transaction activity.',
    source: 'deployment-classA-classB-2026-09-18.md — sender wallet not on the wire; delivery is one Sepolia transaction',
  },
  {
    kind: 'deliberate',
    headline: 'There are no likes and no reactions.',
    detail:
      'On purpose. A like that costs no blockchain transaction could not be made to survive, so we did not ship a fake one.',
    source: '2026-09-11_REACTION_TRANSPORT_OPEN_QUESTIONS.md — not implemented, not designed',
  },
  {
    kind: 'structural',
    headline: 'Nothing can be deleted.',
    detail:
      'An anchored record cannot be un-anchored, and the Journal has no erasure. We do not offer a right to be forgotten we cannot deliver.',
    source: "The product's own statement on anchor permanence",
  },
  {
    kind: 'structural',
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
  /**
   * The real object that was fetched. The old comment here claimed it was
   * "resolvable on any public IPFS gateway" — that was never checked. On
   * 2026-09-18 ipfs.io answered 429 for it, so the claim is narrowed to the
   * gateway that was actually confirmed to serve it unauthenticated.
   */
  cid: 'bafkreid7ikoojzvt7bwubz7h2l6kytpf4amr7is5iq6iupwux3m5i6zdwq',
  gateway: 'https://storage.loggielabs.com/cid/',
  date: '2026-08-29',
  /** Size on the wire, re-measured 2026-09-18. */
  bytes: 5209,
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

/**
 * Independent re-verification, run 2026-09-18 against the live gateway rather
 * than against any internal document — the file object and both message legs
 * were fetched unauthenticated and checked byte by byte.
 *
 * The load-bearing result is the first one. These are CIDv1 raw blocks
 * (codec 0x55, sha2-256), so the CID *is* the hash of the bytes: fetch them,
 * hash them yourself, and you get the same string back. That removes the
 * gateway from the trust chain entirely, which is a stronger claim than any
 * link we could offer, and it is the one the section should lead with.
 */
export const WIRE_RECHECK = {
  date: '2026-09-18',
  /** sha256(bytes) === the multihash digest inside the CID, all three objects. */
  hashesMatch: true,
  objects: 3,
  /** Every object: exactly these five keys, suite 1, two slots, [pq, wrap, x]. */
  shapeHeld: true,
  /** Both slots serialise to the same length, so size cannot distinguish them. */
  slotBytesEach: 2299,
  /** The two legs of one message are different ciphertexts at the same size. */
  legCiphertextsDiffer: true,
  legBytes: 5929,
  /**
   * Substring sweep for leaked identifiers across all three objects. The only
   * hits were the literal version string and two chance occurrences of "0x"
   * inside base64 ciphertext — no 40-hex address, no filename, no address-like
   * token, no recipients / hint / meta / scheme / messageId anywhere.
   */
  leakedIdentifiers: 0,
  source: 'fetched from storage.loggielabs.com/cid/ and verified locally 2026-09-18',
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
    /*
     * Was "reachable through any public gateway". Checked 2026-09-18: that is
     * not a claim we can make about infrastructure we do not run, and on the
     * day it was checked ipfs.io and dweb.link both answered 429 from a normal
     * connection. So it now names the independent gateway that did answer.
     *
     * What was confirmed, rather than assumed: trustless-gateway.link returned
     * the root block, its SHA-256 matches the digest inside the CID, and the
     * decoded dag-pb node lists index.html, assets, manifest.json, verify and
     * the brand icons — the real build, from a host with no relationship to us.
     */
    detail:
      'A content-addressed copy of the interface that nobody can alter after the fact. Served by trustless-gateway.link, an IPFS gateway we have nothing to do with, and the copy it returns hashes back to the same identifier.',
    value: 'bafybeigwsgipomgtflk6hiqpge2dushrpkr7sg47eohkkghfqrz3mj4dyq',
    source:
      'products/loggie-app/.ipfs-builds.log (build of 2026-09-02); root block re-fetched and hash-verified from trustless-gateway.link 2026-09-18',
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

/* ── Message v3 ──────────────────────────────────────────────────────────
   The section this feeds, PROOF THREE, used to disclose that messaging rode
   the older loggie.seal.v2 envelope with routing hints in the clear. That
   disclosure is what prompted the migration; it shipped in production on
   2026-09-16 and became the default writer on 2026-09-18.

   TWO RUNS, AND ONLY ONE OF THEM IS FULLY LINKABLE. The 2026-09-16 cutover
   recorded everything — the full transaction, the block, and both envelope
   CIDs — so that is the run a visitor can inspect end to end, and it leads.
   The 2026-09-18 deployment is the milestone that made v3 the default; its
   evidence doc records the wire shape and the block but NO CIDs and only a
   truncated transaction hash, so its block is linked and its transaction is
   not. A search of every evidence doc turns up exactly one full transaction
   hash, and it is the 2026-09-16 one.
   ─────────────────────────────────────────────────────────────────────── */

export const MESSAGE_V3 = {
  version: 'loggie.seal.v3',

  /** The inspectable run: one approval, one atomic batch, two inboxes. */
  cutover: {
    date: '2026-09-16',
    messageId: '330d54e6-bd7a-4fc4-9214-5909eebe92c0',
    tx: '0xc4ed2a89b525c0f59852a3da019d2f02b9ecfdfbbe6050711aad13979557c7b3',
    block: 11718540,
    recipientLeg: 'bafkreiaeigrdc4hhcao2qf6hxsvblgc3e5nmayp4c347chyw5np7yhni3m',
    senderMirror: 'bafkreibkk5eounlqvzc7nldo2bmu7d5vm7lfos7mw46ubqf5kvrfxt34uy',
    source: '.agent/reviews/message-v3-cutover-2026-09-16.md; confirmed on Sepolia in message-v3-repair-2026-09-17.md (status 1, two MessageCIDPosted logs)',
  },

  /** The deployment that made v3 the default writer. No CIDs recorded. */
  production: {
    date: '2026-09-18',
    messageRef: 'f6aae1b4\u2026',
    block: 11731632,
    txPrefix: '0x07e8a9c812619f\u2026',
    legs: 2,
    bytesPerLeg: 5929,
    source: '.agent/reviews/deployment-classA-classB-2026-09-18.md',
  },

  /** Confirmed absent from both legs on the wire. */
  absentOnWire: ['recipients', 'hint', 'meta', 'scheme', 'sender wallet', 'messageId'] as const,
} as const;

/* ── What requires post-quantum keys, and what does not ──────────────────
   The page used to imply one uniform policy. There are three, and they
   differ in ways a reader should be told apart.
   ─────────────────────────────────────────────────────────────────────── */

export const PQ_POLICY = [
  {
    operation: 'Sealing a shared conversation file',
    rule: 'Requires ML-KEM. Fails closed.',
    detail:
      'sealConversationFile emits canonical seal.v3 and refuses outright if the post-quantum key is missing. There is no weaker path to fall back to.',
  },
  {
    operation: 'Sending a new message',
    rule: 'Written as v3.',
    detail:
      'The v3 writer is the default. Confidentiality is hybrid — X25519 combined with ML-KEM-1024 — so both have to be broken, not either.',
  },
  {
    operation: 'Reading older messages',
    rule: 'Permanent legacy surface.',
    detail:
      'The v2 reader is not going away. Messages written before the migration stay readable byte-identical rather than being rewritten underneath you.',
  },
  {
    operation: 'Authorship',
    rule: 'Classically signed, deliberately.',
    detail:
      'Live identities carry a post-quantum key for encryption, not for signing — there is no post-quantum signing key to sign with. Confidentiality is post-quantum; authorship is a wallet signature. We would rather say that than let "post-quantum" imply both.',
  },
] as const;
