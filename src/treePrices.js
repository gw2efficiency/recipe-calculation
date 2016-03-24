// Update the tree prices
function treePrices (tree, itemPrices) {
  tree = {...tree}

  // Either use the "used quantity" which gets set when the user uses
  // own materials, or the base "total quantity" of this tree segment
  let quantity = tree.usedQuantity !== undefined ? tree.usedQuantity : tree.totalQuantity

  // Calculate the buy prices
  tree.buyPriceEach = itemPrices[tree.id] || false
  tree.buyPrice = tree.buyPriceEach ? quantity * tree.buyPriceEach : false
  tree.decisionPrice = tree.buyPrice

  if (!tree.components) {
    return tree
  }

  // Calculate the tree prices traversal for the sub-components
  tree.components = tree.components.map(component => treePrices(component, itemPrices))

  // Calculate the craft price out of the best prices
  tree.craftPrice = tree.components.map(c => c.decisionPrice).reduce((a, b) => a + b)

  // If we explicitly don't craft this, keep the buy price as the best price
  if (tree.craft === false) {
    return tree
  }

  // Update the best price of this tree segment, used to
  // determine the craft price of the higher-up recipe
  if (!tree.buyPrice || tree.craftPrice < tree.buyPrice) {
    tree.decisionPrice = tree.craftPrice
  }

  return tree
}

module.exports = treePrices
