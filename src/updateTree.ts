import { treeAdjustQuantity } from './treeAdjustQuantity'
import { treePrices } from './treePrices'
import { RecipeTreeWithCraftFlags } from './types'

export function updateTree(
  amount: number,
  tree: RecipeTreeWithCraftFlags,
  itemPrices: Record<string, number>,
  availableItems: Record<string, number> = {}
) {
  // Update the tree total and used quantities
  const treeWithQuantity = treeAdjustQuantity(amount, tree, availableItems)

  // Recalculate the correct tree price
  return treePrices(treeWithQuantity, itemPrices)
}
