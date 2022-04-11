import { calculateTreeQuantity } from './calculateTreeQuantity'
import { calculateTreePrices } from './calculateTreePrices'
import { RecipeTreeWithCraftFlags } from './types'

export function updateTree(
  amount: number,
  tree: RecipeTreeWithCraftFlags,
  itemPrices: Record<string, number>,
  availableItems: Record<string, number> = {}
) {
  // Update the tree total and used quantities
  const treeWithQuantity = calculateTreeQuantity(amount, tree, availableItems)

  // Recalculate the correct tree price
  return calculateTreePrices(treeWithQuantity, itemPrices)
}
