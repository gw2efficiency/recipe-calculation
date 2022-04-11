import { RecipeTreeWithCraftFlags, RecipeTreeWithPrices } from './types'

// Set the craft flags based on the cheapest price
export function treeCheapestCraftFlags(
  tree: RecipeTreeWithPrices,
  forceBuyItems: Array<number>
): RecipeTreeWithCraftFlags {
  // Craft the item if it can't be bought or it is cheaper to craft
  const shouldForceBuy = forceBuyItems.indexOf(tree.id) !== -1
  const isUsed = tree.usedQuantity !== 0
  const craftIsCheaper =
    typeof tree.craftPrice !== 'undefined' && (!tree.buyPrice || tree.craftPrice < tree.buyPrice)

  const craft = !!tree.components && !shouldForceBuy && isUsed && craftIsCheaper

  if (!tree.components) {
    return { ...tree, components: undefined, craft }
  }

  // Adjust the flags for all tree's sub-recipes
  const components = tree.components.map((component) =>
    treeCheapestCraftFlags(component, forceBuyItems)
  )

  return { ...tree, components, craft }
}
