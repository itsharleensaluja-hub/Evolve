import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Timeline from './components/Timeline'
import HealthScoreGauge from './components/HealthScoreGauge'
import DashboardPreview from './components/DashboardPreview'
import ScenarioSimulator from './components/ScenarioSimulator'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { useInView } from './hooks/useInView'

function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${width}%` }} aria-hidden="true" />
}

function Loader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 900)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="loader" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <svg width="48" height="48" viewBox="0 0 36 36" fill="none" className="loader-logo">
          <rect x="2" y="2" width="32" height="32" rx="8" fill="none" stroke="#FFC801" strokeWidth="2" />
          <path d="M10 10h10a4 4 0 0 1 0 8h-4m-6-8v16m0-8h8a4 4 0 0 1 4 4v4" stroke="#FFC801" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M22 26l6-6m0 0h-4m4 0v4" stroke="#FF9932" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </div>
  )
}

function StepConnector({ label }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="flex flex-col items-center py-8 md:py-12 transition-all duration-700"
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(12px)' }}>
      <div className="w-px h-12 bg-gradient-to-b from-yellow to-transparent" />
      <span className="text-[10px] font-heading font-semibold tracking-[0.25em] uppercase text-yellow mt-4">
        {label}
      </span>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />
        <StepConnector label="Connect" />
        <Features />
        <StepConnector label="Understand" />
        <Timeline />
        <StepConnector label="Predict" />
        <HealthScoreGauge />
        <StepConnector label="Act" />
        <DashboardPreview />
        <StepConnector label="Evolve" />
        <ScenarioSimulator />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
