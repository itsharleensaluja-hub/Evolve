import Container from './ui/Container'
import Button from './ui/Button'
import { useInView } from '../hooks/useInView'

export default function CTA() {
  const [ref, inView] = useInView()

  return (
    <section id="cta" className="py-20 md:py-28 bg-teal relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #FF9932, transparent 70%)' }} />
      </div>

      <Container className="relative z-10">
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-yellow/70 mb-4">
            Get Started Today
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-powder mb-5">
            Ready to evolve your business?
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto text-mint/70">
            Join thousands of businesses using Evolve to make smarter decisions. Start your free 14-day trial.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="#" size="lg" variant="primary" className="min-w-[200px]">
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
            <Button href="#" size="lg" variant="secondary">
              Talk to Sales
            </Button>
          </div>
          <p className="text-xs mt-6 text-mint/40">
            Free 14-day trial &middot; No credit card required &middot; Cancel anytime
          </p>
        </div>
      </Container>
    </section>
  )
}
