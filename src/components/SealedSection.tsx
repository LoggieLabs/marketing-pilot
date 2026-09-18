import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution, Block, TxHash, Cid } from './shared/Proof';
import { SEAL_AUDIT, MESSAGE_V3, PQ_POLICY, WIRE_RECHECK } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   §7 — EVEN THE FILENAME IS ENCRYPTED

   The most concrete, most independently verified privacy claim on the page,
   and one almost no consumer product can make.

   The single most persuasive artefact here is just text: the real five-key
   object beside the fields that are NOT in it. The absence is the product.
   No lock icons anywhere in this section — the JSON is the lock icon.

   Scope discipline, rewritten after the migration: this used to disclose
   that messaging stayed on the older envelope, and that disclosure is what
   prompted Message v3. Messaging is now on the same envelope. Two things
   keep the section honest about it. The file evidence and the message
   evidence are kept visibly apart — they are different objects, sealed on
   different dates, and merging them into one exhibit would let the older,
   more thoroughly audited artefact vouch for the newer one. And
   "post-quantum" is stated per operation rather than as one blanket
   sentence, because the operations genuinely differ: sealing a shared file
   fails closed without ML-KEM, reading a pre-migration message deliberately
   does not, and authorship is not post-quantum at all.
   ═══════════════════════════════════════════════════════════════════════ */

export function SealedSection() {
  return (
    <SectionWrapper id="nobody-reading">
      <SectionHeading eyebrow="PROOF THREE">Even the filename is encrypted.</SectionHeading>

      <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl space-y-5">
          <p className="text-lg text-gray-300 leading-relaxed">
            Most services that call themselves encrypted still put the filename, the file type and
            the recipient list in the open, where the storage provider can read them. In a Loggie
            sealed object none of that is there at all.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            We checked this the only way that counts: we fetched one of our own sealed files with
            no account and no credentials, and read every byte of it. The whole object has five
            fields. No wallet address. No identity hash. No persona name. No filename. No file type.
            No timestamp. No recipient list. And a file sealed to one person always carries a
            second, decoy slot, cryptographically shuffled in — so an observer cannot even tell it
            went to one person rather than two.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            The content key is wrapped under both an X25519 exchange and an ML-KEM-1024
            encapsulation — the algorithm NIST standardised as FIPS 203 — combined so an attacker
            has to break both, not either. But "post-quantum" is not one switch that is either on or
            off across the product, and a single sentence would round it in our favour. It differs
            by operation, so here is each one.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            This now covers Files, your Journal, your private contacts vault, messages and shared
            file payloads. Messages use an independently sealed envelope for every destination,
            including your own copy. The public envelope carries no wallet address, no identity, no
            recipient list, no conversation thread and no message id — each copy has its own
            ciphertext and its own CID, and authenticated identity inside the envelope is what keeps
            the conversation together once it is opened.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            Shared files are decrypted locally by their owner and re-sealed for the person receiving
            them. The original encrypted file is untouched, and sharing does not hand over access to
            it.
          </p>

          {/* Correction from review: one blanket post-quantum sentence hid a
              real difference between operations. Sealing a shared file fails
              closed without ML-KEM; the v2 reader is a permanent legacy
              surface by design; and authorship is classically signed because
              live identities carry a post-quantum key for encryption and no
              post-quantum signing key exists to sign with. Rows come from
              status.ts so the wording cannot drift from the ledger. */}
          <dl className="mt-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {PQ_POLICY.map((row) => (
              <div key={row.operation} className="py-4">
                <dt className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-base font-medium text-white">{row.operation}</span>
                  <span className="mono text-2xs text-loggie-cyan/90">{row.rule}</span>
                </dt>
                <dd className="mt-1.5 text-sm text-gray-400 leading-relaxed">{row.detail}</dd>
              </div>
            ))}
          </dl>

          {/* The boundary. The envelope is blind; the transaction is not. This
              replaced the older disclosure that messages rode the v2 envelope —
              which is the disclosure that prompted the migration. */}
          <Caution>
            <strong className="font-semibold text-amber-200">
              Metadata-blind is not the same as anonymous.
            </strong>{' '}
            This protects what is inside the sealed object. A blockchain transaction can still show
            which wallet posted to which inbox and when, and a storage provider can still see
            requests arriving and how large the ciphertext is. Message v3 removed the routing hints
            from the envelope. It did not make the delivery invisible.
          </Caution>
        </div>

        <div>
          {/* The real object. Every key below was read off the wire. */}
          <div className="code-material rounded-xl p-6">
            <p className="mono text-2xs text-loggie-cyan/90">a sealed FILE, fetched anonymously</p>
            <pre className="mono text-xs sm:text-sm text-gray-300 mt-4 overflow-x-auto leading-relaxed">
              <code>{`{
  "v":     "loggie.seal.v3",
  "suite": 1,
  "nonce": "…",
  "slots": [ …, … ],
  "ct":    "…"
}`}</code>
            </pre>
            <p className="mono text-2xs text-gray-400 mt-4 break-all">
              <Cid value={SEAL_AUDIT.cid} />
            </p>
            <p className="mono text-2xs text-gray-400 mt-1 leading-relaxed">
              file seal · {SEAL_AUDIT.date} · {SEAL_AUDIT.bytes.toLocaleString('en-US')} B ·{' '}
              {SEAL_AUDIT.slots} slots for {SEAL_AUDIT.realRecipients} real recipient · already v3
              at that date
            </p>
          </div>

          {/* The absence, listed. This is the actual product claim. */}
          <div className="mt-6">
            <p className="mono text-2xs text-gray-400">confirmed absent from those bytes</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {SEAL_AUDIT.absent.map((field) => (
                <li key={field} className="mono text-2xs text-gray-400 line-through">
                  {field}
                </li>
              ))}
            </ul>
          </div>

          {/* Two slots, visually identical, because that is the point. */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="mono text-2xs px-3 py-2 rounded-lg border border-white/[0.08] text-gray-400">
              slot — real
            </span>
            <span className="mono text-2xs px-3 py-2 rounded-lg border border-white/[0.08] text-gray-400">
              slot — decoy
            </span>
          </div>
          <p className="mono text-2xs text-gray-400 mt-3">
            an observer cannot tell which is which
          </p>

          {/* Messages. The 2026-09-16 cutover leads because it is the run a
              visitor can inspect end to end — full transaction, block, and both
              envelope CIDs. The 2026-09-18 deployment made v3 the default
              writer; its doc records no CIDs and a truncated transaction, so
              its block is linked and its transaction is not. */}
          <div className="code-material rounded-xl p-6 mt-8">
            <p className="mono text-2xs text-loggie-cyan/90">
              a sealed MESSAGE, both legs, on Sepolia
            </p>
            <dl className="mt-4 space-y-2.5 mono text-2xs text-gray-400">
              <div className="flex flex-wrap items-center gap-x-3">
                <dt className="text-gray-300">wire</dt>
                <dd>{MESSAGE_V3.version}</dd>
              </div>
              <div className="flex flex-wrap items-center gap-x-3">
                <dt className="text-gray-300">one transaction</dt>
                <dd className="flex flex-wrap items-center gap-x-3">
                  <TxHash value={MESSAGE_V3.cutover.tx} />
                  <Block value={MESSAGE_V3.cutover.block} />
                </dd>
              </div>
              <div className="flex flex-wrap items-center gap-x-3">
                <dt className="text-gray-300">recipient leg</dt>
                <dd>
                  <Cid value={MESSAGE_V3.cutover.recipientLeg} />
                </dd>
              </div>
              <div className="flex flex-wrap items-center gap-x-3">
                <dt className="text-gray-300">sender mirror</dt>
                <dd>
                  <Cid value={MESSAGE_V3.cutover.senderMirror} />
                </dd>
              </div>
            </dl>

            <p className="mono text-2xs text-gray-400 mt-4">not on the wire</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {MESSAGE_V3.absentOnWire.map((field) => (
                <li key={field} className="mono text-2xs text-gray-400 line-through">
                  {field}
                </li>
              ))}
            </ul>

            <p className="mono text-2xs text-gray-400 mt-4 leading-relaxed">
              two inboxes, one approval, two different ciphertexts at the same{' '}
              {WIRE_RECHECK.legBytes.toLocaleString('en-US')} B. v3 became the default writer on{' '}
              {MESSAGE_V3.production.date} at <Block value={MESSAGE_V3.production.block} />.
            </p>
          </div>
        </div>
      </div>

      {/* Added after this section's own links were tested. ipfs.io answered
          429 for all three CIDs, which is what exposed the real point: the
          link never was the proof. The identifier is a hash of the bytes, so
          the host is irrelevant — and saying so is both more honest and a
          stronger claim than any gateway link. Every number below was measured
          on 2026-09-18 by fetching the three objects and checking them; the
          figures live in WIRE_RECHECK in status.ts. */}
      <div className="mt-14 max-w-3xl border-t border-white/[0.06] pt-8">
        <p className="text-lg text-gray-300 leading-relaxed">
          <span className="text-white font-medium">
            You don't have to trust the gateway either.
          </span>{' '}
          A CID is the SHA-256 of the bytes it names. Fetch any of the objects above, hash it
          yourself, and you get that same string back — so whoever stores it cannot hand you
          something different without the identifier changing. We re-ran that check on{' '}
          {WIRE_RECHECK.date} against all {WIRE_RECHECK.objects} objects on this page: every hash
          matched, every object held exactly the five fields and two slots, and a sweep of every
          byte for wallet addresses, filenames, recipients and message ids returned{' '}
          {WIRE_RECHECK.leakedIdentifiers}.
        </p>
        <p className="mt-4 text-lg text-gray-300 leading-relaxed">
          The decoy survives the same scrutiny. Both slots in every object serialise to exactly{' '}
          {WIRE_RECHECK.slotBytesEach.toLocaleString('en-US')} bytes, so size gives nothing away —
          and the two legs of the one message are different ciphertexts of identical length, which
          is why they have different CIDs and why neither can be matched to the other by shape.
        </p>
      </div>

      {/* Photos and links: the two everyday leaks nobody thinks about. */}
      <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-5xl">
        <div className="card-material rounded-xl p-6">
          <h3 className="text-base font-semibold text-white">Photos</h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            JPEG, PNG and WebP images you post have their EXIF, GPS, XMP and camera data stripped in
            your browser before upload — and Loggie tells you it removed some.
          </p>
        </div>
        <div className="card-material rounded-xl p-6">
          <h3 className="text-base font-semibold text-white">Links</h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            Paste a link into a post and Loggie's own server fetches the preview behind a hardened
            guard, so the site you linked never learns who read your post. Measured with a
            full-session observer that recorded zero requests to the linked origins from the
            author's tab.
          </p>
        </div>
      </div>

      <Evidence>
        Messages on {MESSAGE_V3.version}, two separate runs, deliberately not combined. The
        inspectable one is the cutover of {MESSAGE_V3.cutover.date}: message{' '}
        {MESSAGE_V3.cutover.messageId}, one approval, one atomic transaction{' '}
        {MESSAGE_V3.cutover.tx} at block {MESSAGE_V3.cutover.block}, confirmed on Sepolia with
        status 1 and two MessageCIDPosted logs — recipient leg {MESSAGE_V3.cutover.recipientLeg}, sender
        mirror {MESSAGE_V3.cutover.senderMirror} ({MESSAGE_V3.cutover.source}). The later
        deployment of {MESSAGE_V3.production.date} ({MESSAGE_V3.production.source}) is what made v3
        the default writer: one controlled reply {MESSAGE_V3.production.messageRef}, both legs
        carrying fields ct, nonce, slots, suite, v at {MESSAGE_V3.production.bytesPerLeg} B each,
        distinct CIDs, one sender-scoped logical identity, one atomic transaction{' '}
        {MESSAGE_V3.production.txPrefix} at block {MESSAGE_V3.production.block}. That run recorded
        its transaction truncated and recorded no CIDs, which is why it is named rather than linked
        and why the two complete envelopes shown above come from the cutover instead.{' '}
        <br />
        <br />
        The sealed object shown above is a FILE, not one of those messages, and the two are kept
        apart on purpose. SEAL_V3_ADOPTION_MATRIX.md, hard privacy acceptance (Fixture A, live
        wire), {SEAL_AUDIT.date}: that file fetched raw and unauthenticated from{' '}
        {SEAL_AUDIT.gateway} at {SEAL_AUDIT.bytes.toLocaleString('en-US')} bytes,
        already on {MESSAGE_V3.version} at that date, top-level keys exactly [ct, nonce, slots,
        suite, v], two slots for one real recipient; a substring audit confirms every field listed
        as absent is absent. The minimum-two-slot decoy rule is in create-seal-v3.ts and ratified in
        SEAL_V3_WIRE_FORMAT_AND_THREAT_MODEL.md §3. SEAL_SUITE_1 is frozen in suites.ts as X25519
        AND-combined with ML-KEM-1024 — both secrets required.
        seal-require-hybrid-failclosed.test.ts proves nothing is sealed, uploaded or posted on an
        unsatisfiable requirement, and sealConversationFile refuses outright when the post-quantum
        key is missing. The v2 reader is retained as a permanent legacy surface so pre-migration
        messages stay readable byte-identical. Adoption matrix row 19 recorded messaging as
        intentionally not seal-v3; that row is superseded by the two runs above. Image stripping:
        image-metadata.ts and its test. Link resolver: FEED_COMPOSER_V2.md §3, with live proofs
        against localhost, 169.254.169.254 and [fd00::1].
      </Evidence>
    </SectionWrapper>
  );
}
