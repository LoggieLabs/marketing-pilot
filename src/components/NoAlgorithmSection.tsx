import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   NOTHING IS DECIDING FOR YOU

   This was "Proof Four". It is not a proof — a visitor cannot go and check it
   the way they can check an anchor, a recovery or a ciphertext — it is a
   product principle, and it now reads as one, sitting with the product tour
   rather than padding the proof run to four. Three checkable proofs land
   harder than four claims of mixed kind.

   Converts an absence into the feature it actually is. The deliberate refusal
   to ship likes is the clearest single proof of the product's character, so
   it is stated as a decision with a reason, never as a roadmap gap.

   DESIGN RULE: no heart glyph appears anywhere on this site. Nothing
   decorative may contradict this section.

   The feed card below carries the app's real metadata row. The address shown
   is a truncation pattern, not a specific user's inbox — see the comment on
   it before changing anything.
   ═══════════════════════════════════════════════════════════════════════ */

/** The four words the feed deliberately does not implement. */
const ABSENT = ['ranked', 'recommended', 'trending', 'liked'] as const;

export function NoAlgorithmSection() {
  return (
    <SectionWrapper id="no-algorithm">
      <SectionHeading eyebrow="HOW THE FEED WORKS">Nothing here is deciding what you see.</SectionHeading>

      <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl space-y-5">
          <p className="text-lg text-gray-300 leading-relaxed">
            Your feed is you and the people you follow, in the order things actually happened. No
            ranking, no recommendations, no trending, no follower counts — and, deliberately, no
            likes. The team looked hard at reactions and concluded that a like which costs no
            blockchain transaction could not be made to survive, so they refused to ship a fake one.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            What you get instead is provenance. Every post carries who signed it, under which
            identity, and at which block. You can open the receipt on any post. Not verified in the
            blue-checkmark sense — verified in the here-is-the-evidence, check-it-yourself sense.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            Following someone needs nobody's permission and grants nothing. Letting someone message
            you is a separate, explicit choice, and one transaction.
          </p>

          <blockquote className="border-l-2 border-loggie-purple/50 pl-5 text-base text-gray-400 leading-relaxed">
            "Loggie does not rank or decide; these only count what people published."
            <footer className="mono text-2xs text-gray-400 mt-2">the product's own words</footer>
          </blockquote>
        </div>

        <div>
          {/*
            The provenance row as the app renders it. The inbox address is shown
            in its truncated display form rather than as a real person's address:
            no inbox has consented to appear on a marketing page, and pointing at
            a real one without asking would be its own small betrayal of the
            section above.
          */}
          <div className="card-material rounded-xl p-6">
            <p className="text-base text-gray-200 leading-relaxed">
              Anchored the folder manifest before sending it over. The hash in the certificate is
              the one the recipient recomputes.
            </p>

            <div className="section-separator my-5" aria-hidden="true" />

            <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mono text-2xs text-gray-400">
              <li className="text-gray-300">Name</li>
              <li aria-hidden="true">·</li>
              <li>@0x…inbox</li>
              <li aria-hidden="true">·</li>
              <li>block</li>
              <li aria-hidden="true">·</li>
              <li className="text-green-400">Provenance verified</li>
            </ul>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-2xs text-gray-400">
              <li>Reply</li>
              <li>Repost</li>
              <li>Bookmark</li>
            </ul>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {ABSENT.map((word) => (
              <li key={word} className="mono text-2xs text-gray-400 line-through">
                {word}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Signed to this network</h3>
              <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
                Posts are signed with EIP-712 typed data bound to the chain ID, so a signature from
                one network cannot be replayed on another.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">When the chain gives a partial answer</h3>
              <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
                The feed says so. Its own string: "Your wallet's RPC returned an incomplete log
                history for this inbox, so this feed may be missing items." Nothing here is
                presented as "no posts".
              </p>
            </div>
          </div>
        </div>
      </div>

      <Evidence>
        useSocialFeed.ts returns posts from you and the people you follow in strict chain order.
        FOLLOW_POST_PROTOCOL_SPEC.md §2.1/§2.3 — scheme eip712-v1 with chainId in the signing
        domain, pinned by social-protocol.ts and its test. The provenance row is FeedPanel's own.
        2026-09-11_REACTION_TRANSPORT_OPEN_QUESTIONS.md records reactions as not implemented and not
        designed. RELATIONSHIP_GRAPH_SEMANTICS_FREEZE.md §1 separates following from allowing.
      </Evidence>
    </SectionWrapper>
  );
}
