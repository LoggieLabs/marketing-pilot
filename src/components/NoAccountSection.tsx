import { Check, ArrowRight } from 'lucide-react';
import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, Caution } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   §3 — ONE SIGNATURE

   Turns "you own it" into a mechanic a parent can picture, then pays the
   honesty tax on it in the same breath: a browser wallet is required, and
   setup is five steps with several approvals, not one button.

   The ladder below reproduces the app's real onboarding checklist with its
   own labels. It is not a mock of a nicer flow — the app opens one task at a
   time, reads each task's state from the network rather than a local flag,
   and hides the whole thing when you are done.

   Do not write "one-click onboarding" here or anywhere else. The single-button
   "Get started" saga is a ratified design, not shipped.
   ═══════════════════════════════════════════════════════════════════════ */

const LADDER = [
  {
    label: 'Connect wallet',
    detail: "A MetaMask-style browser wallet on Ethereum's Sepolia test network.",
    done: true,
  },
  {
    label: 'Create your identity',
    detail:
      "In the app's own words: a name and keys made on this device. Nothing leaves it until you attach the identity to your inbox.",
    done: true,
  },
  {
    label: 'Create your inbox',
    detail:
      'One transaction. It deploys a small contract at its own address, and your wallet is its sole owner from that moment.',
    done: true,
  },
  {
    label: 'Enable recovery',
    detail:
      'Publishes a pointer to your encrypted backup so a future device can find it. Home then reads "Recoverable from any device" in green — or tells you plainly when it isn’t.',
    done: true,
  },
  {
    label: 'Connect with whoever invited you',
    detail: 'Add them as a contact, follow their posts, and allow them to message you.',
    done: false,
  },
] as const;

/* The three frames. The middle one carries this section's only purple. */
const FRAMES = ['wallet connect', '1 signature', 'keys on device'] as const;

export function NoAccountSection() {
  return (
    <SectionWrapper id="no-account">
      <SectionHeading eyebrow="HOW IT STARTS">There is no account. There is one signature.</SectionHeading>

      <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl">
          <p className="text-lg text-gray-300 leading-relaxed">
            You connect a wallet and sign one message. From that signature, Loggie builds your whole
            set of keys on your own computer — a signing key, an encryption key, and a post-quantum
            one. There is no password to remember, no email to hand over, and no company holding the
            master copy. Sign the same message with the same wallet on a different computer and you
            get the same keys back.
          </p>

          {/* The three-frame strip. Mono because these are states of the machine,
              not marketing labels. */}
          <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            {FRAMES.map((frame, i) => (
              <li key={frame} className="flex items-center gap-3">
                <span
                  className={`mono text-2xs px-3 py-2 rounded-lg border ${
                    i === 1
                      ? 'border-loggie-purple/50 text-loggie-purple bg-loggie-purple/10'
                      : 'border-white/[0.08] text-gray-400'
                  }`}
                >
                  {frame}
                </span>
                {i < FRAMES.length - 1 ? (
                  <ArrowRight className="w-3.5 h-3.5 text-gray-600 shrink-0" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>

          {/* The caveat gets the same type size as the promise. Never a footnote. */}
          <Caution className="mt-8">
            You do need a browser wallet, and today that means MetaMask in a desktop browser.
            Coinbase Wallet, Rabby and WalletConnect are not supported yet.
          </Caution>

          <Evidence>
            OnboardingLadder.tsx · SetupTasksHost.tsx · setup-tasks.ts:23-29 — a five-step checklist
            reading network state, one task at a time, hidden when complete. seeded-keys.ts:76-96
            derives an ML-KEM-1024 keypair (FIPS 203) from the same seed; determinism proven by
            cm-01-mnemonic-recovery-e2e.test.ts. UX_SUBTRACTION_NORTH_STAR.md §9 records two
            approvals as a target not yet met, so five steps is the truthful description.
          </Evidence>
        </div>

        <div>
          <p className="text-base text-gray-300 leading-relaxed max-w-xl">
            Setting up is five steps and several wallet approvals. It is a checklist inside the app
            that reads its state from the network rather than a local flag, opens one task at a
            time, and disappears when you're done.
          </p>

          <ol className="mt-6 card-material rounded-xl divide-y divide-white/[0.06]">
            {LADDER.map((step) => (
              <li key={step.label} className="flex gap-4 p-5">
                <span className="shrink-0 mt-0.5" aria-hidden="true">
                  {step.done ? (
                    <span className="flex w-5 h-5 items-center justify-center rounded-full bg-green-400/15">
                      <Check className="w-3 h-3 text-green-400" />
                    </span>
                  ) : (
                    <span className="flex w-5 h-5 items-center justify-center rounded-full bg-loggie-purple/20">
                      <ArrowRight className="w-3 h-3 text-loggie-purple" />
                    </span>
                  )}
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">{step.label}</span>
                  <span className="block mt-1 text-sm text-gray-400 leading-relaxed">
                    {step.detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionWrapper>
  );
}
