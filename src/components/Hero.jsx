import { useEffect, useState, useRef } from 'react'
import Container from './ui/Container'
import Button from './ui/Button'
import { useWaapiAnimation } from '../hooks/useWaapiAnimation'
import { useReducedMotion } from '../hooks/useReducedMotion'

const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 3,
  dur: 4 + Math.random() * 6,
  delay: Math.random() * 3,
  opacity: 0.1 + Math.random() * 0.25,
}))

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const reduced = useReducedMotion()
  const badgeRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const dashboardRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useWaapiAnimation(
    badgeRef,
    [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 500, delay: 100 },
    [mounted]
  )

  useWaapiAnimation(
    headlineRef,
    [
      { opacity: 0, transform: 'translateY(24px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 600, delay: 250 },
    [mounted]
  )

  useWaapiAnimation(
    subtitleRef,
    [
      { opacity: 0, transform: 'translateY(16px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 500, delay: 450 },
    [mounted]
  )

  useWaapiAnimation(
    ctaRef,
    [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 500, delay: 600 },
    [mounted]
  )

  useWaapiAnimation(
    dashboardRef,
    [
      { opacity: 0, transform: 'translateY(30px) scale(0.97)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' },
    ],
    { duration: 700, delay: 350, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    [mounted]
  )

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-teal pt-16 md:pt-20" style={{ contain: 'layout style paint' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(241, 246, 244, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(241, 246, 244, 0.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {!reduced && particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-powder pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0,
              willChange: 'transform, opacity',
              animation: `fade-in 0.5s ease-out ${p.delay + 0.5}s forwards, float-particle ${p.dur}s ease-in-out ${p.delay + 0.5}s infinite`,
            }}
          />
        ))}
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full opacity-15 animate-gradient" style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)', willChange: 'transform' }} />
        <div className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-10 animate-gradient" style={{ background: 'radial-gradient(circle, #FF9932, transparent 70%)', animationDelay: '2s', willChange: 'transform' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-5 animate-gradient" style={{ background: 'radial-gradient(circle, #D9E8E2, transparent 70%)', animationDelay: '1s', willChange: 'transform' }} />
      </div>

      <Container className="relative z-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-heading font-semibold tracking-[0.15em] uppercase mb-8 border"
            style={{
              backgroundColor: 'rgba(255, 200, 1, 0.08)',
              borderColor: 'rgba(255, 200, 1, 0.15)',
              color: '#FFC801',
              opacity: reduced ? 1 : undefined,
              willChange: 'transform, opacity',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow inline-block animate-pulse" />
            Now available in early access
          </div>

          <h1
            ref={headlineRef}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{ opacity: reduced ? 1 : undefined, willChange: 'transform, opacity' }}
          >
            <span style={{ color: '#F1F6F4' }}>AI That</span>{' '}
            <span className="gradient-text">Grows</span>{' '}
            <span style={{ color: '#F1F6F4' }}>With Your Business</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: '#D9E8E2', opacity: reduced ? 1 : undefined }}
          >
            From health scores to revenue forecasts, Evolve analyzes your data, predicts trends, and automates workflows — so you can focus on growth.
          </p>

          <div ref={ctaRef} style={{ opacity: reduced ? 1 : undefined }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="#cta" size="lg" variant="gradient" className="min-w-[180px]">
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
              <Button href="#features" size="lg" variant="secondary">
                See Features
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm flex-wrap" style={{ color: '#D9E8E280' }}>
              {['No credit card', '14-day free trial', 'Cancel anytime'].map((text) => (
                <span key={text} className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={dashboardRef} className="mt-14 md:mt-20 relative max-w-5xl mx-auto" style={{ opacity: reduced ? 1 : undefined }}>
          <div className="relative">
            <DashboardMockup />
            <FloatingCards />
            <div className="absolute -bottom-5 -right-5 -z-10 w-full h-full rounded-2xl border border-white/5" />
          </div>
        </div>
      </Container>
    </section>
  )
}

function DashboardMockup() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/20">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/5">
        <span className="w-3 h-3 rounded-full bg-red-400/80" />
        <span className="w-3 h-3 rounded-full bg-yellow/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
        <span className="text-xs font-medium ml-2 text-mint/50 font-heading">dashboard.evolve.ai</span>
      </div>
      <DashboardSvg />
    </div>
  )
}

function DashboardSvg() {
  return (
    <svg viewBox="0 0 800 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto bg-powder" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="420" fill="#F1F6F4" />
      <text x="28" y="40" fill="#172B36" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono">Overview</text>
      <text x="28" y="58" fill="#114C5A" fontSize="11" fontWeight="400" fontFamily="Inter">Last 30 days &middot; Updated 2m ago</text>

      <rect x="28" y="76" width="172" height="88" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      <text x="44" y="100" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="1">REVENUE</text>
      <text x="44" y="122" fill="#172B36" fontSize="22" fontWeight="800" fontFamily="JetBrains Mono">$128.4k</text>
      <text x="44" y="138" fill="#FF9932" fontSize="11" fontWeight="600" fontFamily="Inter">↑ 12.5% vs last month</text>
      <polyline points="160,130 168,124 176,128 184,116 192,120 200,110" fill="none" stroke="#FFC801" strokeWidth="2" strokeLinecap="round" />

      <rect x="214" y="76" width="172" height="88" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      <text x="230" y="100" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="1">HEALTH SCORE</text>
      <text x="230" y="122" fill="#FFC801" fontSize="22" fontWeight="800" fontFamily="JetBrains Mono">87</text>
      <text x="290" y="122" fill="#172B36" fontSize="13" fontWeight="600" fontFamily="Inter">/100</text>
      <text x="230" y="138" fill="#172B36" fontSize="11" fontWeight="600" fontFamily="Inter">↑ 4 pts this quarter</text>

      <rect x="400" y="76" width="172" height="88" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      <text x="416" y="100" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="1">ACTIVE USERS</text>
      <text x="416" y="122" fill="#172B36" fontSize="22" fontWeight="800" fontFamily="JetBrains Mono">2,847</text>
      <text x="416" y="138" fill="#FF9932" fontSize="11" fontWeight="600" fontFamily="Inter">↑ 8.3% this week</text>

      <rect x="586" y="76" width="186" height="88" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      <text x="602" y="100" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="1">RISK FLAG</text>
      <rect x="602" y="110" width="8" height="8" rx="2" fill="#EF4444" />
      <text x="618" y="119" fill="#EF4444" fontSize="11" fontWeight="600" fontFamily="Inter">Churn risk detected</text>
      <text x="602" y="138" fill="#114C5A" fontSize="10" fontFamily="Inter">3 customers showing churn signals</text>

      <rect x="28" y="180" width="460" height="220" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      <text x="46" y="206" fill="#172B36" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono">Revenue Trend</text>
      <text x="46" y="222" fill="#114C5A" fontSize="10" fontFamily="Inter">Forecast vs Actual</text>

      {[[240, '$80k'], [280, '$60k'], [320, '$40k'], [360, '$20k']].map(([y, label], i) => (
        <g key={y}>
          <line x1="46" y1={y} x2="470" y2={y} stroke="#D9E8E2" strokeWidth="1" strokeDasharray="4" />
          <text x="40" y={y + 4} fill="#114C5A" fontSize="9" fontFamily="Inter" textAnchor="end">{label}</text>
        </g>
      ))}

      <path d="M46 360 L86 340 L126 330 L166 300 L206 270 L246 260 L286 250 L326 230 L366 220 L406 210 L446 200 L470 195 L470 370 L46 370 Z" fill="#FFC801" opacity="0.08" />
      <path className="chart-draw" d="M46 360 L86 340 L126 330 L166 300 L206 270 L246 260 L286 250 L326 230 L366 220 L406 210 L446 200 L470 195" stroke="#FFC801" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500" />
      <path className="chart-draw-forecast" d="M470 195 L496 192 L526 188 L556 184 L586 180" stroke="#FF9932" strokeWidth="2" strokeDasharray="5 3" fill="none" strokeLinecap="round" strokeDasharray="130" strokeDashoffset="130" />
      <circle cx="470" cy="195" r="4" fill="#FFC801" />
      <circle cx="586" cy="180" r="4" fill="#FF9932" />

      {['Jan', 'Mar', 'May', 'Jul', 'Sep'].map((m, i) => (
        <text key={m} x={46 + i * 100} y="388" fill="#114C5A" fontSize="9" fontFamily="Inter">{m}</text>
      ))}

      <rect x="352" y="196" width="10" height="10" rx="2" fill="#FFC801" />
      <text x="366" y="205" fill="#114C5A" fontSize="9" fontFamily="Inter">Actual</text>
      <rect x="406" y="196" width="10" height="10" rx="2" fill="#FF9932" />
      <text x="420" y="205" fill="#114C5A" fontSize="9" fontFamily="Inter">Forecast</text>

      <rect x="504" y="180" width="268" height="220" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      <text x="522" y="206" fill="#172B36" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono">AI Insights</text>

      {[
        { title: 'Revenue growth accelerating', desc: 'Up 12.5% this month — highest this quarter', color: '#FFC801' },
        { title: 'Customer churn risk rising', desc: 'Support response time increased 40%', color: '#EF4444' },
        { title: 'Forecast confidence: 94%', desc: 'Q4 projection within expected range', color: '#114C5A' },
      ].map((item, i) => {
        const y = 230 + i * 62
        return (
          <g key={i} className="insight-item">
            <rect x="522" y={y} width="8" height="8" rx="2" fill={item.color} />
            <text x="540" y={y + 8} fill="#172B36" fontSize="11" fontWeight="600" fontFamily="Inter">{item.title}</text>
            <text x="540" y={y + 24} fill="#114C5A" fontSize="10" fontFamily="Inter">{item.desc}</text>
          </g>
        )
      })}

      <rect x="522" y={362} width="106" height="28" rx="6" fill="#F1F6F4" />
      <text x="532" y="379" fill="#114C5A" fontSize="8" fontWeight="600" fontFamily="Inter" letterSpacing="0.5">CASH FLOW</text>
      <text x="532" y="388" fill="#FFC801" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">+$34.2K</text>

      <rect x="640" y={362} width="106" height="28" rx="6" fill="#F1F6F4" />
      <text x="650" y="379" fill="#114C5A" fontSize="8" fontWeight="600" fontFamily="Inter" letterSpacing="0.5">AVG. ORDER</text>
      <text x="650" y="388" fill="#172B36" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">$89.00</text>

      <g className="notification-pill">
        <rect x="28" y="180" width="200" height="32" rx="16" fill="white" stroke="#EF4444" strokeWidth="1" />
        <rect x="42" y="192" width="6" height="6" rx="1.5" fill="#EF4444" />
        <text x="54" y="198" fill="#EF4444" fontSize="10" fontWeight="600" fontFamily="Inter">3 alerts requiring attention</text>
      </g>
    </svg>
  )
}

function FloatingCards() {
  return (
    <>
      <div className="absolute -top-3 -right-3 w-44 h-24 rounded-xl bg-white shadow-xl border border-mint p-4 hidden md:block" style={{ borderColor: '#D9E8E2', animation: 'float 6s ease-in-out infinite' }}>
        <p className="text-[10px] font-semibold text-noir/60 font-heading tracking-wider mb-1">FORECAST</p>
        <p className="text-lg font-bold text-teal font-heading">+22.4%</p>
        <p className="text-[10px] text-noir/40">Q4 projected growth</p>
      </div>
      <div className="absolute -bottom-2 -left-3 w-40 h-20 rounded-xl bg-white shadow-xl border border-mint p-4 hidden md:block" style={{ borderColor: '#D9E8E2', animation: 'float-delayed 7s ease-in-out infinite 1s' }}>
        <p className="text-[10px] font-semibold text-noir/60 font-heading tracking-wider mb-1">INSIGHTS</p>
        <p className="text-sm font-bold text-orange font-heading">12 new</p>
        <p className="text-[10px] text-noir/40">AI discoveries today</p>
      </div>
    </>
  )
}
