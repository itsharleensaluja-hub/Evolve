import { useState, useRef, useCallback, useEffect } from 'react'
import Container from './ui/Container'
import Button from './ui/Button'
import { presets, baseline, computeImpact } from '../data/scenario'
import { useInView } from '../hooks/useInView'
import { useWaapiAnimation } from '../hooks/useWaapiAnimation'
import { useReducedMotion } from '../hooks/useReducedMotion'

const formatCurrency = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

function useAnimatedValue(target, inView, delay = 0) {
  const [display, setDisplay] = useState(baseline.revenue)
  const fromRef = useRef(baseline.revenue)
  const animRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const start = performance.now() + delay
    const from = fromRef.current

    animRef.current = requestAnimationFrame(function tick(now) {
      const t = Math.max(0, now - start)
      const progress = Math.min(t / 600, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = Math.round(from + (target - from) * eased)
      fromRef.current = next
      setDisplay(next)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick)
      }
    })

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [target, inView, delay])

  return display
}

function ScenarioBar({ label, baselineVal, projectedVal, color }) {
  const maxVal = Math.max(baselineVal, projectedVal, 1)
  const baselinePct = (baselineVal / maxVal) * 100
  const projectedPct = (projectedVal / maxVal) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-mint/70">{label}</span>
      </div>
      <div className="flex gap-1 items-end h-20">
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[9px] text-mint/50 font-heading">Base</span>
          <div className="w-full bg-white/10 rounded-t relative" style={{ height: `${baselinePct}%` }}>
            <div className="absolute inset-0 rounded-t bg-white/20" />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[9px] text-mint/50 font-heading">Projected</span>
          <div
            className="w-full rounded-t transition-all duration-500 ease-out"
            style={{ height: `${projectedPct}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  )
}

function ResultCard({ label, baselineVal, projectedVal, inView, delay }) {
  const display = useAnimatedValue(projectedVal, inView, delay)
  const diff = projectedVal - baselineVal
  const isPositive = diff >= 0

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
      <span className="text-[10px] font-heading font-semibold tracking-wider text-mint/50 uppercase">{label}</span>
      <div className="mt-2">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-2xl md:text-3xl font-extrabold text-powder">{formatCurrency(display)}</span>
          <span className={`text-xs font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '↑' : '↓'} {formatCurrency(Math.abs(diff))}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[10px] text-mint/40">Baseline: {formatCurrency(baselineVal)}</span>
        </div>
      </div>
    </div>
  )
}

export default function ScenarioSimulator() {
  const [params, setParams] = useState({ adSpend: 0, churnReduction: 0, efficiency: 0 })
  const [activePreset, setActivePreset] = useState(null)
  const [ref, inView] = useInView()
  const reduced = useReducedMotion()

  const result = computeImpact(params)

  const containerRef = useWaapiAnimation(
    [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 600, delay: reduced ? 0 : 100, fill: 'forwards' },
    [inView, reduced]
  )

  const handleSlider = useCallback((key, value) => {
    setParams((prev) => ({ ...prev, [key]: Number(value) }))
    setActivePreset(null)
  }, [])

  const handlePreset = useCallback((preset) => {
    setParams({ adSpend: preset.adSpend, churnReduction: preset.churnReduction, efficiency: preset.efficiency })
    setActivePreset(preset.id)
  }, [])

  return (
    <section id="scenario" className="py-20 md:py-28 bg-teal relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #D9E8E2, transparent 70%)' }} />
        <div className="absolute inset-0 bg-dot-grid-dark opacity-30" />
      </div>

      <Container className="relative z-10">
        <div ref={containerRef}>
          <div className="text-center mb-12">
            <span className="inline-block font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-yellow/70 mb-4">
              Scenario Simulator
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-powder mb-5">
              Move a slider. See what changes.
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-mint/60 max-w-lg mx-auto">
              No spreadsheets. No formulas. Just drag and discover.
            </p>
          </div>

          <div className="lg:flex lg:gap-10 max-w-5xl mx-auto">
            <div className="lg:w-5/12 mb-10 lg:mb-0">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <div className="flex flex-wrap gap-2 mb-6">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePreset(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-heading transition-all duration-200 cursor-pointer ${
                        activePreset === preset.id
                          ? 'bg-yellow text-noir'
                          : 'bg-white/10 text-mint/70 hover:bg-white/20'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <SliderControl
                  label="Ad Spend"
                  value={params.adSpend}
                  onChange={(v) => handleSlider('adSpend', v)}
                  inView={inView}
                  reduced={reduced}
                  index={0}
                />
                <SliderControl
                  label="Churn Reduction"
                  value={params.churnReduction}
                  onChange={(v) => handleSlider('churnReduction', v)}
                  inView={inView}
                  reduced={reduced}
                  index={1}
                />
                <SliderControl
                  label="Operational Efficiency"
                  value={params.efficiency}
                  onChange={(v) => handleSlider('efficiency', v)}
                  inView={inView}
                  reduced={reduced}
                  index={2}
                />
              </div>
            </div>

            <div className="lg:w-7/12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <ResultCard label="Revenue" baselineVal={baseline.revenue} projectedVal={result.revenue} inView={inView} delay={300} color="#FFC801" />
                <ResultCard label="Costs" baselineVal={baseline.costs} projectedVal={result.costs} inView={inView} delay={450} color="#FF9932" />
                <ResultCard label="Profit" baselineVal={baseline.profit} projectedVal={result.profit} inView={inView} delay={600} color="#10B981" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="text-xs font-heading font-semibold text-mint/60 mb-4 uppercase tracking-wider">Impact Comparison</h4>
                <div className="grid grid-cols-3 gap-4">
                  <ScenarioBar label="Revenue" baselineVal={baseline.revenue} projectedVal={result.revenue} color="#FFC801" />
                  <ScenarioBar label="Costs" baselineVal={baseline.costs} projectedVal={result.costs} color="#FF9932" />
                  <ScenarioBar label="Profit" baselineVal={baseline.profit} projectedVal={result.profit} color="#10B981" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-mint/50 hover:text-mint" onClick={() => setParams({ adSpend: 0, churnReduction: 0, efficiency: 0 })}>
                  Reset to baseline
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function SliderControl({ label, value, onChange, inView, reduced, index }) {
  const sliderRef = useWaapiAnimation(
    [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 400, delay: reduced ? 0 : 200 + index * 100, fill: 'forwards' },
    [inView, reduced]
  )

  return (
    <div ref={sliderRef} className="mb-5 last:mb-0" style={{ willChange: 'transform, opacity' }}>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-mint/80">{label}</label>
        <span className="text-sm font-heading font-bold text-yellow">{value > 0 ? '+' : ''}{value}%</span>
      </div>
      <input
        type="range"
        min="-25"
        max="50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(90deg, #FFC801 ${((value + 25) / 75) * 100}%, rgba(255,255,255,0.1) ${((value + 25) / 75) * 100}%)`,
          accentColor: '#FFC801',
        }}
        aria-label={label}
      />
      <div className="flex justify-between text-[9px] text-mint/30 mt-0.5">
        <span>-25%</span>
        <span>+50%</span>
      </div>
    </div>
  )
}
