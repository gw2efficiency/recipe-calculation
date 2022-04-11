import { RecipeTreeWithCraftFlags, RecipeTreeWithPrices, RecipeTreeWithQuantity } from './types'

// Update the tree prices
export function calculateTreePrices(
  tree: RecipeTreeWithCraftFlags,
  itemPrices: Record<string, number>
): RecipeTreeWithCraftFlags
export function calculateTreePrices(
  tree: RecipeTreeWithQuantity,
  itemPrices: Record<string, number>
): RecipeTreeWithPrices
export function calculateTreePrices(
  tree: RecipeTreeWithQuantity | RecipeTreeWithCraftFlags,
  itemPrices: Record<string, number>
): RecipeTreeWithPrices | RecipeTreeWithCraftFlags {
  // Calculate the buy prices
  let buyPriceEach = itemPrices[tree.id] || false
  if (tree.type === 'Currency') {
    // Coin is 1c per used quantity, the other currencies are not considered
    buyPriceEach = tree.id === 1 ? 1 : false
  }
  const buyPrice = buyPriceEach ? tree.usedQuantity * buyPriceEach : false
  let decisionPrice = buyPrice

  if (!tree.components) {
    return { ...tree, components: undefined, buyPriceEach, buyPrice, decisionPrice }
  }

  // Calculate the tree prices traversal for the sub-components
  const components = tree.components.map((component) => calculateTreePrices(component, itemPrices))

  // Calculate the craft price out of the best prices
  const craftPrice = components.map((c) => c.decisionPrice || 0).reduce((a, b) => a + b, 0)

  // Update the decision price of this tree segment to the craft price,
  // used to determine the craft price of the higher-up recipe
  if (
    !('craft' in tree && tree.craft === false) &&
    (('craft' in tree && tree.craft === true) || !buyPrice || craftPrice < buyPrice)
  ) {
    decisionPrice = craftPrice
  }

  return { ...tree, components, buyPriceEach, buyPrice, decisionPrice, craftPrice }
}
