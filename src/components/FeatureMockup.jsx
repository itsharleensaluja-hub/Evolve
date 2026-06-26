export default function FeatureMockup({ type, className = '' }) {
  const mockups = {
    'chart-pie': (
      <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
        <rect width="200" height="80" rx="6" fill="#F1F6F4" />
        <path d="M100 40 A30 30 0 1 1 130 20 L100 40 Z" fill="#FFC801" opacity="0.8" />
        <path d="M100 40 L130 20 A30 30 0 0 1 140 50 Z" fill="#114C5A" opacity="0.6" />
        <path d="M100 40 L140 50 A30 30 0 0 1 80 68 Z" fill="#FF9932" opacity="0.7" />
        <text x="100" y="44" fill="#172B36" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono" textAnchor="middle">42%</text>
        <text x="20" y="68" fill="#114C5A" fontSize="8" fontFamily="Inter">Revenue breakdown</text>
      </svg>
    ),
    search: (
      <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
        <rect width="200" height="80" rx="6" fill="#F1F6F4" />
        <rect x="16" y="16" width="120" height="22" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <text x="26" y="31" fill="#114C5A" fontSize="9" fontFamily="Inter">Search metrics...</text>
        <circle cx="128" cy="27" r="5" fill="none" stroke="#D9E8E2" strokeWidth="1.5" />
        <line x1="131" y1="31" x2="136" y2="36" stroke="#D9E8E2" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="16" y="44" width="168" height="24" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <text x="24" y="58" fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">Revenue growth ↑12.5%</text>
        <text x="152" y="58" fill="#FFC801" fontSize="8" fontFamily="Inter">Insight</text>
      </svg>
    ),
    'arrow-trending-up': (
      <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
        <rect width="200" height="80" rx="6" fill="#F1F6F4" />
        <polyline points="20,60 50,50 80,55 110,35 140,30 170,25 180,22" stroke="#FFC801" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <polyline points="110,35 140,30 170,25 180,22" stroke="#FF9932" strokeWidth="2" strokeDasharray="4 3" fill="none" strokeLinecap="round" />
        <circle cx="180" cy="22" r="3" fill="#FF9932" />
        <text x="140" y="18" fill="#172B36" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">$128K</text>
        <text x="20" y="74" fill="#114C5A" fontSize="8" fontFamily="Inter">Jul</text>
        <text x="80" y="74" fill="#114C5A" fontSize="8" fontFamily="Inter">Aug</text>
        <text x="140" y="74" fill="#114C5A" fontSize="8" fontFamily="Inter">Sep</text>
        <text x="180" y="74" fill="#114C5A" fontSize="8" fontFamily="Inter">Oct</text>
      </svg>
    ),
    cog: (
      <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
        <rect width="200" height="80" rx="6" fill="#F1F6F4" />
        <rect x="16" y="14" width="168" height="22" rx="6" fill="#EF4444" opacity="0.1" stroke="#EF4444" strokeWidth="1" />
        <rect x="22" y="19" width="6" height="6" rx="1.5" fill="#EF4444" />
        <text x="34" y="28" fill="#EF4444" fontSize="9" fontWeight="600" fontFamily="Inter">Churn Risk: 3 customers</text>
        <rect x="16" y="42" width="168" height="22" rx="6" fill="#FFC801" opacity="0.1" stroke="#FFC801" strokeWidth="1" />
        <rect x="22" y="47" width="6" height="6" rx="1.5" fill="#FFC801" />
        <text x="34" y="56" fill="#FF9932" fontSize="9" fontWeight="600" fontFamily="Inter">Inventory low: 5 products</text>
      </svg>
    ),
    'arrow-path': (
      <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
        <rect width="200" height="80" rx="6" fill="#F1F6F4" />
        <rect x="20" y="22" width="48" height="16" rx="4" fill="#FFC801" opacity="0.2" />
        <text x="28" y="33" fill="#FF9932" fontSize="8" fontWeight="600" fontFamily="Inter">Trigger</text>
        <line x1="68" y1="30" x2="76" y2="30" stroke="#D9E8E2" strokeWidth="1.5" />
        <polygon points="76,27 80,30 76,33" fill="#D9E8E2" />
        <rect x="82" y="22" width="48" height="16" rx="4" fill="#FFC801" opacity="0.4" />
        <text x="90" y="33" fill="#FF9932" fontSize="8" fontWeight="600" fontFamily="Inter">Action</text>
        <line x1="130" y1="30" x2="138" y2="30" stroke="#D9E8E2" strokeWidth="1.5" />
        <polygon points="138,27 142,30 138,33" fill="#D9E8E2" />
        <rect x="144" y="22" width="36" height="16" rx="4" fill="#FFC801" />
        <text x="150" y="33" fill="white" fontSize="8" fontWeight="600" fontFamily="Inter">Done</text>
        <text x="20" y="66" fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">5 active automations</text>
        <text x="120" y="66" fill="#114C5A" fontSize="8" fontFamily="Inter">24 tasks today</text>
      </svg>
    ),
    cube: (
      <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
        <rect width="200" height="80" rx="6" fill="#F1F6F4" />
        <rect x="16" y="12" width="120" height="22" rx="8" fill="#FFC801" opacity="0.12" />
        <text x="24" y="26" fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">How is Q3 revenue trending?</text>
        <rect x="40" y="40" width="144" height="22" rx="8" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <text x="48" y="54" fill="#114C5A" fontSize="9" fontFamily="Inter">Up 12.5%. Main driver: new enterprise...</text>
        <circle cx="24" cy="54" r="5" fill="#FFC801" />
        <text x="24" y="57" fill="white" fontSize="6" fontWeight="700" fontFamily="Inter" textAnchor="middle">AI</text>
      </svg>
    ),
    link: (
      <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
        <rect width="200" height="80" rx="6" fill="#F1F6F4" />
        <rect x="16" y="14" width="168" height="18" rx="4" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <rect x="20" y="17" width="3" height="12" rx="1" fill="#FFC801" />
        <text x="28" y="26" fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">Optimize ad spend — Reduce CAC by 15%</text>
        <rect x="16" y="36" width="168" height="18" rx="4" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <rect x="20" y="39" width="3" height="12" rx="1" fill="#FF9932" />
        <text x="28" y="48" fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">Upsell opportunity — 5 customers ready</text>
        <rect x="16" y="58" width="168" height="14" rx="4" fill="#FFC801" />
        <text x="100" y="68" fill="white" fontSize="8" fontWeight="600" fontFamily="Inter" textAnchor="middle">View all 8 recommendations →</text>
      </svg>
    ),
  }

  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      {mockups[type] || mockups['chart-pie']}
    </div>
  )
}
