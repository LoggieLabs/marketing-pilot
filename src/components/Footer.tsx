import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, FileText, Mail, Lock } from 'lucide-react';
import { useRequestAccess } from '../context/RequestAccessContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { handleRequestAccessClick } = useRequestAccess();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.getElementById(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${hash}`);
    }
  };

  const links = {
    product: [
      { label: 'Request Pilot Access', requestAccess: true },
      { label: 'How It Works', hash: 'how-it-works' },
      { label: 'Use Cases', hash: 'use-cases' },
    ],
    developers: [
      { label: 'Documentation', to: '/docs' },
      { label: 'Developer Access (Pilot)', requestAccess: true },
    ],
    company: [
      { label: 'About', hash: 'about' },
      { label: 'Contact', requestAccess: true },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  };

  return (
    <footer className="bg-loggie-black border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 w-fit">
              <div className="w-8 h-8 bg-gradient-to-br from-loggie-purple to-loggie-cyan rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-loggie-purple hover:text-loggie-cyan transition-colors">LOGGIE</span>
            </Link>
            <p className="text-gray-400 text-sm mb-3">
              Permanent, verifiable blockchain proof for any digital asset.
            </p>
            <p className="text-gray-500 text-xs mb-2">
              Powered by{' '}
              <Link to="/omni" className="text-loggie-purple hover:text-loggie-cyan transition-colors">
                Omni post-quantum security
              </Link>
              .
            </p>
            <p className="text-gray-600 text-xs">
              Omni provides cryptographic software components only. No custody. No data hosting.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  {'requestAccess' in link && link.requestAccess ? (
                    <a
                      href="#request-access"
                      onClick={handleRequestAccessClick}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : 'hash' in link ? (
                    <a
                      href={`/#${link.hash}`}
                      onClick={(e) => handleHashClick(e, link.hash!)}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : 'to' in link ? (
                    <Link
                      to={link.to!}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Developers</h4>
            <ul className="space-y-2">
              {links.developers.map((link) => (
                <li key={link.label}>
                  {'requestAccess' in link && link.requestAccess ? (
                    <a
                      href="#request-access"
                      onClick={handleRequestAccessClick}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : 'to' in link ? (
                    <Link
                      to={link.to!}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.label}>
                  {'requestAccess' in link && link.requestAccess ? (
                    <a
                      href="#request-access"
                      onClick={handleRequestAccessClick}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : 'hash' in link ? (
                    <a
                      href={`/#${link.hash}`}
                      onClick={(e) => handleHashClick(e, link.hash!)}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : 'to' in link ? (
                    <Link
                      to={link.to!}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {currentYear} Loggie. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/loggie-xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <Link
              to="/docs"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5" />
            </Link>
            <a
              href="#request-access"
              onClick={handleRequestAccessClick}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
