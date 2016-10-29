import treeAdjustQuantity from './treeAdjustQuantity.js'
import treePrices from './treePrices.js'

export default function updateTree (amount, tree, itemPrices, availableItems = {}) {
  // Update the tree total and used quantities
  tree = treeAdjustQuantity(amount, tree, availableItems)

  // Recalculate the correct tree price
  tree = treePrices(tree, itemPrices)

  return tree
}
