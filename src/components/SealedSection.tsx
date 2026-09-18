import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution, Block } from './shared/Proof';
import { SEAL_AUDIT, MESSAGE_V3 } from '../data/status';

/* ═══════════════════════════════════════════════════════════════════════
   §7 — EVEN THE FILENAME IS ENCRYPTED

   The most concrete, most independently verified privacy claim on the page,
   and one almost no consumer product can make.

   The single most persuasive artefact here is just text: the real five-key
   object beside the fields that are NOT in it. The absence is the product.
   No lock icons anywhere in this section — the JSON is the lock icon.

   Scope discipline: this claim belongs to Files, Journal and the contacts
   vault. Messaging deliberately stays on the older envelope. Saying so is
   not a caveat to bury; it is the reason the rest of the section is
   believable.
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
            We checked this the only way that counts: we fetched one of our own sealed files
            anonymously from a public gateway and read every byte of it. The whole object has five
            fields. No wallet address. No identity hash. No persona name. No filename. No file type.
            No timestamp. No recipient list. And a file sealed to one person always carries a
            second, decoy slot, cryptographically shuffled in — so an observer cannot even tell it
            went to one person rather than two.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            When everyone involved has a post-quantum key, the content key is wrapped under both an
            X25519 exchange and an ML-KEM-1024 encapsulation — the algorithm NIST standardised as
            FIPS 203 — combined so an attacker has to break both, not either. If someone has an
            older identity without a post-quantum key, we say so instead of quietly pretending. And
            if you explicitly require post-quantum, Loggie refuses to send at all rather than give
            you something weaker: nothing sealed, nothing uploaded, nothing posted.
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
            <p className="mono text-2xs text-loggie-cyan/90">the whole sealed object</p>
            <pre className="mono text-xs sm:text-sm text-gray-300 mt-4 overflow-x-auto leading-relaxed">
              <code>{`{
  "v":     "loggie.seal.v3",
  "suite": 1,
  "nonce": "…",
  "slots": [ …, … ],
  "ct":    "…"
}`}</code>
            </pre>
            <p className="mono text-2xs text-gray-400 mt-4 break-all">{SEAL_AUDIT.cid}</p>
            <p className="mono text-2xs text-gray-400 mt-1">
              fetched anonymously {SEAL_AUDIT.date} · {SEAL_AUDIT.slots} slots for{' '}
              {SEAL_AUDIT.realRecipients} real recipient
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

          {/* Messages, in production. The block links; the transaction does not
              — the evidence doc records it truncated and there is no full hash
              on record, so it is named rather than linked. */}
          <div className="code-material rounded-xl p-6 mt-8">
            <p className="mono text-2xs text-loggie-cyan/90">messages, in production</p>
            <dl className="mt-4 space-y-2.5 mono text-2xs text-gray-400">
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-gray-300">wire</dt>
                <dd>{MESSAGE_V3.version}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-gray-300">delivered</dt>
                <dd>
                  one atomic transaction, {MESSAGE_V3.production.legs} sealed legs,{' '}
                  <Block value={MESSAGE_V3.production.block} />
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-gray-300">each leg</dt>
                <dd>
                  {MESSAGE_V3.production.bytesPerLeg} B, identical shape, distinct CID
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
          </div>
        </div>
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
                Messages on {MESSAGE_V3.version}, two separate runs. Production smoke {MESSAGE_V3.production.date} ({MESSAGE_V3.production.source}): one controlled reply {MESSAGE_V3.production.messageRef}, both legs carrying fields ct, nonce, slots, suite, v at {MESSAGE_V3.production.bytesPerLeg} B each, distinct CIDs, one sender-scoped logical identity, delivered in a single atomic transaction {MESSAGE_V3.production.txPrefix} (recorded truncated, so it is named here and not linked) at block {MESSAGE_V3.production.block}. The two complete envelope CIDs come from the earlier live acceptance of {MESSAGE_V3.liveAcceptance.date} at block {MESSAGE_V3.liveAcceptance.block} — recipient {MESSAGE_V3.liveAcceptance.recipientEnvelope}, sender mirror {MESSAGE_V3.liveAcceptance.senderMirror} ({MESSAGE_V3.liveAcceptance.source}). They are different runs and are not combined.{' '}
        SEAL_V3_ADOPTION_MATRIX.md, hard privacy acceptance (Fixture A, live wire): the object above
        fetched raw, top-level keys exactly [ct, nonce, slots, suite, v], two slots for one real
        recipient; a substring audit confirms every field listed as absent is absent. The
        minimum-two-slot decoy rule is in create-seal-v3.ts and ratified in
        SEAL_V3_WIRE_FORMAT_AND_THREAT_MODEL.md §3. SEAL_SUITE_1 is frozen in suites.ts as X25519
        AND-combined with ML-KEM-1024 — both secrets required.
        seal-require-hybrid-failclosed.test.ts proves nothing is sealed, uploaded or posted on an
        unsatisfiable requirement. Adoption matrix row 19 recorded messaging as intentionally not
        seal-v3; that is superseded by the 2026-09-18 deployment above. Image stripping: image-metadata.ts and its test. Link resolver: FEED_COMPOSER_V2.md
        §3, with live proofs against localhost, 169.254.169.254 and [fd00::1].
      </Evidence>
    </SectionWrapper>
  );
}
