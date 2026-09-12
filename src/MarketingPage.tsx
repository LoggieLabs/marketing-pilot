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
 * The page moves: feeling → mechanic → product → four proofs → the building
 * underneath → what is broken → what is missing → who it's for → what it costs
 * → the ask.
 *
 * The two disclosure sections (own-bugs, cant-do-yet) sit immediately before
 * the conversion, not in the footer. That placement is deliberate: a reader who
 * gets through both and keeps scrolling has convinced themselves, and nothing
 * later in the page has to work as hard.
 */
export default function MarketingPage() {
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
        <HeroSection />
        <OnLoanSection />
        <NoAccountSection />
        <RoomsSection />
        <ProveItSection />
        <GetItBackSection />
        <SealedSection />
        <NoAlgorithmSection />
        <EngineRoomSection />
        <OwnBugsSection />
        <CantDoYetSection />
        <IfYouveEverSection />
        <WhatItTakesSection />
        <StayInTouchSection />
      </main>
      <Footer />
    </div>
  );
}
