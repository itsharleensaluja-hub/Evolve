import { useEffect, useRef, useState } from 'react'

export function useInView({ threshold = 0.08, rootMargin = '0px 0px -40px 0px', keepObserving } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (!keepObserving) {
            observer.unobserve(el)
          }
        } else if (keepObserving) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, keepObserving])

  return [ref, inView]
}
