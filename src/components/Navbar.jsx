import { useState, useEffect } from 'react'
import Logo from './Logo'
import Button from './ui/Button'
import { useActiveSection } from '../hooks/useActiveSection'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-teal/80 backdrop-blur-2xl shadow-lg shadow-black/10'
          : 'bg-teal/40 backdrop-blur-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const sectionId = link.href.slice(1)
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 no-underline ${
                    isActive
                      ? 'text-powder bg-white/10'
                      : 'text-powder/60 hover:text-powder hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <Button href="#cta" size="sm" variant="gradient">
              Get Started
            </Button>

            <button
              className="md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center text-powder/70 hover:text-powder hover:bg-white/10 transition-all cursor-pointer border border-white/10 backdrop-blur-sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" className="animate-fade-in" />
                    <line x1="6" y1="6" x2="18" y2="18" className="animate-fade-in" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-350 ease-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-teal/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-3">
          {links.map((link, i) => {
            const sectionId = link.href.slice(1)
            const isActive = activeSection === sectionId
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium no-underline transition-all duration-200 ${
                  isActive
                    ? 'text-powder bg-white/10'
                    : 'text-powder/60 hover:text-powder hover:bg-white/5'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
                }}
              >
                {link.label}
              </a>
            )
          })}
          <Button href="#cta" variant="gradient" className="mt-2 w-full" onClick={() => setMobileOpen(false)}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
