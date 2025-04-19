import { RecipeTreeWithCraftFlags, RecipeTreeWithPrices, RecipeTreeWithQuantity } from './types'
import { CURRENCY_DECISION_PRICES } from './static/currencyDecisionPrices'

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
    // Coin is 1c per used quantity, the other currencies do not have a TP price
    buyPriceEach = tree.id === 1 ? 1 : false
  }
  const buyPrice = buyPriceEach ? tree.usedQuantity * buyPriceEach : false
  let craftResultPrice = buyPrice

  // Calculate the base decision price (may be overwritten later with the craft price)
  let decisionPriceEach = buyPriceEach || undefined
  if (tree.type === 'Currency') {
    decisionPriceEach = CURRENCY_DECISION_PRICES[tree.id]
  }
  let decisionPrice = decisionPriceEach ? tree.usedQuantity * decisionPriceEach : false

  if (!tree.components) {
    return {
      ...tree,
      components: undefined,
      buyPriceEach,
      buyPrice,
      decisionPrice,
      craftResultPrice,
      craftDecisionPrice: decisionPrice,
    }
  }

  // Calculate the tree prices traversal for the sub-components
  const components = tree.components.map((component) => calculateTreePrices(component, itemPrices))

  // Calculate the craft price out of the best prices
  const craftDecisionPrice = components.map((c) => c.decisionPrice || 0).reduce((a, b) => a + b, 0)
  const craftPrice = components.map((c) => c.craftResultPrice || 0).reduce((a, b) => a + b, 0)

  // Update the decision price of this tree segment to the craft price,
  // used to determine the craft price of the higher-up recipe
  if (
    !('craft' in tree && tree.craft === false) &&
    (('craft' in tree && tree.craft === true) ||
      !decisionPrice ||
      craftDecisionPrice < decisionPrice)
  ) {
    decisionPrice = craftDecisionPrice
    craftResultPrice = craftPrice
  }

  craftResultPrice = craftResultPrice || craftPrice
  decisionPrice = decisionPrice || craftDecisionPrice

  return {
    ...tree,
    components,
    buyPriceEach,
    buyPrice,
    craftPrice,
    decisionPrice,
    craftResultPrice,
    craftDecisionPrice,
  }
}
