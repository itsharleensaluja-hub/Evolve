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
  const [ref] = useInView()
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
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-yellow/5 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          label="Features"
          title="Understand what's happening today. Predict what happens next."
          description="Each module focuses on one problem — revenue, retention, operations, forecasting. Together they build a complete picture of your business."
        />

        <div>
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

function variantClasses(variant, isActive, isHovered) {
  if (isActive) {
    switch (variant) {
      case 'dark': return 'bg-teal/95 border-teal/80 shadow-xl shadow-teal/20'
      case 'gradient': return 'bg-white border-yellow shadow-xl shadow-yellow/10'
      case 'bordered': return 'bg-white border-yellow shadow-xl shadow-yellow/10'
      default: return 'bg-white border-yellow shadow-xl shadow-yellow/10'
    }
  }
  if (isHovered) {
    switch (variant) {
      case 'dark': return 'bg-teal/90 border-yellow/40 shadow-lg shadow-yellow/5 -translate-y-0.5'
      case 'gradient': return 'bg-white border-yellow/50 shadow-lg shadow-yellow/5 -translate-y-0.5'
      case 'bordered': return 'bg-white border-yellow/50 shadow-lg shadow-yellow/5 -translate-y-0.5'
      default: return 'bg-white border-yellow/50 shadow-lg shadow-yellow/5 -translate-y-0.5'
    }
  }
  switch (variant) {
    case 'dark':
      return 'bg-teal/80 border-teal/50 hover:bg-teal/90 hover:border-yellow/30 hover:shadow-lg hover:-translate-y-1'
    case 'gradient':
      return 'bg-gradient-to-br from-yellow/[0.04] via-white to-orange/[0.06] border-yellow/10 hover:bg-white hover:border-yellow/40 hover:shadow-lg hover:-translate-y-1'
    case 'bordered':
      return 'bg-white border-2 border-yellow/15 hover:border-yellow/40 hover:shadow-lg hover:-translate-y-1'
    default:
      return 'bg-[#EEF3F0] border-yellow/5 hover:bg-white hover:border-yellow/40 hover:shadow-lg hover:-translate-y-1'
  }
}

function BentoGrid({ features, activeIndex, hoveredIndex, onActivate, onHover, onHoverEnd }) {
  return (
    <div className="grid grid-cols-4 gap-5 auto-rows-[160px]">
      {features.map((feature, i) => {
        const globalIdx = featureData.findIndex((f) => f.id === feature.id)
        const isActive = activeIndex === globalIdx
        const isHovered = hoveredIndex === globalIdx && !isActive

        const colSpan = feature.size === 'lg' ? 'col-span-2' : feature.size === 'md' ? 'col-span-2' : 'col-span-1'
        const rowSpan = feature.size === 'lg' ? 'row-span-4' : feature.size === 'md' ? 'row-span-3' : 'row-span-2'

        const chartSize = feature.size === 'lg' ? 'lg' : feature.size === 'md' ? 'md' : 'sm'
        const mockupSize = feature.layout === 'chart-first'
          ? (feature.size === 'lg' ? 'lg' : feature.size === 'md' ? 'lg' : 'md')
          : chartSize
        const mockupType = feature.layout === 'kpi-hero' ? 'goal-tracking' : feature.icon
        const variant = feature.variant || 'default'

        return (
          <button
            key={`${feature.id}-${feature.variant || 'default'}`}
            onClick={() => onActivate(globalIdx)}
            onMouseEnter={() => onHover(globalIdx)}
            onMouseLeave={onHoverEnd}
            style={{ animationDelay: `${i * 50}ms` }}
            className={`relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out cursor-pointer group animate-card-enter ${colSpan} ${rowSpan} ${variantClasses(variant, isActive, isHovered)}`}
            aria-pressed={isActive}
            aria-label={`${feature.title} — ${feature.description}`}
          >
            <div className="p-5 md:p-6 flex flex-col h-full">
              <LayoutTemplate
                feature={feature}
                isActive={isActive}
                isHovered={isHovered}
                mockupType={mockupType}
                mockupSize={mockupSize}
                onActivate={onActivate}
                globalIdx={globalIdx}
                dark={variant === 'dark'}
              />
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
      <div className="col-span-1 row-span-2" />
    </div>
  )
}

function LayoutTemplate({ feature, isActive, isHovered, mockupType, mockupSize, dark }) {
  switch (feature.layout) {
    case 'chart-first':
      return <ChartFirstLayout feature={feature} isActive={isActive} isHovered={isHovered} mockupType={mockupType} mockupSize={mockupSize} dark={dark} />
    case 'split':
      return <SplitLayout feature={feature} isActive={isActive} isHovered={isHovered} mockupType={mockupType} mockupSize={mockupSize} dark={dark} />
    case 'kpi-hero':
      return <KpiHeroLayout feature={feature} isActive={isActive} isHovered={isHovered} mockupType={mockupType} mockupSize={mockupSize} dark={dark} />
    default:
      return <DefaultLayout feature={feature} isActive={isActive} isHovered={isHovered} mockupType={mockupType} mockupSize={mockupSize} dark={dark} />
  }
}

function DefaultLayout({ feature, isActive, isHovered, mockupType, mockupSize, dark }) {
  return (
    <>
      <TopBar feature={feature} isActive={isActive} isHovered={isHovered} dark={dark} />
      {feature.kpis && isActive && <KpiRow kpis={feature.kpis} />}
      <div className={`mt-auto transition-all duration-500 ease-out ${
        isActive ? 'opacity-100 scale-100' : isHovered ? 'opacity-80 scale-[1.02]' : 'opacity-50 scale-100 group-hover:opacity-80 group-hover:scale-[1.02]'
      }`}>
        <FeatureMockup type={mockupType} isActive={isActive} size={mockupSize} />
      </div>
    </>
  )
}

function ChartFirstLayout({ feature, isActive, isHovered, mockupType, mockupSize, dark }) {
  return (
    <>
      <div className={`mb-2 transition-all duration-500 ease-out ${
        isActive ? 'opacity-100 scale-100' : isHovered ? 'opacity-80 scale-[1.02]' : 'opacity-50 scale-100 group-hover:opacity-80 group-hover:scale-[1.02]'
      }`}>
        <FeatureMockup type={mockupType} isActive={isActive} size={mockupSize} dark={dark} />
      </div>
      <TopBar feature={feature} isActive={isActive} isHovered={isHovered} dark={dark} />
      {feature.kpis && isActive && <KpiRow kpis={feature.kpis} />}
    </>
  )
}

function SplitLayout({ feature, isActive, isHovered, mockupType, mockupSize, dark }) {
  return (
    <div className="flex gap-4 h-full">
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FeatureIcon icon={feature.icon} isActive={isActive} isHovered={isHovered} size={feature.size} />
            <h3 className={`font-heading font-bold leading-snug transition-colors ${
              feature.size === 'lg' ? 'text-lg md:text-xl' : feature.size === 'md' ? 'text-base' : 'text-sm'
            } ${isActive ? 'text-teal' : isHovered ? 'text-teal' : dark ? 'text-powder' : 'text-noir'}`}>
              {feature.title}
            </h3>
          </div>
          <p className={`text-[11px] leading-relaxed mt-1 line-clamp-2 ${dark ? 'text-powder/50' : 'text-noir/70'}`}>{feature.description}</p>
        </div>
        {feature.kpis && isActive && <KpiRow kpis={feature.kpis} />}
      </div>
      <div className={`w-1/2 shrink-0 transition-all duration-500 ease-out ${
        isActive ? 'opacity-100 scale-100' : isHovered ? 'opacity-80 scale-[1.02]' : 'opacity-50 scale-100 group-hover:opacity-80 group-hover:scale-[1.02]'
      }`}>
        <FeatureMockup type={mockupType} isActive={isActive} size={mockupSize} />
      </div>
    </div>
  )
}

function KpiHeroLayout({ feature, isActive, isHovered, mockupType, mockupSize, dark }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <FeatureIcon icon={feature.icon} isActive={isActive} isHovered={isHovered} size={feature.size} dark={dark} />
          <h3 className={`font-heading font-bold leading-snug transition-colors ${
            feature.size === 'lg' ? 'text-lg md:text-xl' : feature.size === 'md' ? 'text-base' : 'text-sm'
          } ${isActive ? 'text-teal' : isHovered ? 'text-teal' : dark ? 'text-powder' : 'text-noir'}`}>
            {feature.title}
          </h3>
        </div>
        <StatusBadge feature={feature} isActive={isActive} />
      </div>
      {feature.kpis && (
        <div className="flex gap-4 my-2">
          {feature.kpis.map((kpi, ki) => (
            <div key={ki} className="flex-1 bg-gradient-to-br from-yellow/10 to-orange/5 rounded-xl px-3 py-2 border border-yellow/10">
              <span className="text-[9px] text-noir/70 font-medium block">{kpi.label}</span>
              <span className="text-2xl font-bold font-heading text-teal count-up" style={{ animationDelay: `${ki * 0.15}s` }}>{kpi.value}</span>
            </div>
          ))}
        </div>
      )}
      <div className={`mt-auto transition-all duration-500 ease-out ${
        isActive ? 'opacity-100 scale-100' : isHovered ? 'opacity-80 scale-[1.02]' : 'opacity-50 scale-100 group-hover:opacity-80 group-hover:scale-[1.02]'
      }`}>
        <FeatureMockup type={mockupType} isActive={isActive} size={mockupSize} />
      </div>
    </>
  )
}

function TopBar({ feature, isActive, isHovered, dark }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-3 min-w-0">
        <FeatureIcon icon={feature.icon} isActive={isActive} isHovered={isHovered} size={feature.size} dark={dark} />
        <div>
          <h3 className={`font-heading font-bold leading-snug transition-colors ${
            feature.size === 'lg' ? 'text-lg md:text-xl' : feature.size === 'md' ? 'text-base' : 'text-sm'
          } ${isActive ? 'text-teal' : isHovered ? 'text-teal' : dark ? 'text-powder' : 'text-noir'}`}>
            {feature.title}
          </h3>
          {feature.size !== 'sm' && (
            <p className={`text-[11px] md:text-xs leading-relaxed mt-1 max-w-md ${dark ? 'text-powder/50' : 'text-noir/70'}`}>{feature.description}</p>
          )}
        </div>
      </div>
      <StatusBadge feature={feature} isActive={isActive} dark={dark} />
    </div>
  )
}

function StatusBadge({ feature, isActive, dark }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      {feature.status && (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold font-heading tracking-wider ${dark ? 'bg-white/10' : ''}`}
          style={{ backgroundColor: dark ? undefined : `${feature.statusColor}15`, color: feature.statusColor }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feature.statusColor }} />
          {feature.status}
        </span>
      )}
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-yellow shrink-0 animate-pulse" />
      )}
    </div>
  )
}

function KpiRow({ kpis }) {
  return (
    <div className="flex gap-3 mb-2 count-up">
      {kpis.map((kpi, ki) => (
        <div key={ki} className="bg-gradient-to-r from-yellow/5 to-orange/5 rounded-lg px-2.5 py-1.5 border border-yellow/10" style={{ animationDelay: `${ki * 0.1}s` }}>
          <span className="text-[9px] text-noir/70 font-medium">{kpi.label}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold font-heading text-teal">{kpi.value}</span>
            {kpi.trend && <span className="text-[9px] font-semibold text-orange">{kpi.trend}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

function FeatureIcon({ icon, isActive, isHovered, size = 'sm', dark }) {
  const IconComponent = iconMap[icon] || ChartPie
  const color = isActive || isHovered ? '#FFC801' : dark ? '#F1F6F4' : '#114C5A'
  const bg = isActive
    ? 'rgba(255, 200, 1, 0.12)'
    : isHovered
      ? 'rgba(255, 200, 1, 0.08)'
      : dark
        ? 'rgba(241, 246, 244, 0.1)'
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
                : 'bg-[#EEF3F0] border-yellow/5'
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
                <p className="text-sm text-noir/75 leading-relaxed mb-4">{feature.description}</p>
                <FeatureMockup type={feature.layout === 'kpi-hero' ? 'goal-tracking' : feature.icon} size="md" isActive={isOpen} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
