export default function Logo({ className = '', showTagline = true, dark = false }) {
  const textColor = dark ? '#172B36' : '#F1F6F4'
  const tagColor = dark ? '#5C6B87' : '#D9E8E2'

  return (
    <a href="#hero" className={`inline-flex items-center gap-3 no-underline group ${className}`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <defs>
          <linearGradient id="logo-stroke" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#114C5A" />
            <stop offset="40%" stopColor="#FFC801" />
            <stop offset="100%" stopColor="#FF9932" />
          </linearGradient>
          <linearGradient id="logo-arrow" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#FFC801" />
            <stop offset="100%" stopColor="#FF9932" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="none" stroke="url(#logo-stroke)" strokeWidth="1.5" />
        <path d="M10 10h10a4 4 0 0 1 0 8h-4m-6-8v16m0-8h8a4 4 0 0 1 4 4v4" stroke="url(#logo-stroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M22 26l6-6m0 0h-4m4 0v4" stroke="url(#logo-arrow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7.5" cy="7.5" r="1" fill="#114C5A" opacity="0.5" />
        <circle cx="12" cy="5" r="1" fill="#FFC801" opacity="0.4" />
        <circle cx="5" cy="12" r="1" fill="#FF9932" opacity="0.35" />
        <circle cx="9.5" cy="10" r="0.6" fill="#FFC801" opacity="0.4" />
        <circle cx="14" cy="4" r="0.6" fill="#114C5A" opacity="0.3" />
        <circle cx="4.5" cy="16" r="0.6" fill="#FFC801" opacity="0.35" />
      </svg>

      <div className="flex flex-col">
        <span
          className="font-heading font-bold text-lg tracking-[0.15em] leading-none"
          style={{ color: textColor }}
        >
          EVOLVE
        </span>
        {showTagline && (
          <span className="text-[9px] font-medium tracking-[0.25em] leading-tight mt-0.5" style={{ color: tagColor }}>
            AI THAT <span className="gradient-text">GROWS WITH YOUR BUSINESS</span>
          </span>
        )}
      </div>
    </a>
  )
}
