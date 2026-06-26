import { useState } from 'react'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import { useInView } from '../hooks/useInView'
import { testimonials } from '../data/testimonials'
import { Star } from '../assets/icons'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView()
  const t = testimonials[active]

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-powder" ref={ref}>
      <Container>
        <SectionHeading
          label="Testimonials"
          title="Trusted by industry leaders"
          description="See how Evolve is helping businesses of all sizes make smarter, data-driven decisions."
        />

        <div className={`max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative rounded-3xl border border-mint bg-white p-8 md:p-12 shadow-xl">
            <svg className="absolute top-6 right-8 w-14 h-14 opacity-5" viewBox="0 0 24 24" fill="#114C5A">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
            </svg>

            <div className="mb-6 flex items-center gap-1">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} color="#FFC801" />
              ))}
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
                  <p className="text-xs text-noir/50">{t.role}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#D9E8E2" stroke="#D9E8E2" strokeWidth="1">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <span className="text-sm font-semibold text-teal">{t.company}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
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
