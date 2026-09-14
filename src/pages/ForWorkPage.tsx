import { Link } from 'react-router-dom';
import {
  HardHat,
  Briefcase,
  Scale,
  Microscope,
  Camera,
  ClipboardCheck,
  Store,
  ArrowRight,
} from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Caution, StatusStrip } from '../components/shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   /for-work — professional uses of a personal record.

   THE TRAP THIS PAGE HAS TO AVOID. Written as "lawyers, adjusters,
   contractors", it quietly becomes the evidence product again — the exact
   framing the homepage was repositioned away from, reintroduced through a
   side door. It is broader on purpose, and every profession below is
   receiving or creating the SAME personal record the homepage describes.
   Nobody here is buying a different product.

   The brand architecture this protects:
     Loggie is for people. Businesses are one of the places people take
     their Loggie.

   So this page never says "enterprise", never implies team accounts, seats
   or admin consoles — none of which exist — and never promises an outcome
   in a dispute. It carries the same constraints strip as the homepage,
   because a professional evaluating this deserves them earlier, not later.

   This also holds the ROI material that used to sit on the homepage, where
   it pulled the whole page back toward a B2B pitch. Mechanisms only, no
   figures: nothing has been measured, and the page says so.
   ═══════════════════════════════════════════════════════════════════════ */

const PROFESSIONS = [
  {
    icon: HardHat,
    who: 'Contractors and trades',
    text: 'Photograph the work as you go, keep the signed scope and the completion set, and date it while you are still standing there. Months later, "that damage was already here" stops being a conversation about whose memory is better.',
  },
  {
    icon: Briefcase,
    who: 'Consultants and agencies',
    text: 'Preserve exactly what you delivered and when. The certificate goes to the client; the file itself never leaves your hands.',
  },
  {
    icon: Scale,
    who: 'Attorneys and claims professionals',
    text: 'Receive a client timeline that was built while events happened, instead of reconstructing one from three phones and a shoebox six months afterwards.',
  },
  {
    icon: Microscope,
    who: 'Researchers and journalists',
    text: 'Establish that you held source material before you published, without disclosing what it is.',
  },
  {
    icon: Camera,
    who: 'Photographers, designers and writers',
    text: 'Put a dated record on the work before it starts circulating — drafts, masters, source files.',
  },
  {
    icon: ClipboardCheck,
    who: 'Inspectors and surveyors',
    text: 'Document conditions on the day, in a form that still means something when someone questions it later.',
  },
  {
    icon: Store,
    who: 'Small businesses',
    text: 'Keep the records that normally walk out of the door with whoever set them up — attached to an identity rather than to an employee’s account.',
  },
] as const;

/* Mechanisms, never figures. No study has been run and the page says so. */
const MECHANISMS = [
  {
    label: 'Reconstruction',
    text: 'Less time assembling a history after the fact, because it was recorded while it happened rather than gathered afterwards.',
  },
  {
    label: 'Disagreement',
    text: 'Fewer rounds of argument about which version of a document existed on which date, because that particular question has an answer either side can check.',
  },
  {
    label: 'Loss',
    text: "Anchored material isn't sitting only on one laptop or inside one account that can be closed, locked or left behind.",
  },
  {
    label: 'Verification',
    text: 'Whoever receives a certificate checks it themselves, in their own browser. They do not have to contact you, and they do not have to contact us.',
  },
  {
    label: 'Handover',
    text: 'Records attached to an identity rather than to a person’s login survive that person changing roles, or leaving.',
  },
] as const;

export function ForWorkPage() {
  return (
    <PageLayout
      wide
      documentTitle="For work"
      title="Bring a record instead of reconstructing one."
      subtitle="Loggie is built for people keeping a record of their own lives. This is what happens when that record reaches your desk — or when the work you do is the thing worth recording."
    >
      <ul className="grid gap-6 sm:grid-cols-2">
        {PROFESSIONS.map((p) => {
          const Icon = p.icon;
          return (
            <li key={p.who} className="card-material rounded-xl p-6">
              <Icon className="w-5 h-5 text-loggie-purple" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-white">{p.who}</h2>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{p.text}</p>
            </li>
          );
        })}
      </ul>

      <div className="section-separator my-14" aria-hidden="true" />

      <h2 className="text-2xl font-bold text-white tracking-[-0.02em]">Where the time actually goes</h2>
      <p className="mt-4 max-w-2xl text-base text-gray-300 leading-relaxed">
        Most of the cost of a dispute is not the dispute. It is the weeks of reconstruction that come
        first — finding the photos, dating the estimates, working out which version went out and
        when. That work is cheap while it is happening and expensive afterwards.
      </p>

      <dl className="mt-10 max-w-3xl divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {MECHANISMS.map((m) => (
          <div key={m.label} className="py-5 sm:flex sm:gap-8">
            <dt className="mono text-2xs text-loggie-cyan/90 sm:w-44 sm:shrink-0 sm:pt-1">
              {m.label}
            </dt>
            <dd className="mt-1.5 sm:mt-0 text-base text-gray-300 leading-relaxed">{m.text}</dd>
          </div>
        ))}
      </dl>

      <Caution className="mt-10 max-w-2xl">
        <strong className="font-semibold text-amber-200">We have not measured any of this.</strong>{' '}
        Those are the mechanisms, not a benchmark. You will find no percentages, no hours-saved
        figures and no case studies here, because we have not run the study that would justify one.
      </Caution>

      <div className="section-separator my-14" aria-hidden="true" />

      <h2 className="text-2xl font-bold text-white tracking-[-0.02em]">What a proof is, and isn't</h2>
      <p className="mt-4 max-w-2xl text-base text-gray-300 leading-relaxed">
        A Loggie proof shows that content with a given fingerprint was anchored by a given signer at
        a given block, and that anyone can recompute it from the chain and the storage network. It is
        not a legal opinion, it does not authenticate what the content means, and it settles nothing
        on its own. What it removes is the argument about what existed when.
      </p>

      <h2 className="mt-14 text-2xl font-bold text-white tracking-[-0.02em]">
        Before you put a client on this
      </h2>
      <p className="mt-4 max-w-2xl text-base text-gray-300 leading-relaxed">
        Everything on the main site applies here, and the constraints are real ones. There are no
        team accounts, no seats and no admin console — a Loggie belongs to a person, and a business
        record is a person's record that the business can receive. If any of that is a dealbreaker,
        it should be.
      </p>

      <StatusStrip className="mt-6" />

      <p className="mt-6 text-base text-gray-400 leading-relaxed">
        The full list of what it cannot do yet, and every contract defect we know about, is on the{' '}
        <Link to="/status" className="text-loggie-cyan hover:underline">
          status page
        </Link>
        .
      </p>

      <div className="section-separator my-14" aria-hidden="true" />

      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-base text-loggie-cyan hover:text-loggie-cyan/80 transition-colors"
      >
        What Loggie actually is
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </PageLayout>
  );
}
