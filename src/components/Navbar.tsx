import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRequestAccess } from '../context/RequestAccessContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { handleRequestAccessClick } = useRequestAccess();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Solutions', href: '#use-cases' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Developers', href: '#developers' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-loggie-black/90 backdrop-blur-lg border-b border-gray-800' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center">
            <img
              src="/assets/marketing/loggie-logo.png"
              alt="Loggie"
              className="h-9 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons - pilot-first */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#developers"
              className="px-5 py-2.5 text-gray-300 hover:text-white
                         font-medium transition-colors"
            >
              For Developers
            </a>
            <a
              href="#request-access"
              onClick={handleRequestAccessClick}
              className="px-6 py-2.5 bg-loggie-purple hover:bg-loggie-purple/80
                         text-white font-medium rounded-lg transition-all"
            >
              Request Pilot
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-loggie-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#request-access"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleRequestAccessClick(e);
              }}
              className="block w-full text-center px-6 py-3 bg-loggie-purple hover:bg-loggie-purple/80
                         text-white font-medium rounded-lg transition-all mt-4"
            >
              Request Pilot
            </a>
            <a
              href="#developers"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-6 py-3 border border-gray-700
                         text-gray-300 hover:text-white font-medium rounded-lg transition-all mt-2"
            >
              For Developers
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
