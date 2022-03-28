import { treeAdjustQuantity } from './treeAdjustQuantity'
import { treePrices } from './treePrices'
import { treeCheapestCraftFlags } from './treeCheapestCraftFlags'
import {
  AvailableItems,
  ForceBuyItems,
  ItemPrices,
  RecipeTree,
  RecipeTreeWithCraftFlags,
} from './types'
import { NestedRecipe } from '@gw2efficiency/recipe-nesting'

export function cheapestTree(
  amount: number,
  tree: NestedRecipe,
  itemPrices: ItemPrices,
  availableItems: AvailableItems = {},
  forceBuyItems: ForceBuyItems = []
): RecipeTreeWithCraftFlags {
  // Adjust the tree total and used quantities
  const treeWithQuantity = treeAdjustQuantity(amount, tree as RecipeTree, availableItems)

  // Set the initial craft flags based on the subtree prices
  const treeWithPrices = treePrices(treeWithQuantity, itemPrices)
  const treeWithCraftFlags = treeCheapestCraftFlags(treeWithPrices, forceBuyItems)

  // Force the root to be crafted
  treeWithCraftFlags.craft = true

  // After the "craft" flags are set, update the used materials
  // to only be used for things that actually get crafted
  const treeWithQuantityFinal = treeAdjustQuantity(amount, treeWithCraftFlags, availableItems)

  // Recalculate the correct tree price
  return treePrices(treeWithQuantityFinal, itemPrices)
}
