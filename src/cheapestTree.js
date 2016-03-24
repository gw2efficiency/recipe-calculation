const treeTotalQuantity = require('./treeTotalQuantity.js')
const treePrices = require('./treePrices.js')
const treeCheapestCraftFlags = require('./treeCheapestCraftFlags.js')

function cheapestTree (amount, tree, itemPrices, availableItems = {}, forceBuyItems = []) {
  // Adjust the tree quantities
  tree = treeTotalQuantity(amount, tree)

  // Set the initial craft flags based on the prices and then recalculate
  // the correct tree price after the craft flags are set
  tree = treePrices(tree, itemPrices)
  tree = treeCheapestCraftFlags(tree, forceBuyItems)
  tree = treePrices(tree, itemPrices)

  // Force the root to be crafted always
  tree.craft = true

  return tree
}

module.exports = cheapestTree
