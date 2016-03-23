// Go through a recipe tree and set 'totalQuantity' based on the
// wanted amount and the output of recipes and sub-recipes
function treeTotalQuantity (amount, tree) {
  tree = {...tree}
  tree.output = tree.output || 1

  // Calculate the total quantity needed
  let treeQuantity = amount * tree.quantity

  // Round amount to nearest multiple of the tree output
  treeQuantity = Math.ceil(treeQuantity / tree.output) * tree.output
  tree.totalQuantity = Math.round(treeQuantity)

  if (!tree.components) {
    return tree
  }

  // Get the amount of components that need to be crafted
  // e.g. a recipe outputs 10 and we need 20 -> 2x components
  let componentAmount = tree.totalQuantity / tree.output
  tree.components = tree.components.map(component => treeTotalQuantity(componentAmount, component))
  return tree
}

module.exports = treeTotalQuantity
