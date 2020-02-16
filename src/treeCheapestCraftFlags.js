// Set the craft flags based on the cheapest price
export default function treeCheapestCraftFlags (tree, forceBuyItems) {
  tree = {...tree}

  // Craft the item if it can't be bought or it is cheaper to craft
  tree.craft = forceBuyItems.indexOf(tree.id) === -1 &&
    tree.usedQuantity !== 0 &&
    (!tree.buyPrice || tree.craftPrice < tree.buyPrice)

  if (!tree.components) {
    return tree
  }

  // Adjust the flags for all tree's subcomponents
  tree.components = tree.components.map(component => treeCheapestCraftFlags(component, forceBuyItems))
  return tree
}
