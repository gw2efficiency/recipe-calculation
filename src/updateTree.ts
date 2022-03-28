import { treeAdjustQuantity } from './treeAdjustQuantity'
import { treePrices } from './treePrices'
import { AvailableItems, RecipeTreeWithCraftFlags, ItemPrices } from './types'

export function updateTree(
  amount: number,
  tree: RecipeTreeWithCraftFlags,
  itemPrices: ItemPrices,
  availableItems: AvailableItems = {}
) {
  // Update the tree total and used quantities
  const treeWithQuantity = treeAdjustQuantity(amount, tree, availableItems)

  // Recalculate the correct tree price
  return treePrices(treeWithQuantity, itemPrices)
}
