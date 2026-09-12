import { useState } from 'react';
import { ArrowRight, Check, Link2, Monitor, Wallet, Coins, Clock } from 'lucide-react';
import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading, Evidence, StatusStrip } from './shared/Proof';

/* ═══════════════════════════════════════════════════════════════════════
   §13 — WHAT THE NEXT TEN MINUTES COSTS

   Removes every remaining unknown before the conversion, answers the money
   question in one honest sentence, and handles the mobile reality as
   architecture rather than as a caveat.

   THE SUB-768px STATE IS DESIGNED, NOT A FALLBACK. The app does not reflow
   below 768px, so sending a phone visitor into it is the fastest way to burn
   the credibility this page just spent thirteen sections building. Below the
   md breakpoint the primary button is replaced by a copy-link block; the
   mailing list in §14 is the path for those readers.

   Do not write "free", "no gas", "sign up" or "create account" here. Loggie
   charges no subscription and takes no markup — that is the accurate line,
   and it is a better one.
   ═══════════════════════════════════════════════════════════════════════ */

const APP_URL = 'https://app.loggielabs.com';

const REQUIREMENTS = [
  {
    icon: Monitor,
    name: 'A desktop browser',
    detail: 'The panels have not been reflowed for small screens yet. On a phone, mail yourself this link.',
  },
  {
    icon: Wallet,
    name: 'A wallet extension',
    detail: 'MetaMask-style. Coinbase Wallet, Rabby and WalletConnect are not supported yet.',
  },
  {
    icon: Coins,
    name: 'Some Sepolia test ETH',
    detail: 'Free from a public faucet. It is not money and cannot be spent anywhere real.',
  },
  {
    icon: Clock,
    name: 'Ten minutes',
    detail: 'Connect, sign once, name yourself, deploy your inbox, turn on recovery.',
  },
] as const;

const STEPS = [
  'connect your wallet',
  'create your identity',
  'create your inbox',
  'turn on recovery',
  'connect with whoever invited you',
] as const;

function CopyLink() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(APP_URL).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          },
          () => {
            /* Clipboard unavailable. The URL is printed below the button, so
               there is nothing to recover from. */
          },
        );
      }}
      className="btn-secondary w-full py-3 inline-flex items-center justify-center gap-2"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-400" aria-hidden="true" />
          Link copied
        </>
      ) : (
        <>
          <Link2 className="w-4 h-4" aria-hidden="true" />
          Copy the link for later
        </>
      )}
    </button>
  );
}

export function WhatItTakesSection() {
  return (
    <SectionWrapper id="what-it-takes">
      <SectionHeading eyebrow="GETTING STARTED">What the next ten minutes actually costs you.</SectionHeading>

      <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-2xl">
          <p className="text-lg text-gray-300 leading-relaxed">
            Three things to have: a desktop browser, a MetaMask-style wallet extension, and a little
            Sepolia test ETH — which is free from a public faucet and worth nothing.
          </p>

          <ul className="mt-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {REQUIREMENTS.map((req) => {
              const Icon = req.icon;
              return (
                <li key={req.name} className="flex gap-4 py-4">
                  <Icon className="w-4 h-4 text-gray-400 shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-white">{req.name}</p>
                    <p className="mt-1 text-sm text-gray-400 leading-relaxed">{req.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-base text-gray-300 leading-relaxed">
            Then five steps on a checklist that vanishes when you're finished:{' '}
            {STEPS.join(', ')}. Expect several wallet approvals. Some of these are real blockchain
            transactions on Sepolia, and Loggie always asks before one happens — publishing a proof
            is something you confirm, never something that happens to you.
          </p>

          <p className="mt-5 text-base text-gray-300 leading-relaxed">
            Loggie is free and open source. We charge no subscription and take no markup. The only
            thing you pay is the network fee and the protocol fee on the actions you choose to put
            on-chain on Sepolia: 0.01 ETH plus gas to create your inbox, and gas on posting,
            following, allowing a sender, anchoring a file, or saving a journal entry. Today all of
            that is free test ETH.
          </p>

          <Evidence>
            The five-rung ladder is OnboardingLadder.tsx / SetupTasksHost.tsx / setup-tasks.ts,
            reading network state rather than a local flag. Open gap LA-04: the app assumes a
            MetaMask-style injected wallet. Open gap LA-01: panels do not reflow below 768px. The
            live InboxFactoryV7 fee is 0.01 ETH plus gas, routed 100% to RevenueRouter with no Loggie
            markup. A grep of the whole app returns no Stripe, subscription, billing or credit
            implementation.
          </Evidence>
        </div>

        {/* The ask. Maximum whitespace — this is the last thing most readers look at. */}
        <div className="lg:pt-8">
          <div className="card-material rounded-xl p-8">
            {/* Desktop: the real thing. */}
            <div className="hidden md:block">
              <a
                href={APP_URL}
                className="w-full px-8 py-4 bg-loggie-purple hover:bg-loggie-purple/90 text-white
                           text-lg font-medium rounded-lg transition-colors
                           inline-flex items-center justify-center gap-2"
              >
                Open Loggie
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>

            {/* Below 768px: a designed state, not a broken one. */}
            <div className="md:hidden">
              <p className="text-base font-medium text-white">
                Loggie needs a desktop browser today.
              </p>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                The panels have not been reflowed for small screens yet. Send yourself the link, or
                leave your email below and we'll write when that changes.
              </p>
              <div className="mt-5">
                <CopyLink />
              </div>
              <p className="mono text-2xs text-gray-400 mt-3 break-all">{APP_URL}</p>
            </div>

            <StatusStrip className="mt-6" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
