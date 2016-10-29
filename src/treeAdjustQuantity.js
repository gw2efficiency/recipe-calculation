// Make sure that we don't modify the passed-in object
// We still want to work with a reference in the actual calculation
// since the availableItems are a shared state for all sub-recipes
export default function treeAdjustQuantityWrapper (amount, tree, availableItems) {
  availableItems = {...availableItems}
  return treeAdjustQuantity(amount, tree, availableItems)
}

// Go through a recipe tree and set 'totalQuantity' based on the
// wanted amount and the output of recipes and sub-recipes
function treeAdjustQuantity (amount, tree, availableItems, ignoreAvailable = false, nesting = 0) {
  tree = {...tree}
  tree.output = tree.output || 1

  // Calculate the total quantity needed
  let treeQuantity = amount * tree.quantity

  // Round amount to nearest multiple of the tree output
  treeQuantity = Math.ceil(treeQuantity / tree.output) * tree.output
  tree.totalQuantity = Math.round(treeQuantity)

  // If the item is available and the higher tree is not
  // bought or already available get as many items of it as possible
  // (This ignores the root node, because we *always* want to craft all of these)
  let availableQuantity = 0
  if (nesting > 0 && !ignoreAvailable && availableItems[tree.id]) {
    availableQuantity = Math.min(availableItems[tree.id], tree.totalQuantity)
    availableItems[tree.id] -= availableQuantity
  }
  tree.usedQuantity = tree.totalQuantity - availableQuantity

  if (!tree.components) {
    return tree
  }

  // Get the amount of components that need to be crafted
  // e.g. a recipe outputs 10 and we need 20 -> 2x components
  let componentAmount = Math.ceil(tree.usedQuantity / tree.output)

  // Ignore available items in components if the tree
  // doesn't get crafted or is completely available anyway
  ignoreAvailable = tree.craft === false || tree.usedQuantity === 0 || ignoreAvailable

  tree.components = tree.components.map(component => {
    return treeAdjustQuantity(componentAmount, component, availableItems, ignoreAvailable, ++nesting)
  })
  return tree
}
