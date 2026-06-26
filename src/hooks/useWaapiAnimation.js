import { useEffect, useRef } from 'react'

export function useWaapiAnimation(keyframes, options = {}, deps = []) {
  const ref = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !el.animate) return

    if (animRef.current) animRef.current.cancel()

    animRef.current = el.animate(keyframes, {
      fill: 'forwards',
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      ...options,
    })

    return () => {
      if (animRef.current) animRef.current.cancel()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
