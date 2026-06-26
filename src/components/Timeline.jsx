import Container from './ui/Container'
import { milestones } from '../data/timeline'
import { useInView } from '../hooks/useInView'
import { useWaapiAnimation } from '../hooks/useWaapiAnimation'
import { useReducedMotion } from '../hooks/useReducedMotion'

const iconPaths = {
  link: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
  search: 'M11 11a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M21 21l-4.35-4.35',
  'arrow-path': 'M21 12a9 9 0 1 1-6.219-8.56 M21 3v6h-6',
  'arrow-trending-up': 'M22 7l-8.5 8.5-5-5L2 17 M16 7h6v6',
}

export default function Timeline() {
  const [ref, inView] = useInView()
  const reduced = useReducedMotion()
  const containerRef = useWaapiAnimation(
    [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 600, delay: reduced ? 0 : 100, fill: 'forwards' },
    [inView, reduced]
  )

  return (
    <section id="timeline" className="py-20 md:py-28 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-dot-grid opacity-60" />

      <Container className="relative z-10">
        <div ref={containerRef} className="lg:flex lg:items-start lg:gap-16">
          <div className="lg:w-5/12 mb-12 lg:mb-0 lg:sticky lg:top-28">
            <span className="inline-block font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-yellow mb-4">
              Evolution
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-noir mb-5">
              Connect your data once. Let Evolve keep learning.
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-noir/75 max-w-md">
              Your business changes every day. Your analytics should too.
            </p>
          </div>

          <div className="lg:w-7/12">
            <TimelineRail milestones={milestones} inView={inView} reduced={reduced} />
          </div>
        </div>
      </Container>
    </section>
  )
}

function TimelineRail({ milestones, inView, reduced }) {
  const lineRef = useWaapiAnimation(
    [{ scaleY: 0 }, { scaleY: 1 }],
    { duration: 800, delay: reduced ? 0 : 200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', transformOrigin: 'top center', fill: 'forwards' },
    [inView, reduced]
  )

  return (
    <div className="relative">
      <div
        ref={lineRef}
        className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-yellow via-orange to-teal rounded-full"
        style={{ height: '100%', transformOrigin: 'top center', willChange: 'transform' }}
      />

      <div className="flex flex-col gap-12">
        {milestones.map((m, i) => (
          <TimelineNode key={m.id} milestone={m} index={i} inView={inView} reduced={reduced} />
        ))}
      </div>
    </div>
  )
}

function TimelineNode({ milestone, index, inView, reduced }) {
  const nodeRef = useWaapiAnimation(
    [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 500, delay: reduced ? 0 : 300 + index * 150, fill: 'forwards' },
    [inView, reduced]
  )

  return (
    <div ref={nodeRef} className="relative pl-16" style={{ willChange: 'transform, opacity' }}>
      <div
        className="absolute left-3 top-1 w-6 h-6 rounded-full border-4 bg-white flex items-center justify-center"
        style={{ borderColor: milestone.color }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={milestone.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={iconPaths[milestone.icon]} />
        </svg>
      </div>

      <div className="bg-powder rounded-2xl p-6 border border-mint/60 hover:border-yellow/30 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[10px] font-bold font-heading tracking-wider uppercase px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${milestone.color}15`, color: milestone.color }}
          >
            {milestone.phase}
          </span>
          <span className="text-[10px] text-noir/60 font-heading">{milestone.metric}</span>
        </div>
        <h3 className="font-heading text-base font-bold text-noir mb-2">{milestone.title}</h3>
        <p className="text-sm text-noir/75 leading-relaxed">{milestone.description}</p>
      </div>
    </div>
  )
}
