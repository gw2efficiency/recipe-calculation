// Set the craft flags based on the cheapest price
function treeCheapestCraftFlags (tree) {
  tree = {...tree}

  // Craft the item if it cant be bought or it is cheaper to craft
  tree.craft = !tree.buyPrice || tree.craftPrice < tree.buyPrice

  if (!tree.components) {
    return tree
  }

  tree.components = tree.components.map(component => treeCheapestCraftFlags(component))
  return tree
}

module.exports = treeCheapestCraftFlags
