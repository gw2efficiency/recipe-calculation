import { calculateTreeQuantity } from './calculateTreeQuantity'
import { calculateTreePrices } from './calculateTreePrices'
import { calculateTreeCraftFlags } from './calculateTreeCraftFlags'
import { RecipeTree, RecipeTreeWithCraftFlags } from './types'
import { NestedRecipe } from '@gw2efficiency/recipe-nesting'

export function cheapestTree(
  amount: number,
  tree: NestedRecipe,
  itemPrices: Record<string, number>,
  availableItems: Record<string, number> = {},
  forceBuyItems: Array<number> = []
): RecipeTreeWithCraftFlags {
  // Adjust the tree total and used quantities
  const treeWithQuantity = calculateTreeQuantity(amount, tree as RecipeTree, availableItems)

  // Set the initial craft flags based on the subtree prices
  const treeWithPrices = calculateTreePrices(treeWithQuantity, itemPrices)
  const treeWithCraftFlags = calculateTreeCraftFlags(treeWithPrices, forceBuyItems)

  // Force the root to be crafted
  treeWithCraftFlags.craft = true

  // After the "craft" flags are set, update the used materials
  // to only be used for things that actually get crafted
  const treeWithQuantityPostFlags = calculateTreeQuantity(
    amount,
    treeWithCraftFlags,
    availableItems
  )

  // Recalculate the correct tree price
  return calculateTreePrices(treeWithQuantityPostFlags, itemPrices)
}
