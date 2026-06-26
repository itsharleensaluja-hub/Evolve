const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-noir border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              <rect x="2" y="2" width="32" height="32" rx="8" fill="none" stroke="#FFC801" strokeWidth="1.5" />
              <path d="M10 10h10a4 4 0 0 1 0 8h-4m-6-8v16m0-8h8a4 4 0 0 1 4 4v4" stroke="#FFC801" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M22 26l6-6m0 0h-4m4 0v4" stroke="#FF9932" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm text-mint/60 leading-relaxed max-w-xs">
              AI-powered business intelligence that helps you analyze, predict, and grow with confidence.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-heading text-[11px] font-semibold tracking-[0.15em] uppercase text-powder mb-5">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-mint/50 hover:text-mint transition-colors duration-200 no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-mint/40">
            &copy; {new Date().getFullYear()} Evolve. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Twitter', 'GitHub', 'LinkedIn', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-mint/40 hover:text-mint transition-colors no-underline"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
