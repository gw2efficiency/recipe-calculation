import treeAdjustQuantity from './treeAdjustQuantity'
import treePrices from './treePrices'
import treeCheapestCraftFlags from './treeCheapestCraftFlags'

export default function cheapestTree(
  amount: any,
  tree: any,
  itemPrices: any,
  availableItems: any = {},
  forceBuyItems: any = []
) {
  // Adjust the tree total and used quantities
  tree = treeAdjustQuantity(amount, tree, availableItems)

  // Set the initial craft flags based on the subtree prices
  tree = treePrices(tree, itemPrices)
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
