import { DAILY_COOLDOWNS } from '../static/dailyCooldowns'
import { CheapestRecipeTree } from '../types'

const dailyCooldownIds = DAILY_COOLDOWNS.filter((x) => x.craftInterval === 'daily').map((x) => x.id)

export type DailyCooldownsBreakdown = Record<number, number>

// Get a list of daily cooldowns used in the recipe
export default function dailyCooldowns(
  tree: CheapestRecipeTree,
  breakdown: DailyCooldownsBreakdown = {}
) {
  if (!tree.components || tree.craft === false) {
    return breakdown
  }

  if (dailyCooldownIds.indexOf(tree.id) !== -1) {
    breakdown[tree.id] = (breakdown[tree.id] || 0) + tree.usedQuantity
  }

  tree.components.map((component) => dailyCooldowns(component, breakdown))
  return breakdown
}
