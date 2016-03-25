const treeAdjustQuantity = require('./treeAdjustQuantity.js')
const treePrices = require('./treePrices.js')
const treeCheapestCraftFlags = require('./treeCheapestCraftFlags.js')

function cheapestTree (amount, tree, itemPrices, availableItems = {}, forceBuyItems = []) {
  // Adjust the tree quantities
  tree = treeAdjustQuantity(amount, tree)

  // Set the initial craft flags based on the subtree prices
  tree = treePrices(tree, itemPrices)
  tree = treeCheapestCraftFlags(tree, forceBuyItems)

  // Force the root to be crafted always
  tree.craft = true
  tree.usedQuantity = tree.totalQuantity

  // Recalculate the correct tree price
  tree = treePrices(tree, itemPrices)

  return tree
}

module.exports = cheapestTree
