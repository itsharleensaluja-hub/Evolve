const size = 24
const stroke = 1.5
const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function ArrowTrendingUp({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

export function ChartPie({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  )
}

export function ArrowPath({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  )
}

export function Cube({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <polyline points="21 16 12 21 3 16 3 8 12 3 21 8 21 12" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="3" y1="8" x2="12" y2="12" />
      <line x1="12" y1="12" x2="21" y2="8" />
    </svg>
  )
}

export function Cog({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

export function Search({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function Chevrons({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <polyline points="7 13 12 18 17 13" />
      <polyline points="7 6 12 11 17 6" />
    </svg>
  )
}

export function XMark({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function Link({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

export function ChevronRight({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function ChevronDown({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function Check({ className, color = 'currentColor' }) {
  return (
    <svg {...props} className={className} stroke={color}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function Star({ color = 'currentColor' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function TrendingUp({ className, color = 'currentColor' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}
