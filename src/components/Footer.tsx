import { Link } from 'react-router-dom';
import { Github, FileText, Mail, ExternalLink, Lock } from 'lucide-react';
import { useRequestAccess } from '../context/RequestAccessContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { handleRequestAccessClick } = useRequestAccess();

  const links = {
    product: [
      { label: 'Request Pilot Access', href: '#request-access', requestAccess: true },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Use Cases', href: '#use-cases' },
    ],
    developers: [
      { label: 'Documentation', href: '/docs', internal: true },
      { label: 'Developer Access (Pilot)', href: '#request-access', requestAccess: true },
    ],
    company: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#request-access', requestAccess: true },
      { label: 'Privacy Policy', href: '/privacy', internal: true },
      { label: 'Terms of Service', href: '/terms', internal: true },
    ],
  };

  return (
    <footer className="bg-loggie-black border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-loggie-purple to-loggie-cyan rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-loggie-purple">LOGGIE</span>
            </div>
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
                      href={link.href}
                      onClick={handleRequestAccessClick}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </a>
                  )}
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
                      href={link.href}
                      onClick={handleRequestAccessClick}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : 'internal' in link && link.internal ? (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target={'external' in link && link.external ? '_blank' : undefined}
                      rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {'external' in link && link.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  )}
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
                      href={link.href}
                      onClick={handleRequestAccessClick}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : 'internal' in link && link.internal ? (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </a>
                  )}
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
