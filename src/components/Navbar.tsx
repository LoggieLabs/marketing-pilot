import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const APP_URL = 'https://app.loggielabs.com';

const navLinks = [
  { label: 'When it matters', hash: 'when-it-matters' },
  { label: 'What you get', hash: 'six-rooms' },
  { label: 'Proof', hash: 'prove-it' },
  { label: "What it can't do", hash: 'cant-do-yet' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on route change so a link never leaves it hanging open.
  useEffect(() => setMobileMenuOpen(false), [location.pathname, location.hash]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (isHomePage) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${hash}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-loggie-void/90 backdrop-blur-lg border-b border-white/[0.07]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center shrink-0" aria-label="Loggie — home">
            <img
              src="/loggie-nav-logo-phase-3.png"
              alt="Loggie"
              width={160}
              height={40}
              className="h-7 sm:h-8 md:h-9 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={`/#${link.hash}`}
                onClick={(e) => handleNavClick(e, link.hash)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={APP_URL}
              className="px-5 py-2.5 bg-loggie-purple hover:bg-loggie-purple/90 text-white
                         text-sm font-medium rounded-lg transition-colors"
            >
              Open Loggie
            </a>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-loggie-void border-t border-white/[0.07]">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={`/#${link.hash}`}
                onClick={(e) => handleNavClick(e, link.hash)}
                className="block py-2.5 text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={APP_URL}
              className="block w-full text-center px-6 py-3 bg-loggie-purple hover:bg-loggie-purple/90
                         text-white font-medium rounded-lg transition-colors mt-4"
            >
              Open Loggie
            </a>
            <p className="mono text-2xs text-gray-400 pt-2 text-center">
              Desktop browser + MetaMask. Sepolia test network.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
