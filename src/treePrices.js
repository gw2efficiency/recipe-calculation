// Update the tree prices
export default function treePrices (tree, itemPrices) {
  tree = {...tree}

  // Calculate the buy prices
  tree.buyPriceEach = itemPrices[tree.id] || false
  tree.buyPrice = tree.buyPriceEach ? tree.usedQuantity * tree.buyPriceEach : false
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

  // Update the decision price of this tree segment to the craft price,
  // used to determine the craft price of the higher-up recipe
  if (tree.craft === true || !tree.buyPrice || tree.craftPrice < tree.buyPrice) {
    tree.decisionPrice = tree.craftPrice
  }

  return tree
}
