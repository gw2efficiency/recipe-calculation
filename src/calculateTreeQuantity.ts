import { RecipeTreeWithCraftFlags, RecipeTree, RecipeTreeWithQuantity } from './types'

export function calculateTreeQuantity(
  amount: number,
  tree: RecipeTreeWithCraftFlags,
  availableItems?: Record<string, number>
): RecipeTreeWithCraftFlags
export function calculateTreeQuantity(
  amount: number,
  tree: RecipeTree,
  availableItems?: Record<string, number>
): RecipeTreeWithQuantity
export function calculateTreeQuantity(
  amount: number,
  tree: RecipeTree | RecipeTreeWithCraftFlags,
  availableItems: Record<string, number> = {}
) {
  // Make sure that we don't modify the passed-in object
  // We still want to work with a reference in the actual calculation
  // since the availableItems are a shared state for all sub-recipes
  return calculateTreeQuantityInner(amount, tree, { ...availableItems })
}

// Go through a recipe tree and set 'totalQuantity' based on the
// wanted amount and the output of recipes and sub-recipes
function calculateTreeQuantityInner(
  amount: number,
  tree: RecipeTree | RecipeTreeWithCraftFlags,
  availableItems: Record<string, number>,
  ignoreAvailable = false,
  nesting = 0
): RecipeTreeWithCraftFlags | RecipeTreeWithQuantity {
  const output = tree.output || 1

  // Calculate the total quantity needed
  let treeQuantity = amount * tree.quantity

  // Round amount to nearest multiple of the tree output
  treeQuantity = Math.ceil(treeQuantity / output) * output
  const totalQuantity = Math.round(treeQuantity)

  // If the item is available and the higher tree is not
  // bought or already available get as many items of it as possible
  // (This ignores the root node, because we *always* want to craft all of these)
  let availableQuantity = 0
  if (nesting > 0 && tree.type !== 'Currency' && !ignoreAvailable && availableItems[tree.id]) {
    availableQuantity = Math.min(availableItems[tree.id], totalQuantity)
    availableItems[tree.id] -= availableQuantity
  }
  const usedQuantity = totalQuantity - availableQuantity

  if (!tree.components) {
    return { ...tree, components: undefined, output, totalQuantity, usedQuantity }
  }

  // Get the amount of components that need to be crafted
  // e.g. a recipe outputs 10 and we need 20 -> 2x components
  const componentAmount = Math.ceil(usedQuantity / output)

  // Ignore available items in components if the tree
  // doesn't get crafted or is completely available anyway
  ignoreAvailable =
    ('craft' in tree && tree.craft === false) || usedQuantity === 0 || ignoreAvailable

  // Adjust the quantity for all tree's subcomponents
  const components = tree.components.map((component) => {
    return calculateTreeQuantityInner(
      componentAmount,
      component,
      availableItems,
      ignoreAvailable,
      ++nesting
    )
  })

  return { ...tree, components, output, totalQuantity, usedQuantity }
}
