// Set the craft flags based on the cheapest price
function treeCheapestCraftFlags (tree, forceBuyItems) {
  tree = {...tree}

  // Craft the item if it can't be bought or it is cheaper to craft
  tree.craft = forceBuyItems.indexOf(tree.id) === -1 &&
    (!tree.buyPrice || tree.craftPrice < tree.buyPrice)

  if (!tree.components) {
    return tree
  }

  tree.components = tree.components.map(component => treeCheapestCraftFlags(component, forceBuyItems))
  return tree
}

module.exports = treeCheapestCraftFlags
