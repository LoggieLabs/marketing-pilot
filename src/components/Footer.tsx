import { Link } from 'react-router-dom';

const APP_URL = 'https://app.loggielabs.com';

/*
 * Every link here resolves. The previous footer pointed at
 * github.com/loggie-xyz, which does not exist — the organisation is LoggieLabs,
 * and no Loggie repository is public yet, so there is no repository link at all
 * rather than a dead one. Do not add a GitHub, npm, X or Discord link until
 * there is something real behind it.
 */

const columns = [
  {
    heading: 'Loggie',
    links: [
      { label: 'Open Loggie', href: APP_URL, external: true },
      { label: 'What you get', href: '/#six-rooms' },
      { label: 'How proof works', href: '/#prove-it' },
      { label: 'The protocol', href: '/#engine-room' },
      { label: 'For work', href: '/for-work', router: true },
    ],
  },
  {
    heading: 'Before you decide',
    links: [
      { label: "What it can't do yet", href: '/#cant-do-yet' },
      { label: 'Status and defects', href: '/status', router: true },
      { label: 'Report a vulnerability', href: 'mailto:security@loggielabs.com' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy', router: true },
      { label: 'Terms', href: '/terms', router: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-loggie-void border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-bold gradient-text">Loggie</p>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-xs">
              Your identity, inbox, files and people. Owned by you.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-sm font-semibold text-white mb-4">{col.heading}</h2>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'router' in link && link.router ? (
                      <Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        {...('external' in link && link.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Adjacent work, one honest line each. Neither gets more weight than this. */}
        <div className="section-separator my-10" aria-hidden="true" />

        <dl className="grid gap-6 sm:grid-cols-2 max-w-4xl">
          <div>
            <dt className="text-sm font-medium text-gray-300">Omnituum</dt>
            <dd className="mt-1 text-sm text-gray-400 leading-relaxed">
              The open-source post-quantum cryptography Loggie is built on.{' '}
              <a
                href="https://omnituum.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-loggie-cyan hover:underline"
              >
                omnituum.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-300">Darkwire</dt>
            <dd className="mt-1 text-sm text-gray-400 leading-relaxed">
              An off-grid post-quantum Bluetooth mesh messenger for Android, in development: built and
              proven in simulation, not yet validated on real radios. iOS is not implemented.
            </dd>
          </div>
        </dl>

        <div className="section-separator my-10" aria-hidden="true" />

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <p className="text-sm text-gray-400">© 2026 Loggie Labs. MIT-licensed.</p>
          <p className="mono text-2xs text-gray-400 leading-relaxed md:text-right max-w-lg">
            The cryptography is public on npm; the contracts are verified on Etherscan; the app and
            SDK sources are not published yet. Public beta on Ethereum's Sepolia test network — not
            independently audited.
          </p>
        </div>

        <p className="mt-6 text-2xs text-gray-400">
          Security disclosures:{' '}
          <a href="mailto:security@loggielabs.com" className="text-gray-400 hover:text-white transition-colors">
            security@loggielabs.com
          </a>{' '}
          — acknowledged within 72 hours, fix or mitigation targeted within 90 days.
        </p>
      </div>
    </footer>
  );
}
