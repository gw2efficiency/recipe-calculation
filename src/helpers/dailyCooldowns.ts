import { DAILY_COOLDOWNS } from '../static/dailyCooldowns'
import { DAILY_LIMITED_ITEMS, DailyLimitedItem } from '../static/dailyLimitedItems'
import { RecipeTreeWithCraftFlags } from '../types'

const dailyCooldownIds = DAILY_COOLDOWNS.filter((x) => x.craftInterval === 'daily').map((x) => x.id)
const dailyLimitedItems = DAILY_LIMITED_ITEMS

export type DailyCooldownsBreakdown = Record<string, number>
export type MatchingItemWithoutLimit = Omit<DailyLimitedItem, 'dailyLimit'>

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

  const matchingItem = dailyLimitedItems.find((item) => item.id === tree.id)
  if (
    matchingItem &&
    matchesItemProperties(
      tree,
      (({ dailyLimit, ...matchingItemWithoutLimit }) => matchingItemWithoutLimit)(matchingItem)
    )
  ) {
    breakdown[tree.id] = (breakdown[tree.id] || 0) + tree.usedQuantity
  }

  tree.components.map((component) => dailyCooldowns(component, breakdown))
  return breakdown
}

export function matchesItemProperties(
  tree: RecipeTreeWithCraftFlags,
  matchingItemWithoutLimit: MatchingItemWithoutLimit
): boolean {
  return Object.entries(matchingItemWithoutLimit).every(([key, value]) => {
    if (!(key in tree)) {
      return false
    }

    const treeValue = tree[key as keyof RecipeTreeWithCraftFlags] as unknown

    if (typeof value === 'object' && !Array.isArray(value) && typeof treeValue === 'object') {
      return matchesItemProperties(treeValue as RecipeTreeWithCraftFlags, value)
    }

    if (Array.isArray(value)) {
      if (!Array.isArray(treeValue)) {
        return false
      }
      return value.every((nestedObject, index) =>
        matchesItemProperties(treeValue[index], nestedObject as MatchingItemWithoutLimit)
      )
    }

    return treeValue === value
  })
}
