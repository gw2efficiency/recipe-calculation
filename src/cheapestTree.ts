// @ts-nocheck
import { treeAdjustQuantity } from './treeAdjustQuantity'
import treePrices from './treePrices'
import treeCheapestCraftFlags from './treeCheapestCraftFlags'
import { AvailableItems, ForceBuyItems, ItemPrices, RecipeTree } from './types'

export default function cheapestTree(
  amount: number,
  _tree: RecipeTree,
  itemPrices: ItemPrices,
  availableItems: AvailableItems = {},
  forceBuyItems: ForceBuyItems = []
) {
  // Adjust the tree total and used quantities
  const treeWithQuantity = treeAdjustQuantity(amount, _tree, availableItems)

  // Set the initial craft flags based on the subtree prices
  let tree = treePrices(treeWithQuantity, itemPrices)
  tree = treeCheapestCraftFlags(tree, forceBuyItems)

  // Force the root to be crafted
  tree.craft = true

  // After the "craft" flags are set, update the used materials
  // to only be used for things that actually get crafted
  tree = treeAdjustQuantity(amount, tree, availableItems)

  // Recalculate the correct tree price
  tree = treePrices(tree, itemPrices)

  return tree
}
