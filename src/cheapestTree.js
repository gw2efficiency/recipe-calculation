const treeTotalQuantity = require('./treeTotalQuantity.js')
const treePrices = require('./treePrices.js')
const treeCheapestCraftFlags = require('./treeCheapestCraftFlags.js')

function cheapestTree (amount, tree, itemPrices) {
  tree = treeTotalQuantity(amount, tree)
  tree = treePrices(tree, itemPrices)
  tree = treeCheapestCraftFlags(tree)

  // Force the root to be crafted always
  tree.craft = true

  return tree
}

module.exports = cheapestTree
