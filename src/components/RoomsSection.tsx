import { Home, FolderOpen, MessageSquare, BookUser, Rss, NotebookPen, User } from 'lucide-react';
import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   §4 — SEVEN ORDINARY ROOMS

   The flagship product tour, and it now runs immediately after the hero.
   It used to sit behind three sections of architecture, which meant a visitor
   had to work through why the thing exists before learning what it does.

   The job is to make the app feel finished and ordinary, and to prove "for
   everybody" with the five-word file vocabulary rather than by asserting
   simplicity.

   The icons are the app's own tab icons, in the app's own order, so the
   site's iconography is literally the product's. Never add a heart glyph —
   §8 exists because there are no likes.

   NOTE FOR A FUTURE PASS: the spec calls for one real screenshot of the Files
   panel below this grid, showing the five status words in situ. No genuine
   capture exists in the repo yet, and a mock would break the rule the whole
   site is built on, so the words are shown as chips instead. Replace with a
   real capture when one is taken — never with a rendered facsimile.
   ═══════════════════════════════════════════════════════════════════════ */

const ROOMS = [
  {
    icon: Home,
    name: 'Home',
    text: 'Your Loggie: your name, your inbox address, whether you’re recoverable from another device, and a link to share.',
  },
  {
    icon: FolderOpen,
    name: 'Files',
    text: 'Upload anything. It’s encrypted on your machine before it leaves, and each file shows exactly one word: Saved, Private, Backed up, Published, or Needs attention. The cryptography is still there; it just stopped being your problem.',
  },
  {
    icon: MessageSquare,
    name: 'Messages',
    text: 'Only wallets you have explicitly approved can deliver into your inbox, and what they send is sealed to your keys.',
  },
  {
    icon: BookUser,
    name: 'Contacts',
    text: 'Who you follow and who you’ve allowed rebuild themselves on a brand-new machine from public evidence. Your nicknames and private notes live in an encrypted vault only you can open.',
  },
  {
    icon: Rss,
    name: 'Feed',
    text: 'Posts from you and the people you follow, in the order things actually happened. Up to four images, link previews, drafts, and mentions.',
  },
  {
    icon: NotebookPen,
    name: 'Journal',
    text: 'A diary nobody else can read, recorded to your inbox the moment you save it, so it survives the laptop.',
  },
  {
    icon: User,
    name: 'Identity',
    text: 'Your keys, made on this device — plus a public page a stranger can open with no wallet and no signature at all.',
  },
] as const;

/** The five words a file can show, in product order. */
const FILE_STATES = ['Saved', 'Private', 'Backed up', 'Published', 'Needs attention'] as const;

export function RoomsSection() {
  return (
    <SectionWrapper id="six-rooms">
      <SectionHeading eyebrow="WHAT YOU GET">One identity. Seven places it becomes useful.</SectionHeading>

      <div className="mt-8 max-w-2xl space-y-5">
        <p className="text-lg text-gray-300 leading-relaxed">
          Seven screens, one key behind all of them. Everything technical — inbox admin, the
          indexer, the seal and decrypt tools — is collapsed under Advanced, where a normal person
          never has to look at it.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          Following someone, adding them as a contact, and letting them message you are three
          separate things. Loggie never merges them.
        </p>
      </div>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((room) => {
          const Icon = room.icon;
          return (
            <li key={room.name} className="card-material rounded-xl p-6">
              <Icon className="w-5 h-5 text-loggie-purple" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-white">{room.name}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{room.text}</p>
            </li>
          );
        })}

        {/* The five-word vocabulary, sitting in the grid as the eighth tile so it
            reads as part of Files rather than as a separate claim. */}
        <li className="code-material rounded-xl p-6">
          <p className="mono text-2xs text-loggie-cyan/90">A file says one word</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {FILE_STATES.map((state) => (
              <li
                key={state}
                className={`mono text-2xs px-2.5 py-1.5 rounded-md border ${
                  state === 'Backed up'
                    ? 'border-green-400/40 text-green-400 bg-green-400/10'
                    : 'border-white/[0.08] text-gray-400'
                }`}
              >
                {state}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Computed by a pure function, unit-tested for totality and monotonicity — so a badge can
            never move backwards.
          </p>
        </li>
      </ul>

      <Evidence>
        src/manifest.tsx:393-408 — seven main surfaces plus an Advanced group that is collapsible
        and collapsed by default. The five words come from
        file-panel/lib/human-status.ts, whose test pins totality and monotonicity.
        RELATIONSHIP_GRAPH_SEMANTICS_FREEZE.md §1 — follow is not the same as allowing a message.
        JOURNAL_V1.md — implemented and live-accepted 2026-09-11. The public profile route /i/:inbox
        is readable with no wallet (src/App.tsx:49).
      </Evidence>
    </SectionWrapper>
  );
}
