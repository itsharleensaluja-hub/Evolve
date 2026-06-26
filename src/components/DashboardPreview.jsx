import { useRef } from 'react'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import { useInView } from '../hooks/useInView'
import { useWaapiAnimation } from '../hooks/useWaapiAnimation'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function DashboardPreview() {
  const [ref, inView] = useInView({ threshold: 0.05 })
  const reduced = useReducedMotion()
  const containerRef = useRef(null)
  const chartRef = useRef(null)

  useWaapiAnimation(
    containerRef,
    [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 700, delay: reduced ? 0 : 100, fill: 'forwards' },
    [inView, reduced]
  )

  return (
    <section className="py-20 md:py-28 bg-powder relative" ref={ref} style={{ contentVisibility: 'auto' }}>
      <Container>
        <SectionHeading
          label="Dashboard"
          title="Your entire business at a glance"
          description="Real-time analytics, AI-powered insights, and everything you need to make smarter decisions — all in one place."
        />
      </Container>

      <div ref={containerRef} className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12" style={{ opacity: reduced ? 1 : undefined }}>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-mint shadow-2xl shadow-mint/30 bg-white">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-mint/50 bg-powder">
              <span className="w-3 h-3 rounded-full bg-red-400/60" />
              <span className="w-3 h-3 rounded-full bg-yellow/60" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/60" />
              <span className="text-xs font-medium ml-2 text-teal font-heading">app.evolve.ai/dashboard</span>
            </div>
            <FullDashboardSvg />
          </div>
          <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-2xl border border-mint/40" />
        </div>
      </div>
    </section>
  )
}

function FullDashboardSvg() {
  return (
    <svg viewBox="0 0 900 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <rect width="900" height="500" fill="white" />

      <rect width="200" height="500" fill="#F1F6F4" />
      <rect x="20" y="24" width="160" height="32" rx="8" fill="#114C5A" />
      <text x="36" y="44" fill="#F1F6F4" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">EVOLVE</text>

      {[
        { label: 'Overview', active: true },
        { label: 'Analytics', active: false },
        { label: 'Forecasts', active: false },
        { label: 'Automations', active: false },
        { label: 'Settings', active: false },
      ].map((item, i) => (
        <rect key={i} x="12" y={76 + i * 44} width="176" height="36" rx="8" fill={item.active ? '#FFC801' : 'transparent'} />
      ))}
      <text x="28" y="98" fill="#172B36" fontSize="12" fontWeight={700} fontFamily="Inter">Overview</text>
      <text x="28" y="142" fill="#114C5A" fontSize="12" fontFamily="Inter">Analytics</text>
      <text x="28" y="186" fill="#114C5A" fontSize="12" fontFamily="Inter">Forecasts</text>
      <text x="28" y="230" fill="#114C5A" fontSize="12" fontFamily="Inter">Automations</text>
      <text x="28" y="274" fill="#114C5A" fontSize="12" fontFamily="Inter">Settings</text>

      <text x="224" y="40" fill="#172B36" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono">Dashboard</text>
      <text x="224" y="58" fill="#114C5A" fontSize="11" fontFamily="Inter">Your business at a glance</text>

      <g className="kpi-group">
        <rect x="224" y="76" width="155" height="80" rx="10" fill="#F1F6F4" />
        <text x="240" y="98" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="0.5">TOTAL REVENUE</text>
        <text x="240" y="120" fill="#172B36" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono">$384.2k</text>
        <text x="240" y="136" fill="#FF9932" fontSize="10" fontWeight="600" fontFamily="Inter">↑ 12.5% this month</text>

        <rect x="390" y="76" width="155" height="80" rx="10" fill="#F1F6F4" />
        <text x="406" y="98" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="0.5">HEALTH SCORE</text>
        <text x="406" y="120" fill="#FFC801" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono">87</text>
        <text x="440" y="120" fill="#172B36" fontSize="12" fontFamily="Inter">/100</text>
        <text x="406" y="136" fill="#172B36" fontSize="10" fontFamily="Inter">↑ 4 pts this quarter</text>

        <rect x="556" y="76" width="155" height="80" rx="10" fill="#F1F6F4" />
        <text x="572" y="98" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="0.5">ACTIVE USERS</text>
        <text x="572" y="120" fill="#172B36" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono">2,847</text>
        <text x="572" y="136" fill="#FF9932" fontSize="10" fontWeight="600" fontFamily="Inter">↑ 8.3% this week</text>

        <rect x="722" y="76" width="155" height="80" rx="10" fill="#F1F6F4" />
        <text x="738" y="98" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" letterSpacing="0.5">CASH FLOW</text>
        <text x="738" y="120" fill="#172B36" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono">+$34.2k</text>
        <text x="738" y="136" fill="#114C5A" fontSize="10" fontFamily="Inter">Positive this month</text>
      </g>

      <rect x="224" y="172" width="424" height="200" rx="12" fill="#F1F6F4" />
      <text x="244" y="196" fill="#172B36" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono">Revenue Overview</text>
      <text x="244" y="212" fill="#114C5A" fontSize="10" fontFamily="Inter">Last 12 months</text>

      {[[230, '$80k'], [260, '$60k'], [290, '$40k'], [320, '$20k']].map(([y, label]) => (
        <g key={y}>
          <line x1="244" y1={y} x2="632" y2={y} stroke="#D9E8E2" strokeWidth="1" strokeDasharray="3" />
          <text x="238" y={y + 4} fill="#114C5A" fontSize="9" fontFamily="Inter" textAnchor="end">{label}</text>
        </g>
      ))}

      <path className="chart-draw" d="M260 320 L290 300 L320 310 L350 280 L380 260 L410 250 L440 240 L470 230 L500 220 L530 210 L560 200 L590 195 L620 190" stroke="#FFC801" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500" />
      <path className="chart-draw-forecast" d="M620 190 L632 185" stroke="#FF9932" strokeWidth="2" strokeDasharray="4 3" fill="none" strokeLinecap="round" strokeDasharray="20" strokeDashoffset="20" />
      <circle cx="620" cy="190" r="3" fill="#FFC801" />

      {['J','F','M','A','M','J','J','A','S','O'].map((m, i) => (
        <text key={m} x={260 + i * 40} y="358" fill="#114C5A" fontSize="8" fontFamily="Inter" textAnchor="middle">{m}</text>
      ))}

      <rect x="500" y="192" width="10" height="10" rx="2" fill="#FFC801" />
      <text x="514" y="201" fill="#114C5A" fontSize="9" fontFamily="Inter">Actual</text>
      <rect x="560" y="192" width="10" height="10" rx="2" fill="#FF9932" />
      <text x="574" y="201" fill="#114C5A" fontSize="9" fontFamily="Inter">Forecast</text>

      <rect x="660" y="172" width="218" height="200" rx="12" fill="#F1F6F4" />
      <text x="678" y="196" fill="#172B36" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono">AI Insights</text>

      {[
        { title: 'Revenue accelerating', desc: 'Up 12.5% — best month', color: '#FFC801' },
        { title: 'Churn risk rising', desc: 'Response time up 40%', color: '#EF4444' },
        { title: 'Inventory alert', desc: '5 products low stock', color: '#FF9932' },
        { title: 'Forecast: 94% confidence', desc: 'Q4 within expected range', color: '#114C5A' },
      ].map((item, i) => {
        const y = 220 + i * 42
        return (
          <g key={i} className="insight-item">
            <rect x="678" y={y} width="6" height="6" rx="1.5" fill={item.color} />
            <text x="694" y={y + 6} fill="#172B36" fontSize="10" fontWeight="600" fontFamily="Inter">{item.title}</text>
            <text x="694" y={y + 20} fill="#114C5A" fontSize="9" fontFamily="Inter">{item.desc}</text>
          </g>
        )
      })}

      <rect x="224" y="388" width="200" height="90" rx="12" fill="#F1F6F4" />
      <text x="244" y="412" fill="#172B36" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">Top Channels</text>
      <rect x="244" y="426" width="6" height="6" rx="1.5" fill="#FFC801" />
      <text x="258" y="432" fill="#114C5A" fontSize="10" fontFamily="Inter">Direct — $142.4k (37%)</text>
      <rect x="244" y="444" width="6" height="6" rx="1.5" fill="#FF9932" />
      <text x="258" y="450" fill="#114C5A" fontSize="10" fontFamily="Inter">Organic — $98.2k (26%)</text>
      <rect x="244" y="462" width="6" height="6" rx="1.5" fill="#114C5A" />
      <text x="258" y="468" fill="#114C5A" fontSize="10" fontFamily="Inter">Referral — $72.1k (19%)</text>

      <rect x="438" y="388" width="210" height="90" rx="12" fill="#F1F6F4" />
      <text x="458" y="412" fill="#172B36" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">Quick Actions</text>
      <rect x="458" y="424" width="170" height="22" rx="6" fill="#FFC801" />
      <text x="543" y="438" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter" textAnchor="middle">Generate Report</text>
      <rect x="458" y="452" width="170" height="22" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      <text x="543" y="466" fill="#114C5A" fontSize="10" fontWeight="600" fontFamily="Inter" textAnchor="middle">Schedule Review</text>

      <rect x="660" y="388" width="218" height="90" rx="12" fill="#F1F6F4" />
      <text x="678" y="412" fill="#172B36" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">Notifications</text>
      <rect x="678" y="424" width="6" height="6" rx="1.5" fill="#EF4444" />
      <text x="694" y="430" fill="#172B36" fontSize="10" fontWeight="600" fontFamily="Inter">3 alerts requiring attention</text>
      <text x="694" y="446" fill="#114C5A" fontSize="9" fontFamily="Inter">Churn risk, inventory, payment failures</text>
      <rect x="678" y="456" width="120" height="16" rx="4" fill="#FFC801" />
      <text x="738" y="467" fill="white" fontSize="8" fontWeight="600" fontFamily="Inter" textAnchor="middle">View All</text>
    </svg>
  )
}
