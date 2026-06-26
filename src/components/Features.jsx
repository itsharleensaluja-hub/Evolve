import { useState, useCallback } from 'react'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import FeatureMockup from './FeatureMockup'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useInView } from '../hooks/useInView'
import { features } from '../data/features'
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

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [ref, inView] = useInView()

  return (
    <section id="features" className="py-20 md:py-28 bg-powder" ref={ref}>
      <Container>
        <SectionHeading
          label="Features"
          title="Intelligence that scales with you"
          description="Eight powerful AI modules working together to analyze, predict, and automate your business operations."
        />

        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {isDesktop ? (
            <BentoGrid features={features} activeIndex={activeIndex} onActivate={setActiveIndex} />
          ) : (
            <AccordionView features={features} activeIndex={activeIndex} onActivate={setActiveIndex} />
          )}
        </div>
      </Container>
    </section>
  )
}

function BentoGrid({ features, activeIndex, onActivate }) {
  return (
    <div className="grid grid-cols-4 gap-4 auto-rows-[140px]">
      {features.map((feature, i) => {
        const isActive = activeIndex === i
        const isLarge = i === 0 || i === 4
        const colSpan = isLarge ? 'col-span-2' : 'col-span-1'
        const rowSpan = isLarge ? 'row-span-2' : 'row-span-1'

        return (
          <button
            key={feature.id}
            onClick={() => onActivate(i)}
            className={`relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out cursor-pointer group ${colSpan} ${rowSpan}
              ${isActive
                ? 'bg-white border-yellow shadow-xl shadow-yellow/10'
                : 'bg-white border-mint hover:border-yellow/50 hover:shadow-lg hover:-translate-y-0.5'
              }`}
          >
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-start gap-3 mb-3">
                <FeatureIcon icon={feature.icon} isActive={isActive} />
                <div className="min-w-0 flex-1">
                  <h3 className={`text-sm font-bold leading-snug mb-1 transition-colors ${
                    isActive ? 'text-teal' : 'text-noir'
                  }`}>
                    {feature.title}
                  </h3>
                  {!isLarge && (
                    <p className="text-xs text-noir/50 leading-relaxed line-clamp-2">
                      {feature.description}
                    </p>
                  )}
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow mt-1.5 shrink-0" />
                )}
              </div>
              {isLarge && (
                <p className="text-xs text-noir/50 leading-relaxed mb-3 line-clamp-2">
                  {feature.description}
                </p>
              )}
              <div className={`mt-auto transition-all duration-300 ${
                isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'
              }`}>
                <FeatureMockup type={feature.icon} className="h-12" />
              </div>
            </div>
            <div
              className={`absolute inset-x-0 bottom-0 h-0.5 transition-all duration-500 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ background: 'linear-gradient(90deg, #FFC801, #FF9932)' }}
            />
          </button>
        )
      })}
    </div>
  )
}

function AccordionView({ features, activeIndex, onActivate }) {
  return (
    <div className="flex flex-col gap-3">
      {features.map((feature, i) => {
        const isOpen = activeIndex === i

        return (
          <div
            key={feature.id}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'bg-white border-yellow shadow-lg shadow-yellow/10'
                : 'bg-white border-mint'
            }`}
          >
            <button
              onClick={() => onActivate(isOpen ? -1 : i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <FeatureIcon icon={feature.icon} isActive={isActive} />
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-bold leading-snug ${
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
              className={`transition-all duration-400 overflow-hidden ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-4">
                <p className="text-sm text-noir/60 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <FeatureMockup type={feature.icon} className="h-20" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function FeatureIcon({ icon, isActive }) {
  const IconComponent = iconMap[icon] || ChartPie
  const color = isActive ? '#FFC801' : '#114C5A'

  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
      style={{
        backgroundColor: isActive ? 'rgba(255, 200, 1, 0.12)' : 'rgba(17, 76, 90, 0.08)',
      }}
    >
      <IconComponent color={color} />
    </div>
  )
}
