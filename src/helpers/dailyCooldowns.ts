import { DAILY_COOLDOWNS } from '../static/dailyCooldowns'
import { RecipeTreeWithCraftFlags } from '../types'

const dailyCooldownIds = DAILY_COOLDOWNS.filter((x) => x.craftInterval === 'daily').map((x) => x.id)

export type DailyCooldownsBreakdown = Record<string, number>

// Get a list of daily cooldowns used in the recipe
export function dailyCooldowns(
  tree: RecipeTreeWithCraftFlags,
  breakdown: DailyCooldownsBreakdown = {}
) {
  if (!tree.components || tree.craft === false || tree.type === 'Currency') {
    return breakdown
  }

  if (dailyCooldownIds.indexOf(tree.id) !== -1) {
    breakdown[tree.id] = (breakdown[tree.id] || 0) + tree.usedQuantity
  }

  const dailyCap = tree.daily_purchase_cap ? tree.daily_purchase_cap : 0
  const weeklyCap = tree.weekly_purchase_cap ? tree.weekly_purchase_cap : 0
  if (dailyCap + weeklyCap > 0) {
    breakdown[tree.id] = (breakdown[tree.id] || 0) + tree.usedQuantity
  }

  tree.components.map((component) => dailyCooldowns(component, breakdown))
  return breakdown
}
