import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution } from './shared/Proof';
import { SEAL_AUDIT } from '../data/status';

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
            Most services that call themselves encrypted still know the filename, the file type, who
            it's for, and how big your address book is. Ours doesn't.
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

          <Caution>
            This is true of Files, your Journal and your private contacts vault. Messages are
            end-to-end encrypted, but they still ride an older envelope that carries routing hints
            in the open. We would rather tell you that here than let you assume otherwise.
          </Caution>
        </div>

        <div>
          {/* The real object. Every key below was read off the wire. */}
          <div className="code-material rounded-xl p-6">
            <p className="mono text-2xs text-loggie-cyan/90">the whole sealed object</p>
            <pre className="mono text-xs sm:text-sm text-gray-300 mt-4 overflow-x-auto leading-relaxed">
              <code>{`{
  "v":     1,
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
        SEAL_V3_ADOPTION_MATRIX.md, hard privacy acceptance (Fixture A, live wire): the object above
        fetched raw, top-level keys exactly [ct, nonce, slots, suite, v], two slots for one real
        recipient; a substring audit confirms every field listed as absent is absent. The
        minimum-two-slot decoy rule is in create-seal-v3.ts and ratified in
        SEAL_V3_WIRE_FORMAT_AND_THREAT_MODEL.md §3. SEAL_SUITE_1 is frozen in suites.ts as X25519
        AND-combined with ML-KEM-1024 — both secrets required.
        seal-require-hybrid-failclosed.test.ts proves nothing is sealed, uploaded or posted on an
        unsatisfiable requirement. Adoption matrix row 19 records messaging as intentionally not
        seal-v3. Image stripping: image-metadata.ts and its test. Link resolver: FEED_COMPOSER_V2.md
        §3, with live proofs against localhost, 169.254.169.254 and [fd00::1].
      </Evidence>
    </SectionWrapper>
  );
}
