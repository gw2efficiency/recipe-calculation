import { RecipeTreeWithCraftFlags } from './types'

export interface UsedItemsBreakdown {
  buy: Record<string, number>
  available: Record<string, number>
  currency: Record<string, number>
}

// Generate a list of items to buy and used available items
export function usedItems(
  tree: RecipeTreeWithCraftFlags,
  breakdown: UsedItemsBreakdown = {
    buy: {},
    available: {},
    currency: {},
  }
) {
  // Add up the used available items
  const available = tree.totalQuantity - tree.usedQuantity
  if (available > 0) {
    breakdown.available[tree.id] = (breakdown.available[tree.id] || 0) + available
  }

  // This tree part is not getting crafted -> add up the bought items
  if (!tree.components || tree.craft === false) {
    if (tree.usedQuantity > 0) {
      if (tree.type === 'Currency') {
        breakdown.currency[tree.id] = (breakdown.currency[tree.id] || 0) + tree.usedQuantity
      } else {
        breakdown.buy[tree.id] = (breakdown.buy[tree.id] || 0) + tree.usedQuantity
      }
    }

    return breakdown
  }

  // This tree part is getting crafted -> get used items from components
  tree.components.map((component) => usedItems(component, breakdown))
  return breakdown
}
