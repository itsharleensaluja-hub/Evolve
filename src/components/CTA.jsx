import Container from './ui/Container'
import Button from './ui/Button'
import { useInView } from '../hooks/useInView'

const trustSignals = [
  { label: '10K+', sub: 'Active businesses' },
  { label: '94%', sub: 'Forecast accuracy' },
  { label: '4.9/5', sub: 'Avg. rating' },
  { label: '80%', sub: 'Reporting automated' },
]

export default function CTA() {
  const [ref, inView] = useInView()

  return (
    <section id="cta" className="py-20 md:py-28 bg-teal relative overflow-hidden" ref={ref} style={{ contentVisibility: 'auto' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #FF9932, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #FFC801, transparent 60%)' }} />
      </div>

      <Container className="relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-yellow/70 mb-4">
            Get Started Today
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-powder mb-5">
            Ready to evolve your business?
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto text-mint/70">
            Join thousands of businesses using Evolve to make smarter decisions. Start your free 14-day trial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button href="#" size="lg" variant="gradient" className="min-w-[200px]">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="text-center">
                <p className="font-heading text-2xl font-bold text-powder">{signal.label}</p>
                <p className="text-xs text-mint/50 mt-1">{signal.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 text-xs text-mint/50">
            <div className="flex -space-x-2">
              {['#FFC801', '#FF9932', '#114C5A', '#D9E8E2'].map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-teal"
                  style={{ background: color }}
                />
              ))}
            </div>
            <span>Trusted by teams at <strong className="text-powder">2,400+</strong> companies</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
