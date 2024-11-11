import { calculateTreeQuantity } from './calculateTreeQuantity'
import { calculateTreePrices } from './calculateTreePrices'
import { calculateTreeCraftFlags } from './calculateTreeCraftFlags'
import { RecipeTree, RecipeTreeWithCraftFlags, RecipeTreeWithPrices } from './types'
import { NestedRecipe } from '@gw2efficiency/recipe-nesting'

export function cheapestTree(
  amount: number,
  tree: NestedRecipe,
  itemPrices: Record<string, number>,
  availableItems: Record<string, number> = {},
  forceBuyItems: Array<number> = [],
  valueOwnItems: boolean = false
): RecipeTreeWithCraftFlags {
  // Set 
  if (valueOwnItems) {
    const treeWithQuantityWithoutAvailableItems = calculateTreeQuantity(
      amount,
      tree as RecipeTree,
      {}
    )
    const treeWithPriceWithoutAvailableItems = calculateTreePrices(
      treeWithQuantityWithoutAvailableItems,
      itemPrices
    )
    const cheaperToBuyItemIds = getCheaperToBuyItemIds(treeWithPriceWithoutAvailableItems)
    disableCraftForItemIds(tree, cheaperToBuyItemIds)
  }
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

function getCheaperToBuyItemIds(
  tree: RecipeTreeWithPrices,
  ids: Array<number> = []
): Array<number> {
  // If buying the item costs less than the possible profit made by selling its craft components (with TP tax), we should buy instead of crafting
  if (
    typeof tree.craftDecisionPrice === 'number' &&
    typeof tree.buyPrice === 'number' &&
    tree.buyPrice < tree.craftDecisionPrice * 0.85
  ) {
    if (!ids.includes(tree.id)) {
      ids.push(tree.id)
    }
  }

  if (tree.components && Array.isArray(tree.components)) {
    tree.components.forEach((component) => getCheaperToBuyItemIds(component, ids))
  }

  return ids
}

function disableCraftForItemIds(tree: any, ids: Array<number>) {
  if (ids.includes(tree.id)) {
    tree.craft = false
  }

  if (tree.components && Array.isArray(tree.components)) {
    tree.components.forEach((component: any) => disableCraftForItemIds(component, ids))
  }
}
