import { useState, useMemo, memo } from 'react'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'
import { useInView } from '../hooks/useInView'
import { pricingMatrix, getPrice, getPeriodLabel, currencies } from '../data/pricing'

const PriceDisplay = memo(function PriceDisplay({ amount, currency, annual, period }) {
  const formatted = useMemo(() => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount))
  }, [amount, currency.code, currency.locale])

  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-1">
        <span key={`${annual}-${currency.code}`} className="font-heading text-4xl md:text-5xl font-extrabold text-noir animate-price-enter">
          {formatted}
        </span>
        <span className="text-sm text-noir/70">{period}</span>
      </div>
      {annual && (
        <p className="text-xs text-noir/60 mt-1">
          {(amount / 12).toLocaleString(currency.locale, {
            style: 'currency',
            currency: currency.code,
            minimumFractionDigits: 0,
          })}
          /month billed annually
        </p>
      )}
    </div>
  )
})

const PricingCard = memo(function PricingCard({ plan, price, currency, annual, period }) {
  return (
    <div
      className={`relative rounded-3xl border p-8 flex flex-col transition-all duration-300 ${
        plan.popular
          ? 'border-yellow bg-white shadow-2xl shadow-yellow/15'
          : 'border-mint bg-white hover:border-yellow/50 hover:shadow-xl'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="font-heading text-[11px] font-bold uppercase tracking-wider px-5 py-1.5 rounded-full bg-gradient-to-r from-yellow to-orange text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-heading text-lg font-bold text-noir mb-1">{plan.name}</h3>
        <p className="text-sm text-noir/70 leading-relaxed">{plan.description}</p>
      </div>

      <PriceDisplay amount={price} currency={currency} annual={annual} period={period} />

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-noir/75">{feat}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button variant={plan.popular ? 'primary' : 'secondary-dark'} className="w-full">
          {plan.cta}
        </Button>
      </div>
    </div>
  )
})

function CurrencyToggle({ currencyCode, onChange }) {
  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-mint">
      {currencies.map((c) => (
        <button
          key={c.code}
          onClick={() => onChange(c.code)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
            currencyCode === c.code
              ? 'bg-yellow text-noir shadow-sm'
              : 'text-noir/70 hover:text-noir hover:bg-mint/30'
          }`}
          aria-label={`Switch to ${c.label}`}
          aria-selected={currencyCode === c.code}
          role="tab"
        >
          {c.code}
        </button>
      ))}
    </div>
  )
}

function BillingToggle({ annual, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`text-sm font-medium transition-colors ${!annual ? 'text-noir' : 'text-noir/70'}`}>
        Monthly
      </span>
      <button
        onClick={() => onChange(!annual)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
          annual ? 'bg-yellow' : 'bg-mint'
        }`}
        aria-label="Toggle annual billing"
        role="switch"
        aria-checked={annual}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            annual ? 'translate-x-6' : ''
          }`}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${annual ? 'text-noir' : 'text-noir/70'}`}>
        Annual
      </span>
      <span className="text-[11px] font-heading font-semibold text-yellow bg-yellow/10 px-2.5 py-1 rounded-full">
        Save 20%
      </span>
    </div>
  )
}

export default function Pricing() {
  const [currencyCode, setCurrencyCode] = useState('USD')
  const [annual, setAnnual] = useState(false)
  const [ref, inView] = useInView()

  const currency = useMemo(
    () => currencies.find((c) => c.code === currencyCode) || currencies[0],
    [currencyCode]
  )

  const cards = useMemo(
    () =>
      pricingMatrix.plans.map((plan) => ({
        ...plan,
        price: getPrice(plan.id, currencyCode, annual),
      })),
    [currencyCode, annual]
  )

  const period = getPeriodLabel(annual)

  return (
    <section id="pricing" className="py-20 md:py-28 bg-powder" ref={ref} style={{ contentVisibility: 'auto' }}>
      <Container>
        <SectionHeading
          label="Pricing"
          title="Plans that grow with you. Not the other way around."
          description="Start with what you need. Add as you grow. No hidden fees."
        />

        <div className={`flex flex-col items-center gap-6 mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <CurrencyToggle currencyCode={currencyCode} onChange={setCurrencyCode} />
          <BillingToggle annual={annual} onChange={setAnnual} />
        </div>

        <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cards.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              price={plan.price}
              currency={currency}
              annual={annual}
              period={period}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
