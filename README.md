# Loggie marketing site

The public site for Loggie — **loggielabs.com**. Deployed as a Cloudflare Pages
project (`marketing-pilot`) with a D1 database (`marketing-pilot-intake`) behind
the encrypted intake endpoint.

> **This README replaced one that codified the old policy.** The previous version
> made "Pilot-First Framing", "No implied GA", "No 'Launch App' language" and
> "All CTAs funnel to pilot evaluation requests" into project rules. Every one of
> those is now wrong, and leaving them in place would have had the next person
> faithfully restore everything this revamp exists to remove.

## What this site is for

One job: get a visitor to open **app.loggielabs.com** and create an identity.
Secondary: give a developer a checkable way in, and catch the readers who cannot
install a browser wallet today.

## The rule the brand hangs on

> **Loggie is for people. Businesses are one of the places people take their Loggie.**

That sentence decides more than it looks like it does. It is why the homepage is
about personal continuity rather than evidence preservation, why `/for-work` is a
page rather than `business.loggielabs.com`, and why professional use cases are
framed as people bringing a durable record into their work instead of as a second
product with a second identity.

It is also deliberately broad. Loggie can expand in many directions — creators,
researchers, families, institutions — and each one is a new page standing on the
same trunk. What it must not become is a business records platform with a consumer
page bolted on, because that trades the one thing that makes it distinctive for a
crowded category.

Split the domain only when a professional can do something useful **without a
wallet**, or when real inbound from one profession justifies it. As of this
writing `NOW.md` records "Zero customer contact to date", and the app has no team
accounts, seats or admin console.

## The rules

These are not style preferences. The site's whole argument is *you don't have to
trust us*, and that only survives if nothing on it overclaims.

1. **Every claim carries a verifiable artefact in the same section.** Addresses,
   transaction hashes, block numbers, CIDs, file paths. If a claim cannot carry
   one, it either goes or it gets weaker until it is true.
2. **Every chain sentence carries the Sepolia qualifier.** Nothing of ours is on
   Ethereum mainnet — `exports/addresses/mainnet.json` is literally `{}`.
3. **The primary CTA always points at app.loggielabs.com.** No gates, no forms in
   front of the product, no "request access".
4. **No fabricated evidence, ever.** No mock screenshots, no illustrative block
   numbers, no example CIDs, no stock photography. The team already threw out a
   marketing image of its own app because it carried a fake VERIFIED badge; that
   line holds here. If a real capture does not exist, ship type and mono receipts
   instead — several sections do exactly that and say so in a comment.
5. **The ratified vocabulary applies.** `tamper-evident` — never `tamper-proof`,
   `unhackable` or `quantum-proof`. Never `audited` or `secure` while no outside
   firm has reviewed the code.

`pnpm check:claims` enforces most of this mechanically, and `pnpm build` runs it
first. It scans `src/`, **`functions/`** and `index.html`, and verifies every
address in `src/data/status.ts` against
`contracts/loggie-contracts/exports/addresses/sepolia.json` when that repo is on
disk.

`functions/` is in scope because `functions/_middleware.ts` carries the title and
description every link preview shows — Slack, LinkedIn, iMessage, X. That is
customer-facing copy, and leaving one copy path outside the guard is the kind of
asymmetry that drifts first.

## Structure

```
src/
├── main.tsx                    # routes
├── MarketingPage.tsx           # the 14 sections, in order
├── data/status.ts              # ⚠ THE LEDGER — see below
├── components/
│   ├── shared/Proof.tsx        # Address, TxHash, Block, Evidence, StatusStrip, Caution
│   ├── shared/SectionWrapper   # the spacing idiom, encoded once
│   ├── shared/AbstractBackground   # hero: live hex lattice + verification pulse
│   ├── shared/BlueprintLattice     # mid-page: the same lattice, static, 6%
│   ├── HeroSection … StayInTouchSection
│   └── IntakeForm.tsx          # single-field, client-encrypted
└── pages/  StatusPage · PrivacyPage · TermsPage
```

### `src/data/status.ts` is load-bearing

What is shipped, what is narrower than it sounds, what is missing, the contract
defect register and the contract map all render from this one file. It is data,
not prose, deliberately: the previous site went seven months out of date because
its claims lived scattered across ten components, and **a stale honesty section
is worse than no honesty section.**

Re-stamp `LAST_VERIFIED` every time it is reviewed, whether or not anything
changed. If you cannot find the evidence for a row, delete the row — do not
soften it.

## Routes

| Route | What it is |
|---|---|
| `/` | the single-page site |
| `/status` | the ledger: shipped / partial / limits / defects / contracts |
| `/privacy`, `/terms` | rewritten for consumers — **not lawyer-reviewed** |
| `/docs` | redirects to `/status`; there is no public documentation site |
| `*` | redirects to `/` |

## Running it

```bash
pnpm install
pnpm dev          # port 3000
pnpm check:claims # the copy lint
pnpm typecheck
pnpm build        # lint → tsc → vite
```

## Open decisions

Carried from the ecosystem review. Each one is a real choice, not a to-do.

1. **`/demo` has no target.** The spec's secondary CTA is a redirect to a real
   public Loggie profile (`app.loggielabs.com/#/i/<inbox>`) — the only
   zero-friction path for visitors who will not install a wallet. No inbox has
   been designated and inventing an address would break rule 4, so the hero's
   secondary button currently scrolls to the product tour. Designate an inbox you
   are happy to leave public and wire `/demo` in `public/_redirects`.
2. **Intake posts to an external worker, not to this site.** The endpoint comes
   from `VITE_INTAKE_ENDPOINT` (`src/lib/env.ts`), which must be set in
   Cloudflare Pages — the form is dead without it — and a guard hard-fails if it
   is ever pointed back at `loggielabs.com`, which has no intake worker behind
   it. `functions/api/intake.ts` and the `marketing-pilot-intake` D1 binding are
   therefore **not** the production path today. They are still in the tree and
   have been hardened (origins are now refused rather than echoed back and then
   processed, the honeypot is enforced, per-IP rate limiting added behind an
   `INTAKE_RATE` KV binding), but `wrangler.toml` still carries
   `database_id = "local"`. Decide whether that function is retired or wired up.
3. **`@omnituum/secure-intake-client` arrives without its `dist/`.** The
   encryptor is therefore loaded lazily at submit time; when it cannot load, the
   form reports that and **sends nothing**. There is no plaintext fallback and
   there must never be one. Fix the dependency to restore the form.
4. **`/status` needs a named owner and a cadence.** It currently names a mailbox.
5. **Screenshots.** Three sections are marked in comments as wanting a real
   capture of the app (Files panel, the certificate export, the verifier). They
   ship as type and mono receipts until genuine captures exist.
6. **Privacy and Terms need counsel.** Both were rewritten out of the pilot/NDA
   register, and both say so at the top of the file.
7. **`sites/loggie-marketing/web3/`** is a stale fork of this app — dead CTAs, a
   form that sends nothing, the retired "Omni" brand. The ecosystem review
   recommends deleting it. Its two useful CSS fixes (iOS overscroll and safe-area
   padding, and the `body.marketing-page` overflow rule that was a no-op here)
   have already been ported into `src/index.css`, so nothing is lost by removing
   it. Left in place pending your call.

## Design notes

The site inherits the app's design language so that clicking **Open Loggie**
feels like staying in the same building: `#07080C` substrate, flat surfaces,
hairline borders, border-colour as the only hover affordance, no shadows, no
scroll-triggered motion.

Two conventions worth knowing before editing:

- **Monospace is content, not decoration.** It is reserved for real addresses,
  CIDs, hashes and block numbers — it is the site's signature for *this is
  checkable*. Never use it as a label face.
- **The proof rule** (`<Evidence>`) marks a block whose claim has an artefact
  behind it. Its absence is information. Never add it for visual rhythm.

The purple→cyan gradient appears exactly three times site-wide: the hero's second
line, one hairline in the engine-room section, and the scrollbar. That restraint
is what stops a dark site reading as a crypto landing page.
