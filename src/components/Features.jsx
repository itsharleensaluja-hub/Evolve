import { useState, useCallback, useEffect, useRef } from 'react'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import FeatureMockup from './FeatureMockup'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useInView } from '../hooks/useInView'
import { features as featureData } from '../data/features'
import {
  ArrowTrendingUp,
  ChartPie,
  ArrowPath,
  Cube,
  Cog,
  Search,
  Link,
} from '../assets/icons'

const iconMap = {
  'arrow-trending-up': ArrowTrendingUp,
  'chart-pie': ChartPie,
  'arrow-path': ArrowPath,
  cube: Cube,
  cog: Cog,
  search: Search,
  link: Link,
}

const sizeOrder = { lg: 0, md: 1, sm: 2 }
const sorted = [...featureData].sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size])

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [ref, inView] = useInView()
  const prevDesktop = useRef(isDesktop)

  useEffect(() => {
    const wasDesktop = prevDesktop.current
    prevDesktop.current = isDesktop
    if (wasDesktop !== isDesktop && hoveredIndex !== null) {
      setActiveIndex(hoveredIndex)
    }
  }, [isDesktop, hoveredIndex])

  const handleActivate = useCallback((i) => {
    setActiveIndex((prev) => (prev === i ? -1 : i))
  }, [])

  const handleHover = useCallback((i) => {
    setHoveredIndex(i)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  return (
    <section id="features" className="py-20 md:py-28 bg-powder relative overflow-hidden" ref={ref} style={{ contentVisibility: 'auto' }}>
      <div className="absolute inset-0 pointer-events-none bg-dot-grid" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-mint/20 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          label="Features"
          title="Intelligence that scales with you"
          description="Eight powerful AI modules working together to analyze, predict, and automate your business operations."
        />

        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {isDesktop ? (
            <BentoGrid
              features={sorted}
              activeIndex={activeIndex}
              hoveredIndex={hoveredIndex}
              onActivate={handleActivate}
              onHover={handleHover}
              onHoverEnd={handleHoverEnd}
            />
          ) : (
            <AccordionView
              features={featureData}
              activeIndex={activeIndex}
              onActivate={handleActivate}
            />
          )}
        </div>
      </Container>
    </section>
  )
}

function BentoGrid({ features, activeIndex, hoveredIndex, onActivate, onHover, onHoverEnd }) {
  return (
    <div className="grid grid-cols-4 gap-5 auto-rows-[130px]">
      {features.map((feature, i) => {
        const globalIdx = featureData.findIndex((f) => f.id === feature.id)
        const isActive = activeIndex === globalIdx
        const isHovered = hoveredIndex === globalIdx && !isActive

        const colSpan = feature.size === 'lg' ? 'col-span-2' : feature.size === 'md' ? 'col-span-2' : 'col-span-1'
        const rowSpan = feature.size === 'lg' ? 'row-span-3' : feature.size === 'md' ? 'row-span-2' : 'row-span-1'

        return (
          <button
            key={feature.id}
            onClick={() => onActivate(globalIdx)}
            onMouseEnter={() => onHover(globalIdx)}
            onMouseLeave={onHoverEnd}
            className={`relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out cursor-pointer group ${colSpan} ${rowSpan}
              ${isActive
                ? 'bg-white border-yellow shadow-xl shadow-yellow/10'
                : isHovered
                  ? 'bg-white border-yellow/50 shadow-lg shadow-yellow/5 -translate-y-0.5'
                  : 'bg-[#EEF3F0] border-transparent hover:bg-white hover:border-yellow/40 hover:shadow-lg hover:-translate-y-1'
              }`}
            aria-pressed={isActive}
            aria-label={`${feature.title} — ${feature.description}`}
          >
            <div className="p-5 md:p-6 flex flex-col h-full">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3 min-w-0">
                  <FeatureIcon icon={feature.icon} isActive={isActive} isHovered={isHovered} size={feature.size} />
                  <div>
                    <h3 className={`font-heading font-bold leading-snug transition-colors ${
                      feature.size === 'lg' ? 'text-lg md:text-xl' : feature.size === 'md' ? 'text-base' : 'text-sm'
                    } ${isActive ? 'text-teal' : isHovered ? 'text-teal' : 'text-noir'}`}>
                      {feature.title}
                    </h3>
                    {feature.size !== 'sm' && (
                      <p className="text-[11px] md:text-xs text-noir/50 leading-relaxed mt-1 max-w-md">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {feature.status && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold font-heading tracking-wider"
                      style={{
                        backgroundColor: `${feature.statusColor}15`,
                        color: feature.statusColor,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feature.statusColor }} />
                      {feature.status}
                    </span>
                  )}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow shrink-0 animate-pulse" />
                  )}
                </div>
              </div>

              {feature.size === 'sm' && (
                <p className="text-[11px] text-noir/50 leading-relaxed mb-2 line-clamp-2">
                  {feature.description}
                </p>
              )}

              {feature.kpis && isActive && (
                <div className="flex gap-3 mb-2 count-up">
                  {feature.kpis.map((kpi, ki) => (
                    <div key={ki} className="bg-teal/5 rounded-lg px-2.5 py-1.5" style={{ animationDelay: `${ki * 0.1}s` }}>
                      <span className="text-[9px] text-noir/50 font-medium">{kpi.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold font-heading text-teal">{kpi.value}</span>
                        {kpi.trend && (
                          <span className="text-[9px] font-semibold text-orange">{kpi.trend}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={`mt-auto transition-all duration-500 ease-out ${
                isActive ? 'opacity-100 scale-100' : isHovered ? 'opacity-80 scale-[1.02]' : 'opacity-50 scale-100 group-hover:opacity-80 group-hover:scale-[1.02]'
              }`}>
                <FeatureMockup type={feature.icon} isActive={isActive} size={feature.size} />
              </div>
            </div>

            <div
              className={`absolute inset-x-0 bottom-0 h-0.5 transition-all duration-500 ${
                isActive || isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ background: 'linear-gradient(90deg, #FFC801, #FF9932)' }}
            />
          </button>
        )
      })}
      <div className="col-span-1 row-span-1" />
    </div>
  )
}

function AccordionView({ features, activeIndex, onActivate }) {
  return (
    <div className="flex flex-col gap-3">
      {features.map((feature) => {
        const isOpen = activeIndex === feature.id - 1

        return (
          <div
            key={feature.id}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'bg-white border-yellow shadow-lg shadow-yellow/10'
                : 'bg-[#EEF3F0] border-transparent'
            }`}
          >
            <button
              onClick={() => onActivate(feature.id - 1)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`feature-panel-${feature.id}`}
            >
              <FeatureIcon icon={feature.icon} isActive={isOpen} />
              <div className="flex-1 min-w-0">
                <h3 className={`font-heading text-sm font-bold leading-snug ${
                  isOpen ? 'text-teal' : 'text-noir'
                }`}>
                  {feature.title}
                </h3>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#114C5A"
                strokeWidth="2"
                strokeLinecap="round"
                className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              id={`feature-panel-${feature.id}`}
              role="region"
              className={`transition-all duration-400 overflow-hidden ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-4">
                <p className="text-sm text-noir/60 leading-relaxed mb-4">{feature.description}</p>
                <FeatureMockup type={feature.icon} size="md" isActive={isOpen} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function FeatureIcon({ icon, isActive, isHovered, size = 'sm' }) {
  const IconComponent = iconMap[icon] || ChartPie
  const color = isActive || isHovered ? '#FFC801' : '#114C5A'
  const bg = isActive
    ? 'rgba(255, 200, 1, 0.12)'
    : isHovered
      ? 'rgba(255, 200, 1, 0.08)'
      : 'rgba(17, 76, 90, 0.06)'

  const dims = size === 'lg' ? 'w-11 h-11' : 'w-9 h-9'

  return (
    <div
      className={`${dims} rounded-xl flex items-center justify-center shrink-0 transition-all duration-300`}
      style={{ backgroundColor: bg }}
    >
      <IconComponent color={color} />
    </div>
  )
}
