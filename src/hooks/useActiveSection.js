import { useState, useEffect } from 'react'

const sections = ['hero', 'features', 'pricing', 'testimonials', 'faq', 'cta']

export function useActiveSection() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}
