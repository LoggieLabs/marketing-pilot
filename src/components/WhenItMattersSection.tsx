import { Home, Briefcase, Scale, FlaskConical, PenTool, FolderArchive } from 'lucide-react';
import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   WHEN DOES THIS MATTER?

   These are SITUATIONS rather than audiences. The section used to run second
   on the page and define the product; it now runs after the continuity
   material, as practical examples inside something larger. Leading with
   insurance claims and document disputes made Loggie read as software for
   professionals and businesses, which is the secondary market, not the
   primary one.

   ACCURACY DISCIPLINE. These are evidence use cases, which makes them the
   easiest place on the whole site to overclaim. Two rules:

   1. Never suggest a Loggie proof is legally admissible, legally binding, or
      that it settles anything. It does not. What it removes is the argument
      about what existed when — that is a real and narrower thing.
   2. Describe only what ships: anchoring a file, publishing a sealed folder
      with a manifest, and exporting the certificate. There is no one-click
      "share my case file" package, so nothing here implies one.

   The caution at the end is lifted almost verbatim from the advisory note
   the product already bakes into every exported certificate.
   ═══════════════════════════════════════════════════════════════════════ */

const SITUATIONS = [
  {
    icon: Home,
    title: 'An insurance claim',
    text: 'Photograph the damage, keep the estimates, receipts and correspondence, and build a dated record while the claim is happening — rather than reconstructing one six months later when it turns into a dispute.',
  },
  {
    icon: Briefcase,
    title: 'Work you delivered',
    text: 'Preserve exactly what you sent and when you sent it. The certificate goes to the client; the file itself stays yours.',
  },
  {
    icon: Scale,
    title: 'A disagreement about a document',
    text: 'Keep the original privately and publish only its fingerprint. You can show that this exact version existed on that date without handing over the document to do it.',
  },
  {
    icon: FlaskConical,
    title: 'Research or an investigation',
    text: 'Establish that you held the material before you published it, without disclosing what it is.',
  },
  {
    icon: PenTool,
    title: 'Creative work',
    text: 'Put a dated record on drafts, designs, writing or source files before they start going around.',
  },
  {
    icon: FolderArchive,
    title: 'Ordinary personal records',
    text: 'Leases and move-in photos, receipts, warranties, tax and medical paperwork, a private journal — kept somewhere designed to survive the computer they were made on.',
  },
] as const;

export function WhenItMattersSection() {
  return (
    <SectionWrapper id="when-it-matters">
      <SectionHeading
        eyebrow="ALSO, PRACTICALLY"
        lede={
          <>
            The same record that outlives you is useful long before that. These are the situations
            where people reach for it first.
          </>
        }
      >
        And when something needs proving.
      </SectionHeading>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SITUATIONS.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.title} className="card-material rounded-xl p-6">
              <Icon className="w-5 h-5 text-loggie-purple" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{s.text}</p>
            </li>
          );
        })}
      </ul>

      {/* The honest boundary. Without this the section drifts into implying a
          legal outcome, which is exactly what the product's own certificate
          refuses to imply. */}
      <Caution className="mt-10 max-w-2xl">
        <strong className="font-semibold text-amber-200">What a proof is, and isn't.</strong> A
        Loggie proof shows that content with a given fingerprint was anchored by a given signer at a
        given block, and that anyone can recompute it from the chain and the storage network. It is
        not a legal opinion, it does not authenticate what the content means, and it settles nothing
        on its own. What it removes is the argument about what existed when.
      </Caution>

      <Evidence>
        Anchoring a file and exporting its certificate: proof-export.ts, which emits both a
        machine-verifiable JSON sidecar and a printable HTML certificate, each carrying the advisory
        note that verification is always recomputable from the chain and IPFS and never from the
        document alone. Publishing a folder with a manifest: publish-sealed-folder.ts and
        sealed-manifest-v2. Contemporaneous notes anchor on save (JOURNAL_V1.md).
      </Evidence>
    </SectionWrapper>
  );
}
