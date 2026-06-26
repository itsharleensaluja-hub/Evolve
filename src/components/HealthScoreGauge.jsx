import Container from './ui/Container'
import { useInView } from '../hooks/useInView'
import { useWaapiAnimation } from '../hooks/useWaapiAnimation'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { healthDrivers } from '../data/healthScore'

const RADIUS = 72
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ARC_SWEEP = 270
const ARC_LENGTH = (ARC_SWEEP / 360) * CIRCUMFERENCE
const CENTER = 96
const STROKE = 12
const VIEWBOX = 192

const segments = [
  { label: 'Critical', end: 30, color: '#EF4444', bg: '#FEE2E2' },
  { label: 'Warning', end: 55, color: '#FF9932', bg: '#FEF3C7' },
  { label: 'Good', end: 80, color: '#FFC801', bg: '#FEF9C3' },
  { label: 'Excellent', end: 100, color: '#10B981', bg: '#D1FAE5' },
]

function computeArc(percent, totalArc, offset) {
  const angle = (percent / 100) * 360
  const segmentArc = (angle / 360) * totalArc
  const startAngle = (offset / totalArc) * 360 - 135
  const endAngle = startAngle + (segmentArc / totalArc) * 360
  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180

  const x1 = CENTER + RADIUS * Math.cos(startRad)
  const y1 = CENTER + RADIUS * Math.sin(startRad)
  const x2 = CENTER + RADIUS * Math.cos(endRad)
  const y2 = CENTER + RADIUS * Math.sin(endRad)

  const largeArc = segmentArc > 180 ? 1 : 0

  return {
    path: `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`,
    length: (segmentArc / 360) * CIRCUMFERENCE,
  }
}

export default function HealthScoreGauge() {
  const [ref, inView] = useInView()
  const reduced = useReducedMotion()

  const score = 87

  const containerRef = useWaapiAnimation(
    [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 600, delay: reduced ? 0 : 100, fill: 'forwards' },
    [inView, reduced]
  )

  const gaugeRef = useWaapiAnimation(
    [{ strokeDashoffset: ARC_LENGTH }, { strokeDashoffset: ARC_LENGTH * (1 - score / 100) }],
    { duration: 1000, delay: reduced ? 0 : 400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' },
    [inView, reduced]
  )

  const needleRef = useWaapiAnimation(
    [{ transform: 'rotate(-135deg)' }, { transform: `rotate(${-135 + (score / 100) * 270}deg)` }],
    { duration: 1000, delay: reduced ? 0 : 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' },
    [inView, reduced]
  )

  let offset = 0
  const arcs = segments.map((seg) => {
    const result = computeArc(seg.end, ARC_LENGTH, offset)
    offset = seg.end
    return { ...seg, ...result }
  })

  return (
    <section id="health-score" className="py-20 md:py-28 bg-powder relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #114C5A, transparent 70%)' }} />

      <Container className="relative z-10">
        <div ref={containerRef} className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-5/12 mb-12 lg:mb-0">
            <span className="inline-block font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-teal/70 mb-4">
              Health Score
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-noir mb-5">
              Your business health at a glance
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-noir/60 mb-8 max-w-md">
              One number that captures every dimension of your business. Updated every 15 minutes. Drops below 70? You will know before your team does.
            </p>

            <div className="flex flex-col gap-3">
              {healthDrivers.map((driver, i) => (
                <DriverRow key={driver.label} driver={driver} index={i} inView={inView} reduced={reduced} />
              ))}
            </div>
          </div>

          <div className="lg:w-6/12 lg:pl-12 flex justify-center">
            <div className="relative">
              <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} className="w-72 h-72 md:w-80 md:h-80">
                <g>
                  {arcs.map((seg) => (
                    <path
                      key={seg.label}
                      d={seg.path}
                      fill="none"
                      stroke={seg.bg}
                      strokeWidth={STROKE + 2}
                      strokeLinecap="round"
                    />
                  ))}
                  <path
                    ref={gaugeRef}
                    d={arcs.map((seg) => seg.path).join(' ')}
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={ARC_LENGTH}
                    strokeDashoffset={ARC_LENGTH}
                    style={{ willChange: 'stroke-dashoffset' }}
                  />
                </g>

                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="33%" stopColor="#FF9932" />
                    <stop offset="66%" stopColor="#FFC801" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>

                <text x={CENTER} y={CENTER - 8} textAnchor="middle" fill="#172B36" fontSize="36" fontWeight="800" fontFamily="JetBrains Mono">
                  {score}
                </text>
                <text x={CENTER} y={CENTER + 16} textAnchor="middle" fill="#114C5A" fontSize="14" fontFamily="Inter">/100</text>

                <g
                  ref={needleRef}
                  style={{ transformOrigin: `${CENTER}px ${CENTER}px`, willChange: 'transform' }}
                >
                  <line x1={CENTER} y1={CENTER + 6} x2={CENTER} y2={CENTER - RADIUS + 20} stroke="#172B36" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx={CENTER} cy={CENTER + 6} r="5" fill="#172B36" />
                </g>

                {arcs.map((seg, i) => {
                  const midAngle = -135 + ((seg.end - (seg.end - (i === 0 ? seg.end : segments[i - 1]?.end || 0)) / 2) / 100) * 270
                  const midRad = (midAngle * Math.PI) / 180
                  const labelR = RADIUS + 20
                  const lx = CENTER + labelR * Math.cos(midRad)
                  const ly = CENTER + labelR * Math.sin(midRad)
                  return (
                    <text key={seg.label} x={lx} y={ly} textAnchor="middle" fill="#114C5A" fontSize="7" fontFamily="Inter" fontWeight="600">
                      {seg.label}
                    </text>
                  )
                })}
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function DriverRow({ driver, index, inView, reduced }) {
  const driverRef = useWaapiAnimation(
    [{ opacity: 0, transform: 'translateX(-10px)' }, { opacity: 1, transform: 'translateX(0)' }],
    { duration: 400, delay: reduced ? 0 : 500 + index * 120, fill: 'forwards' },
    [inView, reduced]
  )

  return (
    <div ref={driverRef} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-mint/60" style={{ willChange: 'transform, opacity' }}>
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: driver.color }} />
        <div>
          <span className="text-sm font-medium text-noir">{driver.label}</span>
          <span className="text-xs text-noir/40 block">{driver.detail}</span>
        </div>
      </div>
      <span className="font-heading text-lg font-bold text-noir">{driver.value}</span>
    </div>
  )
}
