import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HeroSection } from './components/HeroSection';
import { WhenItMattersSection } from './components/WhenItMattersSection';
import { OnLoanSection } from './components/OnLoanSection';
import { NoAccountSection } from './components/NoAccountSection';
import { RoomsSection } from './components/RoomsSection';
import { ProveItSection } from './components/ProveItSection';
import { GetItBackSection } from './components/GetItBackSection';
import { SealedSection } from './components/SealedSection';
import { NoAlgorithmSection } from './components/NoAlgorithmSection';
import { EngineRoomSection } from './components/EngineRoomSection';
import { OwnBugsSection } from './components/OwnBugsSection';
import { CantDoYetSection } from './components/CantDoYetSection';
import { WhatItSavesSection } from './components/WhatItSavesSection';
import { WhatItTakesSection } from './components/WhatItTakesSection';
import { StayInTouchSection } from './components/StayInTouchSection';

/*
 * The page is built in four acts, and the split is deliberate:
 *
 *   WANT     the job, the situations it covers, the product, why it works so
 *   BELIEVE  three proofs a reader could actually go and run
 *   DECIDE   what it is worth, what is unfinished, our own bugs, the protocol
 *
 * The order changed after review found the site answered "can I believe
 * Loggie?" long before it answered "why would I want Loggie?" — leaving a
 * visitor to reverse-engineer the benefit out of the architecture. The
 * transparency is all still here; it is just no longer the opening argument.
 *
 * It used to run architecture-first, which meant a visitor had to work through
 * why the thing exists before learning what it does. The product tour now runs
 * directly after the hero.
 *
 * The two disclosure sections sit immediately before the conversion, not in the
 * footer. That placement is deliberate: a reader who gets through both and keeps
 * scrolling has convinced themselves, and nothing later has to work as hard.
 *
 * Exactly three proofs, not four. "Nothing is deciding what you see" is a
 * product principle rather than something a visitor can check, so it sits with
 * the product tour instead of padding the run.
 */export default function MarketingPage() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('marketing-page');
    return () => document.body.classList.remove('marketing-page');
  }, []);

  // Hash links arriving from another route (/status → /#engine-room) need one
  // frame for the sections to mount before the browser can find the anchor.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    const timer = window.setTimeout(scroll, 100);
    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <div className="min-h-screen bg-loggie-void text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* Act one — the job, then the situations, then the product.
            A reader has to recognise their own problem before any amount of
            cryptography is interesting, so nothing structural runs before this. */}
        <HeroSection />
        <WhenItMattersSection />
        <RoomsSection />
        <NoAlgorithmSection />

        {/* Act two — why it works that way, and how you start. */}
        <OnLoanSection />
        <NoAccountSection />

        {/* Act three — three things a reader could go and check themselves. */}
        <ProveItSection />
        <GetItBackSection />
        <SealedSection />

        {/* Act four — what it is worth, then what is unfinished, then the
            machinery. Due diligence is earned, not front-loaded. */}
        <WhatItSavesSection />
        <CantDoYetSection />
        <OwnBugsSection />
        <EngineRoomSection />

        <WhatItTakesSection />
        <StayInTouchSection />
      </main>
      <Footer />
    </div>
  );
}
