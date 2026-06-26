import { useState, useEffect, useRef } from 'react'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import { useInView } from '../hooks/useInView'
import { testimonials } from '../data/testimonials'
import { Star } from '../assets/icons'

function CompanyLogo({ company, className }) {
  const logos = {
    'Lumos Technologies': (
      <svg viewBox="0 0 80 24" fill="none" className={className}>
        <rect width="20" height="20" rx="4" fill="#114C5A" />
        <path d="M10 4l4 6-4 6" stroke="#FFC801" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="26" y="14" fill="#172B36" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">LUMOS</text>
      </svg>
    ),
    'NovaStack': (
      <svg viewBox="0 0 80 24" fill="none" className={className}>
        <rect width="20" height="20" rx="4" fill="#172B36" />
        <path d="M10 6l4 4-4 4" stroke="#FFC801" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10h4l2 2" stroke="#FF9932" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="26" y="14" fill="#172B36" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">NOVASTACK</text>
      </svg>
    ),
    'D2C Brands Inc.': (
      <svg viewBox="0 0 80 24" fill="none" className={className}>
        <rect width="20" height="20" rx="4" fill="#FF9932" opacity="0.15" />
        <text x="4" y="14" fill="#FF9932" fontSize="10" fontWeight="800" fontFamily="Helvetica">d2c</text>
        <text x="26" y="14" fill="#172B36" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">D2C</text>
      </svg>
    ),
  }

  return logos[company] || null
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView()
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const t = testimonials[active]

  useEffect(() => {
    if (paused) return
    timer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer.current)
  }, [paused])

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-powder" ref={ref} style={{ contentVisibility: 'auto' }}>
      <Container>
        <SectionHeading
          label="Testimonials"
          title="Trusted by industry leaders"
          description="See how Evolve is helping businesses of all sizes make smarter, data-driven decisions."
        />

        <div className={`max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div
            className="relative rounded-3xl border border-mint bg-white p-8 md:p-12 shadow-xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <svg className="absolute top-6 right-8 w-14 h-14 opacity-5" viewBox="0 0 24 24" fill="#114C5A">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
            </svg>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} color="#FFC801" />
                ))}
                <span className="text-sm font-semibold text-noir/50 ml-2 font-heading">{t.rating}.0</span>
              </div>
              <span className="text-[10px] font-medium text-teal bg-mint/40 px-3 py-1 rounded-full font-heading tracking-wider">
                {t.industry}
              </span>
            </div>

            <blockquote className="text-lg md:text-xl leading-relaxed mb-8 text-noir/70">
              &ldquo;{t.content}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #114C5A, #FFC801)' }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-noir">{t.name}</p>
                  <p className="text-xs text-noir/50">{t.role}, {t.company}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-mint/30 rounded-xl px-3 py-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF9932" className="inline-block">
                  <path d="M13 2L9 9H16l-3 7h7z" />
                </svg>
                <span className="text-[10px] font-semibold text-teal font-heading">{t.metric}</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-mint/50 flex items-center justify-between">
              <CompanyLogo company={t.company} className="h-5" />
              <div className="flex items-center gap-1.5 text-[10px] text-noir/30">
                <span>{active + 1}</span>
                <span>/</span>
                <span>{testimonials.length}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i)
                  setPaused(true)
                  setTimeout(() => setPaused(false), 6000)
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === active
                    ? 'w-8 bg-yellow'
                    : 'w-2 bg-mint hover:bg-mint/60'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
