import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RequestAccessProvider, useRequestAccess } from '../context/RequestAccessContext';

interface PilotPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function PilotPageContent({ title, subtitle, children }: PilotPageLayoutProps) {
  const { handleRequestAccessClick } = useRequestAccess();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('marketing-page');
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove('marketing-page');
    };
  }, []);

  return (
    <div className="min-h-screen bg-loggie-black text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-xs font-medium text-loggie-purple border border-loggie-purple/30 rounded-full mb-4">
              Pilot Phase
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-gray-400 text-lg">
              {subtitle}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

          {/* Body Content */}
          <div className="prose prose-invert prose-gray max-w-none mb-12">
            {children}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              Questions about these terms during the pilot phase?
            </p>
            <a
              href="#request-access"
              onClick={handleRequestAccessClick}
              className="inline-flex items-center px-6 py-3 bg-loggie-purple hover:bg-loggie-purple/80 text-white font-medium rounded-lg transition-all"
            >
              Request Pilot Access
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function PilotPageLayout(props: PilotPageLayoutProps) {
  return (
    <RequestAccessProvider>
      <PilotPageContent {...props} />
    </RequestAccessProvider>
  );
}
