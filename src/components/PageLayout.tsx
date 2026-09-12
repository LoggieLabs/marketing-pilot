import { useEffect, type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  title: string;
  subtitle: string;
  /** Set the reading column wider than prose default (used by /status). */
  wide?: boolean;
  children: ReactNode;
}

/**
 * Shell for the subpages (/status, /privacy, /terms).
 *
 * Replaces PilotPageLayout, which stamped a "Pilot Phase" pill on every page
 * and closed each one with a "Request Pilot Access" button.
 */
export function PageLayout({ title, subtitle, wide = false, children }: PageLayoutProps) {
  useEffect(() => {
    document.body.classList.add('marketing-page');
    window.scrollTo(0, 0);
    return () => document.body.classList.remove('marketing-page');
  }, []);

  return (
    <div className="min-h-screen bg-loggie-void text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className={`${wide ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.02em]">{title}</h1>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed">{subtitle}</p>

          <div className="section-separator my-10" aria-hidden="true" />

          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
