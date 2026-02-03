import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemsSection } from './components/ProblemsSection';
import { SolutionSection } from './components/SolutionSection';
import { UseCasesSection } from './components/UseCasesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PreviewSection } from './components/PreviewSection';
import { DevSection } from './components/DevSection';
import { TrustSection } from './components/TrustSection';
import { AboutSection } from './components/AboutSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { RequestAccessProvider } from './context/RequestAccessContext';

export default function MarketingPage() {
  const location = useLocation();

  // Force dark mode and enable scroll for marketing page
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('marketing-page');

    return () => {
      document.body.classList.remove('marketing-page');
    };
  }, []);

  // Handle hash scrolling on navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <RequestAccessProvider>
      <div className="min-h-screen bg-loggie-black text-white overflow-x-hidden">
        <Navbar />
        <main>
          <HeroSection />
          <ProblemsSection />
          <SolutionSection />
          <UseCasesSection />
          <HowItWorksSection />
          <PreviewSection />
          <DevSection />
          <TrustSection />
          <AboutSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </RequestAccessProvider>
  );
}
