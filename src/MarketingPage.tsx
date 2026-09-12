import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HeroSection } from './components/HeroSection';
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
import { IfYouveEverSection } from './components/IfYouveEverSection';
import { WhatItTakesSection } from './components/WhatItTakesSection';
import { StayInTouchSection } from './components/StayInTouchSection';

/*
 * The page is built in three acts, and the split is deliberate:
 *
 *   ~25%  MARKETING      what you get, why it's different, how it starts
 *   ~25%  DEMONSTRATION  three proofs a reader could actually go and run
 *   ~50%  OPT-IN         what's unfinished, our own bugs, the protocol itself
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
        {/* Act one — what you get, why it differs, how it starts. */}
        <HeroSection />
        <RoomsSection />
        <NoAlgorithmSection />
        <OnLoanSection />
        <NoAccountSection />

        {/* Act two — three things a reader could go and check themselves. */}
        <ProveItSection />
        <GetItBackSection />
        <SealedSection />

        {/* Act three — opt-in: what is unfinished, then the machinery. */}
        <CantDoYetSection />
        <OwnBugsSection />
        <EngineRoomSection />

        <IfYouveEverSection />
        <WhatItTakesSection />
        <StayInTouchSection />
      </main>
      <Footer />
    </div>
  );
}
