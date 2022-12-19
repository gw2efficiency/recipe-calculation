import { RecipeTreeWithCraftFlags, RecipeTreeWithPrices } from './types'

// Set the craft flags based on the cheapest price
export function calculateTreeCraftFlags(
  tree: RecipeTreeWithPrices,
  forceBuyItems: Array<number>
): RecipeTreeWithCraftFlags {
  // Craft the item if it can't be bought or it is cheaper to craft
  const hasComponents = !!tree.components
  const isUsed = tree.usedQuantity !== 0
  const isCheaperToCraft =
    typeof tree.craftPrice !== 'undefined' && (!tree.buyPrice || tree.decisionPrice < tree.buyPrice)
  const isForceBuy = forceBuyItems.indexOf(tree.id) !== -1

  const craft = hasComponents && isUsed && isCheaperToCraft && !isForceBuy

  if (!tree.components) {
    return { ...tree, components: undefined, craft }
  }

  // Adjust the flags for all tree's sub-recipes
  const components = tree.components.map((component) =>
    calculateTreeCraftFlags(component, forceBuyItems)
  )

  return { ...tree, components, craft }
}
