import { useRef, useEffect } from 'react'

const variants = {
  primary:
    'bg-yellow text-noir font-semibold border-yellow hover:bg-[#E8B400] hover:shadow-lg hover:shadow-yellow/20 active:scale-[0.98]',
  secondary:
    'bg-transparent text-white font-medium border-white/20 hover:bg-white/10 hover:border-white/40 active:scale-[0.98]',
  'secondary-dark':
    'bg-transparent text-noir font-medium border-mint/60 hover:bg-mint/30 hover:border-mint active:scale-[0.98]',
  ghost:
    'bg-transparent text-white/80 font-medium border-transparent hover:bg-white/10 active:scale-[0.98]',
  'ghost-dark':
    'bg-transparent text-noir/60 font-medium border-transparent hover:bg-mint/30 active:scale-[0.98]',
  gradient:
    'bg-gradient-to-r from-yellow via-yellow to-orange bg-[length:200%] bg-[position:0%] hover:bg-[position:100%] text-noir font-semibold border-none hover:shadow-xl hover:shadow-yellow/25 hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98]',
}

const sizes = {
  sm: 'px-4 py-2 text-xs gap-1.5 rounded-xl',
  md: 'px-6 py-3 text-sm gap-2 rounded-2xl',
  lg: 'px-8 py-4 text-base gap-2.5 rounded-2xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  magnetic,
  ...rest
}) {
  const btnRef = useRef(null)
  const magnetRef = useRef(null)

  useEffect(() => {
    if (!magnetic) return
    const el = magnetRef.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const dist = Math.sqrt(x * x + y * y)
      if (dist < 120) {
        const s = 1 - dist / 120
        el.style.transform = `translate(${x * 0.25 * s}px, ${y * 0.25 * s}px)`
      } else {
        el.style.transform = ''
      }
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [magnetic])

  const handleClick = (e) => {
    const btn = btnRef.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      btn.style.setProperty('--x', `${x}%`)
      btn.style.setProperty('--y', `${y}%`)
    }
    onClick?.(e)
  }

  const base =
    'btn-ripple inline-flex items-center justify-center cursor-pointer select-none transition-all duration-200 ease-out no-underline border'

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={btnRef}
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      <span ref={magnetRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit', transition: 'transform 0.1s ease-out' }}>
        {children}
      </span>
    </Tag>
  )
}
