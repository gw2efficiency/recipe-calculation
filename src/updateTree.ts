import treeAdjustQuantity from './treeAdjustQuantity'
import treePrices from './treePrices'

export default function updateTree(amount: any, tree: any, itemPrices: any, availableItems: any = {}) {
  // Update the tree total and used quantities
  tree = treeAdjustQuantity(amount, tree, availableItems)

  // Recalculate the correct tree price
  tree = treePrices(tree, itemPrices)

  return tree
}
