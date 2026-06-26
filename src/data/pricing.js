export const pricingMatrix = {
  annualDiscount: 0.2,
  basePrices: {
    starter: { USD: 12, INR: 999, EUR: 11 },
    growth: { USD: 29, INR: 2499, EUR: 27 },
    enterprise: { USD: 79, INR: 6999, EUR: 74 },
  },
  regionalMultipliers: {
    USD: { multiplier: 1.0, label: 'United States' },
    INR: { multiplier: 1.0, label: 'India' },
    EUR: { multiplier: 1.05, label: 'Europe' },
  },
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Essential AI-powered insights to understand your business health and start making data-driven decisions.',
      features: [
        'AI Business Health Score',
        'Smart Insights (basic)',
        'Monthly performance reports',
        'Up to 3 data sources',
        '7-day data history',
        'Email support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      id: 'growth',
      name: 'Growth',
      description: 'Advanced analytics and automation for growing teams that need deeper insights and more control.',
      features: [
        'Everything in Starter',
        'Revenue Forecasting',
        'Risk Detection',
        'Workflow Automation (5 workflows)',
        'AI Business Assistant',
        'Up to 10 data sources',
        '30-day data history',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Full platform power with unlimited scalability, custom integrations, and dedicated support for large organizations.',
      features: [
        'Everything in Growth',
        'Unlimited workflows & data sources',
        'Custom integrations & API access',
        'Personalized Recommendations',
        'Goal & Performance Tracking',
        'Unlimited data history',
        'Dedicated account manager',
        'SLA guarantee & 24/7 support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ],
}

export function getPrice(planId, currencyCode, annual) {
  const plan = pricingMatrix.basePrices[planId]
  if (!plan) return 0

  const basePrice = plan[currencyCode] || plan.USD
  const multiplier = pricingMatrix.regionalMultipliers[currencyCode]?.multiplier || 1
  const adjusted = basePrice * multiplier

  if (annual) {
    return adjusted * 12 * (1 - pricingMatrix.annualDiscount)
  }
  return adjusted
}

export function getPeriodLabel(annual) {
  return annual ? '/year' : '/month'
}

export const currencies = [
  { code: 'USD', symbol: '$', label: 'US Dollar', locale: 'en-US' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee', locale: 'en-IN' },
  { code: 'EUR', symbol: '€', label: 'Euro', locale: 'de-DE' },
]
