export default function Logo({ className = '', showTagline = true, dark = false }) {
  const textColor = dark ? '#172B36' : '#F1F6F4'
  const tagColor = dark ? '#5C6B87' : '#D9E8E2'

  return (
    <a href="#hero" className={`inline-flex items-center gap-3 no-underline group ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 transition-transform duration-300 group-hover:scale-105">
        <defs>
          <linearGradient id="logo-stroke-lg" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#F1F6F4" />
            <stop offset="40%" stopColor="#FFC801" />
            <stop offset="100%" stopColor="#FF9932" />
          </linearGradient>
          <linearGradient id="logo-arrow-lg" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#FFC801" />
            <stop offset="100%" stopColor="#FF9932" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="36" height="36" rx="9" fill="none" stroke="url(#logo-stroke-lg)" strokeWidth="1.8" />
        <path d="M12 12h12a4 4 0 0 1 0 8h-5M12 12v18M12 20h10a4 4 0 0 1 4 4v4" stroke="url(#logo-stroke-lg)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M24 30l7-7m0 0h-5m5 0v5" stroke="url(#logo-arrow-lg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.2" fill="#114C5A" opacity="0.5" />
        <circle cx="14" cy="5.5" r="1.2" fill="#FFC801" opacity="0.4" />
        <circle cx="5.5" cy="14" r="1.2" fill="#FF9932" opacity="0.35" />
      </svg>

      <div className="flex flex-col">
        <span
          className="font-heading font-bold text-xl md:text-2xl tracking-[0.2em] leading-none transition-colors duration-300 group-hover:text-yellow"
          style={{ color: textColor }}
        >
          EVOLVE
        </span>
        {showTagline && (
          <span className="text-[10px] md:text-[11px] font-medium tracking-[0.28em] leading-tight mt-0.5" style={{ color: tagColor }}>
            AI THAT <span className="gradient-text">GROWS WITH YOUR BUSINESS</span>
          </span>
        )}
      </div>
    </a>
  )
}
