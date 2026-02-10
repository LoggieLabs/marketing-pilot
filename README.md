# Loggie Marketing Pilot

Lightweight marketing landing page for Loggie's pilot evaluation funnel.

## Overview

This is a standalone React + Vite app designed for enterprise and regulated-industry prospects evaluating Loggie as an independent verification layer. The site communicates **authority without overclaim** — positioned for audit, compliance, and security buyers who read literally.

## Design Principles

### Pilot-First Framing
- No implied GA (general availability)
- No "Launch App" or "npm install" language
- All CTAs funnel to pilot evaluation requests
- Code examples are labeled as "reference" or "pilot preview"

### Trust Signals
- "Reference implementation" not "live product"
- "Scoped evaluations" not "sign up today"
- "Pilot access" not "download now"
- External links to Omni (omnituum.com) for cryptographic substrate

### Tone
- Calm authority, no urgency spikes
- Factual, steady, inevitable
- Designed to pass scrutiny from security teams, auditors, and legal

## Running Locally

```bash
# Install dependencies
pnpm install

# Start dev server (port 3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Structure

```
src/
├── main.tsx                 # Entry point with React Router
├── MarketingPage.tsx        # Main page component
├── index.css                # Global styles + Tailwind
├── components/
│   ├── Navbar.tsx           # Fixed nav with pilot CTA
│   ├── HeroSection.tsx      # Above-fold messaging
│   ├── ProblemsSection.tsx  # Problem framing
│   ├── SolutionSection.tsx  # Loggie's approach
│   ├── UseCasesSection.tsx  # Industry applications
│   ├── HowItWorksSection.tsx # 4-step flow
│   ├── PreviewSection.tsx   # Reference output example
│   ├── DevSection.tsx       # Developer tooling (pilot access)
│   ├── TrustSection.tsx     # Trust model + Omni security
│   ├── AboutSection.tsx     # Company context
│   ├── CTASection.tsx       # Final conversion
│   ├── Footer.tsx           # Links + legal
│   ├── RequestAccessModal.tsx      # Pilot request modal
│   ├── RequestPilotAccessForm.tsx  # Form with mailto fallback
│   └── shared/
│       ├── AbstractBackground.tsx  # Animated hex lattice
│       ├── BlueprintLattice.tsx    # Static grid pattern
│       ├── NetworkBackground.tsx   # Network visualization
│       ├── SectionWrapper.tsx      # Consistent section styling
│       └── LogoAnimation.tsx       # Logo effects
├── context/
│   └── RequestAccessContext.tsx    # Modal state provider
└── hooks/
    └── useRequestAccessModal.ts    # Hash routing for modal
```

## Key Copy Decisions

| Section | Framing |
|---------|---------|
| Hero | "Request Pilot Evaluation" — no "Get Started" |
| Preview | "Example verification output (reference implementation)" |
| Developers | "Pilot preview" / "Pilot access" — no npm install |
| CTA | "Request Pilot Access" primary, "View Reference Demo" secondary |
| Trust | Links to omnituum.com for Omni security details |

## Dependencies

- React 18 + React Router 7
- Vite 5
- Tailwind CSS 3 + Typography plugin
- Lucide React (icons)
- No wallet/blockchain dependencies (intentionally lightweight)

## Encrypted Intake System

This subsystem handles pilot evaluation requests with end-to-end encryption. The server never sees plaintext PII.

### Does This Use IPFS?

**No.**

IPFS is explicitly not used in this intake flow. Rationale:

1. **Privacy boundary** — IPFS content-addressing exposes ciphertext hashes to the public DHT. Even without decryption, metadata (submission timing, volume, hash patterns) leaks to any DHT participant.

2. **Complexity** — Adding IPFS to the synchronous intake path introduces pinning dependencies, gateway latency, and failure modes that don't improve the security model.

3. **Not needed** — D1 provides durable, queryable ciphertext storage with Cloudflare's infrastructure guarantees. The intake boundary is already cryptographically sealed.

Current architecture path:

```
Browser → POST /api/intake → D1 (ciphertext only)
```

IPFS may be considered later as an async archival layer (see "Future Extensions" below), but it is **not in the intake path today**.

---

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           BROWSER                                   │
│  ┌─────────────┐    ┌──────────────────┐    ┌───────────────────┐  │
│  │ Form Input  │───▶│ Hybrid Encrypt   │───▶│ POST /api/intake  │  │
│  │ (plaintext) │    │ X25519 + Kyber   │    │ (ciphertext only) │  │
│  └─────────────┘    └──────────────────┘    └─────────┬─────────┘  │
│                              │                        │            │
│                              ▼                        │            │
│                     Deterministic ID                  │            │
│                     (BLAKE3 of ciphertext)            │            │
└──────────────────────────────────────────────────────│────────────┘
                                                        │
                    ════════════════════════════════════╪════════════
                              CLOUDFLARE                │
                                                        ▼
                                              ┌─────────────────┐
                                              │ Pages Function  │
                                              │ /api/intake.ts  │
                                              │ (validate only) │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │       D1        │
                                              │ intake_requests │
                                              │ (ciphertext)    │
                                              └─────────────────┘

                    ════════════════════════════════════════════════
                              OPERATOR (offline)
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   ▼                   │
                    │  ┌─────────────────────────────────┐  │
                    │  │ secrets/org.identity.json      │  │
                    │  │ (X25519 + Kyber private keys)  │  │
                    │  └───────────────┬─────────────────┘  │
                    │                  │                    │
                    │                  ▼                    │
                    │  ┌─────────────────────────────────┐  │
                    │  │ decrypt-intake.mjs             │  │
                    │  │ → plaintext                    │  │
                    │  └─────────────────────────────────┘  │
                    └───────────────────────────────────────┘
```

---

### Invariants (Non-Negotiable)

These invariants define the security boundary. Violating any of them breaks the trust model.

| Invariant | Description |
|-----------|-------------|
| **Ciphertext-only storage** | D1 stores only `encrypted_json`. No plaintext column exists. |
| **No server-side decryption** | The Worker validates envelope shape but never decrypts content. |
| **Client-computed intake ID** | The deterministic ID (BLAKE3 hash of ciphertext) is computed in-browser. Server does not recompute or trust its own hash. |
| **Org private keys are operator-only** | `secrets/org.identity.json` is never committed, never deployed, never accessible to Cloudflare. |
| **CORS via allowlist** | `ALLOWED_ORIGINS` env var controls which origins can POST. Response includes `Vary: Origin`. |

---

### Operator Workflow

#### Step 1 — Generate org identity (one-time, offline)

Creates the org's hybrid keypair. Private keys stay in `./secrets/`. Only public keys go to Cloudflare.

```bash
node scripts/decrypt-intake.mjs --gen-org-identity ./secrets/org.identity.json
```

Copy the printed values to Cloudflare Pages environment variables:

```
VITE_OMNITUUM_X25519_PUB_HEX=<printed-value>
VITE_OMNITUUM_KYBER_PUB_B64=<printed-value>
```

**Never commit `org.identity.json`.**

#### Step 2 — Local development

```bash
pnpm build
pnpm dev:pages
```

Submit the intake form at `http://localhost:8788`.

#### Step 3 — Export and decrypt

```bash
# Export latest ciphertext from local D1
node scripts/decrypt-intake.mjs --dump-latest --db-local --out ./tmp/encrypted.json

# Decrypt offline
node scripts/decrypt-intake.mjs ./secrets/org.identity.json ./tmp/encrypted.json
```

#### Step 4 — Print public keys (for rotation/verification)

```bash
node scripts/decrypt-intake.mjs --print-pub ./secrets/org.identity.json
```

---

### Environment Variables

All env vars are set in **Cloudflare Pages → Settings → Environment variables**.

**Build-time (client, public):**

| Variable | Description |
|----------|-------------|
| `VITE_OMNITUUM_X25519_PUB_HEX` | Org X25519 public key (hex) |
| `VITE_OMNITUUM_KYBER_PUB_B64` | Org Kyber768 public key (base64) |

**Runtime (server, optional):**

| Variable | Description |
|----------|-------------|
| `INTAKE_IP_SALT` | Salt for IP address hashing (privacy) |
| `ALLOWED_ORIGINS` | Comma-separated CORS allowlist |

**Local development** uses `.env` (client) and `.dev.vars` (server). See `.env.example` and `.dev.vars.example`.

---

### What This System Is NOT

- Not a Loggie inbox
- Not a registry identity
- Not CLI-managed
- Not on-chain
- Not IPFS-backed

This is a **standalone encrypted intake boundary** for pilot evaluation requests only.

---

### Future Extensions (Out of Scope Today)

The following may be added later but are **explicitly not implemented**:

#### IPFS Anchoring (optional, async)

If IPFS is added, it would be as an **asynchronous archival layer**:

- Ciphertext CID or hash anchored to IPFS after D1 write (not in request path)
- Must not block intake submission
- Must not expose metadata to DHT during synchronous flow
- Must preserve all invariants above

**This is not in scope for the current implementation.**

#### Other Potential Extensions

- Admin UI for viewing/exporting submissions
- Inbox posting (forward decrypted content to Loggie inbox)
- Webhook notifications

All extensions must preserve the ciphertext-only intake boundary.

## Notes

- The `#request-access` hash triggers the pilot modal
- Form submissions are encrypted client-side before POST
- All Omni references link externally to omnituum.com
- No `/app` routes — this is marketing only
