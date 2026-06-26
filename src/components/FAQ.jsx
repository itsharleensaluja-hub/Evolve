import { useState, useRef } from 'react'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import { useInView } from '../hooks/useInView'
import { faqs } from '../data/faq'

function FAQItem({ faq, isOpen, onClick }) {
  const contentRef = useRef(null)

  return (
    <div className="border-b border-mint/60 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left cursor-pointer gap-4"
      >
        <span className="text-sm md:text-base font-semibold text-noir leading-snug">
          {faq.question}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#114C5A"
          strokeWidth="2"
          strokeLinecap="round"
          className={`shrink-0 transition-transform duration-300 ease-out ${isOpen ? 'rotate-45' : ''}`}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 300}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pb-5 md:pb-6">
          <p className="text-sm text-noir/60 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, inView] = useInView()

  return (
    <section id="faq" className="py-20 md:py-28 bg-powder" ref={ref}>
      <Container>
        <SectionHeading
          label="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about Evolve and how it can help your business."
        />

        <div className={`max-w-3xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl border border-mint p-6 md:p-8">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
