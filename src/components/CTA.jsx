import { useState, useEffect, useRef } from 'react'
import Container from './ui/Container'
import Button from './ui/Button'
import { useInView } from '../hooks/useInView'

function useAnimatedCounter(target, inView, delay = 0, decimals = 0) {
  const [display, setDisplay] = useState(0)
  const fromRef = useRef(0)
  const animRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const start = performance.now() + delay
    const from = fromRef.current

    animRef.current = requestAnimationFrame(function tick(now) {
      const t = Math.max(0, now - start)
      const progress = Math.min(t / 1200, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = from + (target - from) * eased
      const displayVal = decimals > 0 ? parseFloat(next.toFixed(decimals)) : Math.round(next)
      setDisplay(displayVal)
      fromRef.current = displayVal
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick)
      }
    })
    return () => animRef.current && cancelAnimationFrame(animRef.current)
  }, [inView, target, delay, decimals])

  return display
}

const trustSignals = [
  { value: 10, suffix: 'K+', sub: 'Active businesses', delay: 0, decimals: 0 },
  { value: 94, suffix: '%', sub: 'Forecast accuracy', delay: 200, decimals: 0 },
  { value: 4.9, suffix: '/5', sub: 'Avg. rating', delay: 400, decimals: 1 },
  { value: 80, suffix: '%', sub: 'Reporting automated', delay: 600, decimals: 0 },
]

export default function CTA() {
  const [ref, inView] = useInView()
  const sectionRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 })

  const c1 = useAnimatedCounter(10, inView, 0, 0)
  const c2 = useAnimatedCounter(94, inView, 200, 0)
  const c3 = useAnimatedCounter(4.9, inView, 400, 1)
  const c4 = useAnimatedCounter(80, inView, 600, 0)
  const counters = [c1, c2, c3, c4]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    const onLeave = () => setMousePos({ x: -999, y: -999 })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="cta" className="py-20 md:py-28 bg-teal relative overflow-hidden" ref={sectionRef} style={{ contentVisibility: 'auto' }}>
      <div className="absolute inset-0 pointer-events-none" ref={ref}>
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,200,1,0.07), transparent 60%)`,
            opacity: mousePos.x > -900 ? 1 : 0,
          }}
        />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 animate-gradient-shift" style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-8 animate-gradient-shift" style={{ background: 'radial-gradient(circle, #FF9932, transparent 70%)', animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 animate-gradient-shift" style={{ background: 'radial-gradient(circle, #FFC801, transparent 60%)', animationDelay: '6s' }} />
      </div>

      <Container className="relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-yellow/70 mb-4">
            Get Started Today
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-powder mb-5">
            The next decision your business makes could be its smartest.
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto text-mint/70">
            Start with a 14-day trial. No credit card. No commitment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button href="#" size="lg" variant="gradient" magnetic className="min-w-[200px]">
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
            {trustSignals.map((signal, i) => {
              const num = counters[i]
              const label = signal.decimals > 0
                ? num.toFixed(signal.decimals) + signal.suffix
                : num + signal.suffix
              return (
                <div key={signal.sub} className="text-center">
                  <p className="font-heading text-2xl font-bold text-powder">{label}</p>
                  <p className="text-xs text-mint/50 mt-1">{signal.sub}</p>
                </div>
              )
            })}
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
