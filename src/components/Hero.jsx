import { useEffect, useState } from 'react'
import Container from './ui/Container'
import Button from './ui/Button'
import { useWaapiAnimation } from '../hooks/useWaapiAnimation'
import { useReducedMotion } from '../hooks/useReducedMotion'

const particles = Array.from({ length: 16 }, (_, i) => ({
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

  useEffect(() => {
    setMounted(true)
  }, [])

  const badgeRef = useWaapiAnimation(
    [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 500, delay: 100 },
    [mounted]
  )

  const headlineRef = useWaapiAnimation(
    [
      { opacity: 0, transform: 'translateY(24px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 600, delay: 250 },
    [mounted]
  )

  const subtitleRef = useWaapiAnimation(
    [
      { opacity: 0, transform: 'translateY(16px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 500, delay: 450 },
    [mounted]
  )

  const ctaRef = useWaapiAnimation(
    [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 500, delay: 600 },
    [mounted]
  )

  const dashboardRef = useWaapiAnimation(
    [
      { opacity: 0, transform: 'translateY(30px) scale(0.97)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' },
    ],
    { duration: 700, delay: 350, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    [mounted]
  )

  return (
    <section id="hero" className="relative min-h-[680px] md:min-h-[700px] flex items-center overflow-hidden bg-teal pt-16 md:pt-20" style={{ contain: 'layout style paint' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dot-grid-dark opacity-60" />
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full opacity-15 animate-gradient" style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)', willChange: 'transform' }} />
        <div className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-10 animate-gradient" style={{ background: 'radial-gradient(circle, #FF9932, transparent 70%)', animationDelay: '2s', willChange: 'transform' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-5 animate-gradient" style={{ background: 'radial-gradient(circle, #D9E8E2, transparent 70%)', animationDelay: '1s', willChange: 'transform' }} />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full opacity-8 animate-gradient" style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)', animationDelay: '3s', willChange: 'transform' }} />
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
      </div>

      <Container className="relative z-10 py-12 md:py-16">
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
            <span className="w-1.5 h-1.5 rounded-full bg-yellow inline-block pulse-ring" />
            98.7% forecast accuracy · Trusted by 2,400+ teams
          </div>

          <h1
            ref={headlineRef}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{ opacity: reduced ? 1 : undefined, willChange: 'transform, opacity' }}
          >
            <span style={{ color: '#F1F6F4' }}>Every business generates</span><br />
            <span className="gradient-text">signals</span>
            <span style={{ color: '#F1F6F4' }}>. Evolve turns them into decisions.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: '#D9E8E2', opacity: reduced ? 1 : undefined }}
          >
            Connects to your stack. Finds patterns your team might miss. Surfaces them before they become problems.
          </p>

          <div ref={ctaRef} style={{ opacity: reduced ? 1 : undefined }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="#cta" size="lg" variant="gradient" magnetic className="min-w-[180px]">
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
  const [phase, setPhase] = useState(0)
  const reduced = useReducedMotion()
  const [revDisplay, setRevDisplay] = useState(0)
  const [healthDisplay, setHealthDisplay] = useState(0)
  const [usersDisplay, setUsersDisplay] = useState(0)
  const phase3 = phase >= 3
  const phase4 = phase >= 4
  const phase5 = phase >= 5

  useEffect(() => {
    if (reduced) { setPhase(10); return }
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1300),
      setTimeout(() => setPhase(5), 1600),
      setTimeout(() => setPhase(6), 1900),
      setTimeout(() => setPhase(7), 2200),
      setTimeout(() => setPhase(8), 2500),
      setTimeout(() => setPhase(9), 2800),
      setTimeout(() => setPhase(10), 3100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  useEffect(() => {
    if (!phase3 || reduced) return
    const start = performance.now()
    let raf
    function tick(now) {
      const t = now - start
      const p = Math.min(t / 600, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setRevDisplay(Math.round(1284 * e) / 10)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase3, reduced])

  useEffect(() => {
    if (!phase4 || reduced) return
    const start = performance.now()
    let raf
    function tick(now) {
      const t = now - start
      const p = Math.min(t / 500, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setHealthDisplay(Math.round(87 * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase4, reduced])

  useEffect(() => {
    if (!phase5 || reduced) return
    const start = performance.now()
    let raf
    function tick(now) {
      const t = now - start
      const p = Math.min(t / 400, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setUsersDisplay(Math.round(2847 * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase5, reduced])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/20">
      <div className="scan-line" />
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/5">
        <span className="w-3 h-3 rounded-full bg-red-400/80" />
        <span className="w-3 h-3 rounded-full bg-yellow/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
        <span className="text-xs font-medium ml-2 text-mint/50 font-heading">dashboard.evolve.ai</span>
      </div>
      <DashboardSvg phase={phase} revDisplay={revDisplay} healthDisplay={healthDisplay} usersDisplay={usersDisplay} />
    </div>
  )
}

function DashboardSvg({ phase, revDisplay, healthDisplay, usersDisplay }) {
  return (
    <svg viewBox="0 0 800 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto bg-powder" preserveAspectRatio="xMidYMid meet">
      <rect width="800" height="420" fill="#F1F6F4" />
      <text x="28" y="40" fill="#172B36" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono">Overview</text>
      <text x="28" y="58" fill="#114C5A" fontSize="11" fontWeight="400" fontFamily="Inter">Last 30 days &middot; Updated 2m ago</text>

      {phase >= 1 && phase < 10 && (
        <g>
          <rect x="28" y="6" width="180" height="22" rx="11" fill="#FFC801" opacity="0.1" />
          <rect x="28" y="6" width="0" height="22" rx="11" fill="#FFC801" opacity="0.2" className="progress-fill" style={{ '--progress-width': `${((phase - 1) / 9) * 100}%`, animation: 'none', width: `${((phase - 1) / 9) * 100}%`, transition: 'width 0.3s linear' }} />
          <text x="120" y="21" fill="#FF9932" fontSize="9" fontWeight="600" fontFamily="Inter" textAnchor="middle">AI analyzing data...</text>
        </g>
      )}

      {phase >= 10 && (
        <g>
          <rect x="28" y="6" width="200" height="22" rx="11" fill="#10B981" opacity="0.15" />
          <circle cx="40" cy="17" r="4" fill="#10B981" />
          <text x="52" y="21" fill="#10B981" fontSize="9" fontWeight="600" fontFamily="Inter">AI Analysis Complete — 12 insights found</text>
        </g>
      )}

      {phase >= 2 && (
        <g className="kpi-card" style={{ animationDelay: '0s', opacity: 1, animation: 'none' }}>
          <rect x="28" y="76" width="172" height="88" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
          <text x="44" y="100" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="1">REVENUE</text>
          <text x="44" y="122" fill="#172B36" fontSize="22" fontWeight="800" fontFamily="JetBrains Mono">${phase >= 3 ? revDisplay.toFixed(1) : ''}k</text>
          <text x="44" y="138" fill="#FF9932" fontSize="11" fontWeight="600" fontFamily="Inter">↑ 12.5% vs last month</text>
          <polyline points="160,130 168,124 176,128 184,116 192,120 200,110" fill="none" stroke="#FFC801" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {phase >= 2 && (
        <g className="kpi-card" style={{ animationDelay: '0s', opacity: 1, animation: 'none' }}>
          <rect x="214" y="76" width="172" height="88" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
          <text x="230" y="100" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="1">HEALTH SCORE</text>
          <text x="230" y="122" fill="#FFC801" fontSize="22" fontWeight="800" fontFamily="JetBrains Mono">{phase >= 4 ? healthDisplay : ''}</text>
          <text x="290" y="122" fill="#172B36" fontSize="13" fontWeight="600" fontFamily="Inter">/100</text>
          <text x="230" y="138" fill="#172B36" fontSize="11" fontWeight="600" fontFamily="Inter">↑ 4 pts this quarter</text>
        </g>
      )}

      {phase >= 2 && (
        <g className="kpi-card" style={{ animationDelay: '0s', opacity: 1, animation: 'none' }}>
          <rect x="400" y="76" width="172" height="88" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
          <text x="416" y="100" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="1">ACTIVE USERS</text>
          <text x="416" y="122" fill="#172B36" fontSize="22" fontWeight="800" fontFamily="JetBrains Mono">{phase >= 5 ? usersDisplay.toLocaleString() : ''}</text>
          <text x="416" y="138" fill="#FF9932" fontSize="11" fontWeight="600" fontFamily="Inter">↑ 8.3% this week</text>
        </g>
      )}

      {phase >= 2 && (
        <g className="kpi-card" style={{ animationDelay: '0s', opacity: 1, animation: 'none' }}>
          <rect x="586" y="76" width="186" height="88" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
          <text x="602" y="100" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="1">RISK FLAG</text>
          {phase >= 9 && <rect x="602" y="110" width="8" height="8" rx="2" fill="#EF4444" className="pulse-dot" />}
          <text x="618" y="119" fill={phase >= 9 ? '#EF4444' : '#114C5A'} fontSize="11" fontWeight="600" fontFamily="Inter">{phase >= 9 ? 'Churn risk detected' : '—'}</text>
          <text x="602" y="138" fill="#114C5A" fontSize="10" fontFamily="Inter">3 customers showing churn signals</text>
        </g>
      )}

      <rect x="28" y="180" width="460" height="220" rx="12" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      <text x="46" y="206" fill="#172B36" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono">Revenue Trend</text>
      <text x="46" y="222" fill="#114C5A" fontSize="10" fontFamily="Inter">Forecast vs Actual</text>

      {[[240, '$80k'], [280, '$60k'], [320, '$40k'], [360, '$20k']].map(([y, label]) => (
        <g key={y}>
          <line x1="46" y1={y} x2="470" y2={y} stroke="#D9E8E2" strokeWidth="1" strokeDasharray="4" />
          <text x="40" y={y + 4} fill="#114C5A" fontSize="9" fontFamily="Inter" textAnchor="end">{label}</text>
        </g>
      ))}

      <path d="M46 360 L86 340 L126 330 L166 300 L206 270 L246 260 L286 250 L326 230 L366 220 L406 210 L446 200 L470 195 L470 370 L46 370 Z" fill="#FFC801" opacity="0.08" />
      {phase < 6 && <path d="M46 360 L86 340 L126 330 L166 300 L206 270 L246 260 L286 250 L326 230 L366 220 L406 210 L446 200 L470 195" stroke="#FFC801" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500" />}
      {phase >= 6 && <path className="chart-draw" d="M46 360 L86 340 L126 330 L166 300 L206 270 L246 260 L286 250 L326 230 L366 220 L406 210 L446 200 L470 195" stroke="#FFC801" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500" />}
      {phase < 8 && <path d="M470 195 L496 192 L526 188 L556 184 L586 180" stroke="#FF9932" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="130" strokeDashoffset="130" />}
      {phase >= 8 && <path className="chart-draw-forecast" d="M470 195 L496 192 L526 188 L556 184 L586 180" stroke="#FF9932" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="130" strokeDashoffset="130" />}
      {phase >= 6 && <circle cx="470" cy="195" r="4" fill="#FFC801" className="pulse-ring" />}
      {phase >= 8 && <circle cx="586" cy="180" r="4" fill="#FF9932" />}

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
        { title: 'Revenue growth accelerating', desc: 'Up 12.5% — highest this quarter', color: '#FFC801', phase: 7 },
        { title: 'Customer churn risk rising', desc: 'Support response +40%', color: '#EF4444', phase: 8 },
        { title: 'Forecast confidence: 94%', desc: 'Q4 projection within expected range', color: '#114C5A', phase: 8 },
      ].map((item, i) => {
        const y = 230 + i * 62
        const visible = phase >= item.phase
        return (
          <g key={i} style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease-out' }}>
            <rect x="522" y={y} width="8" height="8" rx="2" fill={item.color} />
            <text x="540" y={y + 8} fill="#172B36" fontSize="11" fontWeight="600" fontFamily="Inter">{item.title}</text>
            <text x="540" y={y + 24} fill="#114C5A" fontSize="10" fontFamily="Inter">{item.desc}</text>
          </g>
        )
      })}

      {phase >= 2 && (
        <g className="kpi-card" style={{ animationDelay: '0s', opacity: 1, animation: 'none' }}>
          <rect x="522" y={362} width="106" height="28" rx="6" fill="#F1F6F4" />
          <text x="532" y="379" fill="#114C5A" fontSize="8" fontWeight="600" fontFamily="Inter" letterSpacing="0.5">CASH FLOW</text>
          <text x="532" y="388" fill="#FFC801" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">+$34.2K</text>
        </g>
      )}

      {phase >= 2 && (
        <g className="kpi-card" style={{ animationDelay: '0s', opacity: 1, animation: 'none' }}>
          <rect x="640" y={362} width="106" height="28" rx="6" fill="#F1F6F4" />
          <text x="650" y="379" fill="#114C5A" fontSize="8" fontWeight="600" fontFamily="Inter" letterSpacing="0.5">AVG. ORDER</text>
          <text x="650" y="388" fill="#172B36" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">$89.00</text>
        </g>
      )}

      {phase >= 9 && (
        <g style={{ animation: 'slide-in-right 0.4s ease-out forwards' }}>
          <rect x="28" y="180" width="200" height="32" rx="16" fill="white" stroke="#EF4444" strokeWidth="1" />
          <rect x="42" y="192" width="6" height="6" rx="1.5" fill="#EF4444" className="pulse-dot" />
          <text x="54" y="198" fill="#EF4444" fontSize="10" fontWeight="600" fontFamily="Inter">3 alerts requiring attention</text>
        </g>
      )}
    </svg>
  )
}

function FloatingCards() {
  return (
    <>
      <div className="absolute -top-3 -right-3 w-44 h-24 rounded-xl bg-white shadow-xl border border-mint p-4 hidden md:block" style={{ borderColor: '#D9E8E2', animation: 'float 6s ease-in-out infinite' }}>
        <p className="text-[10px] font-semibold text-noir/75 font-heading tracking-wider mb-1">FORECAST</p>
        <p className="text-lg font-bold text-teal font-heading">+22.4%</p>
        <p className="text-[10px] text-noir/60">Q4 projected growth</p>
      </div>
      <div className="absolute -bottom-2 -left-3 w-40 h-20 rounded-xl bg-white shadow-xl border border-mint p-4 hidden md:block" style={{ borderColor: '#D9E8E2', animation: 'float-delayed 7s ease-in-out infinite 1s' }}>
        <p className="text-[10px] font-semibold text-noir/75 font-heading tracking-wider mb-1">INSIGHTS</p>
        <p className="text-sm font-bold text-orange font-heading">12 new</p>
        <p className="text-[10px] text-noir/60">AI discoveries today</p>
      </div>
      <div className="absolute top-1/2 -left-5 w-36 h-20 rounded-xl bg-white shadow-xl border border-amber-200 p-4 hidden md:block" style={{ borderColor: '#FFC801', animation: 'float-delayed 8s ease-in-out infinite 0.5s' }}>
        <p className="text-[10px] font-semibold text-noir/75 font-heading tracking-wider mb-1">REVENUE</p>
        <p className="text-sm font-bold text-yellow font-heading">$128.4k</p>
        <p className="text-[10px] text-noir/60">↑ 12.5% this month</p>
      </div>
      <div className="absolute bottom-0 -right-4 w-40 h-20 rounded-xl bg-white shadow-xl border border-red-200 p-4 hidden md:block" style={{ borderColor: '#FCA5A5', animation: 'float 9s ease-in-out infinite 2s' }}>
        <p className="text-[10px] font-semibold text-noir/75 font-heading tracking-wider mb-1">ALERT</p>
        <p className="text-sm font-bold text-red-500 font-heading">3 risks</p>
        <p className="text-[10px] text-noir/60">Churn & inventory</p>
      </div>
    </>
  )
}
