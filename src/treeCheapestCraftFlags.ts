import { CheapestRecipeTree, ForceBuyItems, RecipeTreeWithPrices } from './types'

// Set the craft flags based on the cheapest price
export default function treeCheapestCraftFlags(
  tree: RecipeTreeWithPrices,
  forceBuyItems: ForceBuyItems
): CheapestRecipeTree {
  // Craft the item if it can't be bought or it is cheaper to craft
  const craft =
    forceBuyItems.indexOf(tree.id) === -1 &&
    tree.usedQuantity !== 0 &&
    (!tree.buyPrice || (typeof tree.craftPrice !== 'undefined' && tree.craftPrice < tree.buyPrice))

  if (!tree.components) {
    return { ...tree, components: undefined, craft }
  }

  // Adjust the flags for all tree's subcomponents
  const components = tree.components.map((component) =>
    treeCheapestCraftFlags(component, forceBuyItems)
  )

  return { ...tree, components, craft }
}
