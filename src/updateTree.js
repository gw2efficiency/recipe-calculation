const treeAdjustQuantity = require('./treeAdjustQuantity.js')
const treePrices = require('./treePrices.js')

function updateTree (amount, tree, itemPrices, availableItems = {}) {
  // Update the tree total and used quantities
  tree = treeAdjustQuantity(amount, tree, availableItems)

  // Recalculate the correct tree price
  tree = treePrices(tree, itemPrices)

  return tree
}

module.exports = updateTree
