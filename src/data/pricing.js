export const plans = [
  {
    name: 'Starter',
    description: 'Essential AI-powered insights to understand your business health and start making data-driven decisions.',
    monthly: { USD: 12, INR: 999, EUR: 11 },
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
    name: 'Growth',
    description: 'Advanced analytics and automation for growing teams that need deeper insights and more control.',
    monthly: { USD: 29, INR: 2499, EUR: 27 },
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
    name: 'Enterprise',
    description: 'Full platform power with unlimited scalability, custom integrations, and dedicated support for large organizations.',
    monthly: { USD: 79, INR: 6999, EUR: 74 },
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
]

export const currencies = [
  { code: 'USD', symbol: '$', label: 'US Dollar', locale: 'en-US' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee', locale: 'en-IN' },
  { code: 'EUR', symbol: '€', label: 'Euro', locale: 'de-DE' },
]
