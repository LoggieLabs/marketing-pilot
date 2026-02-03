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

## Notes

- The `#request-access` hash triggers the pilot modal
- Form submissions generate mailto: links (no backend required)
- All Omni references link externally to omnituum.com
- No `/app` routes — this is marketing only
