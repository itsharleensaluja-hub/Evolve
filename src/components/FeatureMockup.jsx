export default function FeatureMockup({ type, className = '', isActive = false, size = 'sm' }) {
  const height = size === 'lg' ? 'h-32' : size === 'md' ? 'h-28' : 'h-24'

  const mockups = {
    'chart-pie': (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
        <rect width="200" height="120" rx="6" fill="#F1F6F4" />
        <rect x="144" y="6" width="50" height="18" rx="4" fill="#10B981" opacity="0.15" />
        <text x="152" y="17" fill="#10B981" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">LIVE</text>
        <circle cx="60" cy="55" r="28" fill="#FFC801" opacity="0.08" />
        <path d="M60 27 A28 28 0 1 1 36 68 L60 55 Z" fill="#FFC801" opacity="0.7" />
        <path d="M60 55 L36 68 A28 28 0 0 1 80 38 Z" fill="#114C5A" opacity="0.4" />
        <path d="M60 55 L80 38 A28 28 0 0 1 88 55 Z" fill="#FF9932" opacity="0.5" />
        <text x="60" y="52" fill="#172B36" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono" textAnchor="middle">87</text>
        <text x="60" y="63" fill="#114C5A" fontSize="7" fontFamily="Inter" textAnchor="middle">/100</text>
        <rect x="108" y="48" width="80" height="20" rx="4" fill="#FFC801" opacity="0.08" />
        <text x="114" y="56" fill="#FF9932" fontSize="8" fontWeight="600" fontFamily="Inter">Revenue</text>
        <text x="114" y="65" fill="#172B36" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono">$128.4k</text>
        <rect x="108" y="74" width="80" height="20" rx="4" fill="#114C5A" opacity="0.06" />
        <text x="114" y="82" fill="#114C5A" fontSize="8" fontWeight="600" fontFamily="Inter">Cash Flow</text>
        <text x="114" y="91" fill="#FFC801" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono">+$34.2k</text>
        <rect x="16" y="96" width="80" height="18" rx="6" fill="#FFC801" opacity="0.12" />
        <rect x="16" y="96" width="56" height="18" rx="6" fill="#FFC801" className="animated-bar" style={{ animationDelay: '0.3s' }} />
        <text x="22" y="107" fill="white" fontSize="7" fontWeight="700" fontFamily="Inter">↑ 12.5% this month</text>
      </svg>
    ),
    search: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
        <rect width="200" height="120" rx="6" fill="#F1F6F4" />
        <rect x="144" y="6" width="50" height="18" rx="4" fill="#FFC801" opacity="0.15" />
        <text x="152" y="17" fill="#FFC801" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">AI</text>
        <rect x="12" y="34" width="176" height="24" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <text x="22" y="50" fill="#114C5A" fontSize="9" fontFamily="Inter">What happened this week?</text>
        <svg x="176" y="38" width="8" height="16" viewBox="0 0 24 24" fill="none" stroke="#114C5A" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <rect x="12" y="64" width="176" height="22" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <circle cx="24" cy="75" r="5" fill="#FFC801" />
        <text x="24" y="78" fill="white" fontSize="6" fontWeight="700" fontFamily="Inter" textAnchor="middle">AI</text>
        <text x="36" y="78" fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">Revenue up 12.5% — best month this year</text>
        <rect x="12" y="90" width="176" height="22" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <circle cx="24" cy="101" r="5" fill="#FF9932" />
        <text x="36" y="101" fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">Churn risk rising — support response +40%</text>
        <rect x="12" y="90" width="176" height="22" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
      </svg>
    ),
    'arrow-trending-up': (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
        <rect width="200" height="120" rx="6" fill="#F1F6F4" />
        <rect x="144" y="6" width="50" height="18" rx="4" fill="#FF9932" opacity="0.15" />
        <text x="150" y="17" fill="#FF9932" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">FORECAST</text>
        <rect x="12" y="32" width="176" height="20" rx="4" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <text x="20" y="44" fill="#114C5A" fontSize="8" fontFamily="Inter">Projected Q4 revenue</text>
        <text x="150" y="44" fill="#172B36" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">+$1.2M</text>
        <rect x="12" y="58" width="176" height="52" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <text x="22" y="74" fill="#114C5A" fontSize="8" fontWeight="600" fontFamily="Inter">Actual</text>
        <rect x="22" y="79" width="4" height="24" rx="2" fill="#FFC801" className="animated-bar" style={{ animationDelay: '0.1s' }} />
        <rect x="34" y="72" width="4" height="31" rx="2" fill="#FFC801" className="animated-bar" style={{ animationDelay: '0.2s' }} />
        <rect x="46" y="84" width="4" height="19" rx="2" fill="#FFC801" className="animated-bar" style={{ animationDelay: '0.3s' }} />
        <rect x="58" y="68" width="4" height="35" rx="2" fill="#FFC801" className="animated-bar" style={{ animationDelay: '0.4s' }} />
        <rect x="70" y="60" width="4" height="43" rx="2" fill="#FFC801" className="animated-bar" style={{ animationDelay: '0.5s' }} />
        <text x="110" y="74" fill="#114C5A" fontSize="8" fontWeight="600" fontFamily="Inter">Forecast</text>
        <rect x="110" y="70" width="4" height="33" rx="2" fill="#FF9932" opacity="0.5" className="animated-bar" style={{ animationDelay: '0.6s' }} />
        <rect x="122" y="62" width="4" height="41" rx="2" fill="#FF9932" opacity="0.5" className="animated-bar" style={{ animationDelay: '0.7s' }} />
        <rect x="134" y="54" width="4" height="49" rx="2" fill="#FF9932" opacity="0.5" className="animated-bar" style={{ animationDelay: '0.8s' }} />
        <rect x="146" y="48" width="4" height="55" rx="2" fill="#FF9932" opacity="0.5" className="animated-bar" style={{ animationDelay: '0.9s' }} />
        <rect x="158" y="42" width="4" height="61" rx="2" fill="#FF9932" opacity="0.5" className="animated-bar" style={{ animationDelay: '1s' }} />
        <text x="22" y="100" fill="#114C5A" fontSize="6" fontFamily="Inter">Jul</text>
        <text x="46" y="100" fill="#114C5A" fontSize="6" fontFamily="Inter">Aug</text>
        <text x="68" y="100" fill="#114C5A" fontSize="6" fontFamily="Inter">Sep</text>
        <text x="118" y="100" fill="#114C5A" fontSize="6" fontFamily="Inter">Oct</text>
        <text x="146" y="100" fill="#114C5A" fontSize="6" fontFamily="Inter">Nov</text>
        <text x="158" y="100" fill="#114C5A" fontSize="6" fontFamily="Inter">Dec</text>
        <rect x="22" y="104" width="70" height="10" rx="4" fill="#FFC801" opacity="0.12" />
        <text x="26" y="112" fill="#FF9932" fontSize="7" fontWeight="700" fontFamily="Inter">94% forecast accuracy</text>
      </svg>
    ),
    cog: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
        <rect width="200" height="120" rx="6" fill="#F1F6F4" />
        <rect x="144" y="6" width="50" height="18" rx="4" fill="#EF4444" opacity="0.15" />
        <text x="152" y="17" fill="#EF4444" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">ALERT</text>
        {[
          { title: 'Churn risk — 3 customers', desc: 'Support response +40%', delay: 0 },
          { title: 'Inventory low — 5 products', desc: 'Reorder needed this week', delay: 0.15 },
          { title: 'Payment failures — 12', desc: 'Total: $4,280 at risk', delay: 0.3 },
        ].map((item, i) => {
          const y = 34 + i * 28
          return (
            <g key={i}>
              <rect x="12" y={y} width="176" height="24" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
              <circle cx="24" cy={y + 12} r="4" fill="#EF4444" className="pulse-dot" style={{ animationDelay: `${item.delay}s` }} />
              <text x="36" y={y + 9} fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">{item.title}</text>
              <text x="36" y={y + 20} fill="#114C5A" fontSize="7" fontFamily="Inter">{item.desc}</text>
            </g>
          )
        })}
        <rect x="12" y="100" width="176" height="14" rx="6" fill="#FF9932" opacity="0.1" />
        <text x="100" y="110" fill="#FF9932" fontSize="7" fontWeight="700" fontFamily="Inter" textAnchor="middle">3 unresolved alerts — View all →</text>
      </svg>
    ),
    'arrow-path': (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
        <rect width="200" height="120" rx="6" fill="#F1F6F4" />
        <rect x="144" y="6" width="50" height="18" rx="4" fill="#10B981" opacity="0.15" />
        <text x="152" y="17" fill="#10B981" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">LIVE</text>
        <rect x="12" y="36" width="54" height="28" rx="6" fill="#FFC801" opacity="0.15" stroke="#FFC801" strokeWidth="1" />
        <text x="18" y="49" fill="#172B36" fontSize="8" fontWeight="600" fontFamily="Inter">Report</text>
        <text x="18" y="58" fill="#114C5A" fontSize="6" fontFamily="Inter">Generated</text>
        <line x1="66" y1="50" x2="74" y2="50" stroke="#D9E8E2" strokeWidth="1.5" />
        <polygon points="74,47 78,50 74,53" fill="#D9E8E2" />
        <rect x="80" y="36" width="54" height="28" rx="6" fill="#FFC801" opacity="0.25" stroke="#FFC801" strokeWidth="1" />
        <text x="86" y="49" fill="#172B36" fontSize="8" fontWeight="600" fontFamily="Inter">Slack</text>
        <text x="86" y="58" fill="#114C5A" fontSize="6" fontFamily="Inter">Notified</text>
        <line x1="134" y1="50" x2="142" y2="50" stroke="#D9E8E2" strokeWidth="1.5" />
        <polygon points="142,47 146,50 142,53" fill="#D9E8E2" />
        <rect x="148" y="36" width="40" height="28" rx="6" fill="#FFC801" />
        <text x="152" y="50" fill="white" fontSize="8" fontWeight="700" fontFamily="Inter">Done</text>
        <text x="152" y="58" fill="#FFC801" fontSize="6" fontFamily="Inter" opacity="0.8">✓</text>
        <rect x="12" y="74" width="88" height="20" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <text x="20" y="87" fill="#114C5A" fontSize="8" fontWeight="600" fontFamily="Inter">24 tasks completed today</text>
        <rect x="112" y="74" width="76" height="20" rx="6" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <text x="120" y="87" fill="#114C5A" fontSize="8" fontFamily="Inter">+8 more queued</text>
      </svg>
    ),
    cube: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
        <rect width="200" height="120" rx="6" fill="#F1F6F4" />
        <rect x="144" y="6" width="50" height="18" rx="4" fill="#FFC801" opacity="0.15" />
        <text x="152" y="17" fill="#FFC801" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">AI</text>
        <rect x="12" y="34" width="140" height="22" rx="8" fill="#FFC801" opacity="0.1" />
        <text x="22" y="48" fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">How is Q3 revenue trending?</text>
        <rect x="12" y="62" width="176" height="22" rx="8" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <circle cx="24" cy="73" r="6" fill="#FFC801" />
        <text x="24" y="76" fill="white" fontSize="6" fontWeight="700" fontFamily="Inter" textAnchor="middle">AI</text>
        <text x="36" y="76" fill="#172B36" fontSize="9" fontFamily="Inter">Up 12.5%. Main driver: new enterprise deals.</text>
        <rect x="12" y="88" width="176" height="22" rx="8" fill="white" stroke="#D9E8E2" strokeWidth="1" />
        <circle cx="24" cy="99" r="6" fill="#FFC801" />
        <text x="36" y="99" fill="#172B36" fontSize="9" fontFamily="Inter">Churn up 8%. Suggest: review support SLAs.</text>
        <rect x="150" y="96" width="30" height="12" rx="4" fill="#114C5A" opacity="0.08" />
        <text x="154" y="104" fill="#114C5A" fontSize="6" fontFamily="Inter">2/3</text>
      </svg>
    ),
    link: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
        <rect width="200" height="120" rx="6" fill="#F1F6F4" />
        <rect x="144" y="6" width="50" height="18" rx="4" fill="#FFC801" opacity="0.15" />
        <text x="152" y="17" fill="#FFC801" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">AI</text>
        {[
          { title: 'Optimize ad spend', desc: 'Reduce CAC by 15%' },
          { title: 'Upsell opportunity', desc: '5 customers ready' },
          { title: 'Reduce churn rate', desc: 'Proactive outreach plan' },
        ].map((item, i) => {
          const y = 34 + i * 26
          return (
            <g key={i}>
              <rect x="12" y={y} width="176" height="22" rx="5" fill="white" stroke="#D9E8E2" strokeWidth="1" />
              <rect x="16" y={y + 4} width="3" height="14" rx="1" fill={i === 0 ? '#FFC801' : i === 1 ? '#FF9932' : '#114C5A'} />
              <text x="26" y={y + 9} fill="#172B36" fontSize="9" fontWeight="600" fontFamily="Inter">{item.title}</text>
              <text x="26" y={y + 19} fill="#114C5A" fontSize="7" fontFamily="Inter">{item.desc}</text>
              <circle cx="175" cy={y + 11} r="4" fill="#FFC801" opacity="i === 0 ? 1 : 0.3" />
            </g>
          )
        })}
        <rect x="12" y="100" width="176" height="14" rx="6" fill="#FFC801" opacity="0.12" />
        <text x="100" y="110" fill="#FF9932" fontSize="7" fontWeight="700" fontFamily="Inter" textAnchor="middle">View all 8 recommendations →</text>
      </svg>
    ),
  }

  return (
    <div className={`overflow-hidden rounded-lg ${height} ${className}`}>
      {mockups[type] || mockups['chart-pie']}
    </div>
  )
}
