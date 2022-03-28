import { treeAdjustQuantity } from './treeAdjustQuantity'
import treePrices from './treePrices'
import { AvailableItems, CheapestRecipeTree, ItemPrices } from './types'

export default function updateTree(
  amount: number,
  tree: CheapestRecipeTree,
  itemPrices: ItemPrices,
  availableItems: AvailableItems = {}
) {
  // Update the tree total and used quantities
  const treeWithQuantity = treeAdjustQuantity(amount, tree, availableItems)

  // Recalculate the correct tree price
  return treePrices(treeWithQuantity, itemPrices)
}
