export const presets = [
  { id: 'growth', label: 'Boost Growth', adSpend: 30, churnReduction: 10, efficiency: 15 },
  { id: 'costs', label: 'Cut Costs', adSpend: -15, churnReduction: 25, efficiency: 40 },
  { id: 'balanced', label: 'Balanced', adSpend: 15, churnReduction: 15, efficiency: 25 },
]

const baseline = { revenue: 384200, costs: 228000, profit: 156200 }

export function computeImpact(params) {
  const revenueImpact = baseline.revenue * (1 + params.adSpend * 0.003 + params.churnReduction * 0.004)
  const costSavings = baseline.costs * (params.efficiency * 0.0025 + params.churnReduction * 0.001)
  const newCosts = baseline.costs - costSavings + baseline.revenue * params.adSpend * 0.0008
  const newProfit = revenueImpact - newCosts
  return {
    revenue: Math.round(revenueImpact),
    costs: Math.round(newCosts),
    profit: Math.round(newProfit),
  }
}

export { baseline }
