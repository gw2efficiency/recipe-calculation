import { calculateTreeQuantity } from './calculateTreeQuantity'
import { calculateTreePrices } from './calculateTreePrices'
import { calculateTreeCraftFlags } from './calculateTreeCraftFlags'
import { RecipeTree, RecipeTreeWithCraftFlags, RecipeTreeWithPrices } from './types'
import {
  NestedRecipe,
  BasicCurrencyComponent,
  BasicItemComponent,
} from '@gw2efficiency/recipe-nesting'

export function cheapestTree(
  amount: number,
  tree: NestedRecipe,
  itemPrices: Record<string, number>,
  availableItems: Record<string, number> = {},
  forceBuyItems: Array<number> = [],
  valueOwnItems = false,
  userEfficiencyTiers: Record<string, string> = {
    '102306': '0',
    '102205': '0',
    '103049': '0',
  }
): RecipeTreeWithCraftFlags {
  tree = applyEfficiencyTiersToTree(tree, userEfficiencyTiers)
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

    // calculateTreeQuantity already checks for craft flags, so we can set them here
    tree = disableCraftForItemIds(tree, cheaperToBuyItemIds) as NestedRecipe
  }

  // Adjust the tree total and used quantities
  const treeWithQuantity = calculateTreeQuantity(amount, tree as RecipeTree, availableItems)

  // Set the initial craft flags based on the subtree prices
  const treeWithPrices = calculateTreePrices(treeWithQuantity, itemPrices)
  let treeWithCraftFlags = calculateTreeCraftFlags(treeWithPrices, forceBuyItems)

  // Force the root to be crafted
  treeWithCraftFlags = { ...treeWithCraftFlags, craft: true }

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

type NestedRecipeAndBasicComponentWithCraftFlag = (
  | NestedRecipe
  | BasicItemComponent
  | BasicCurrencyComponent
) & {
  craft?: boolean
}

function disableCraftForItemIds(
  tree: NestedRecipeAndBasicComponentWithCraftFlag,
  ids: Array<number>
) {
  if (ids.includes(tree.id)) {
    tree = { ...tree, craft: false }
  }

  if ('components' in tree && Array.isArray(tree.components)) {
    tree.components = tree.components.map((component) =>
      disableCraftForItemIds(component as NestedRecipeAndBasicComponentWithCraftFlag, ids)
    )
  }

  return tree
}

function applyEfficiencyTiersToTree(
  tree: NestedRecipe,
  userEfficiencyTiers: Record<string, string>
): NestedRecipe {
  if (
    ['102306', '102205', '103049'].includes(tree.id.toString()) &&
    tree.merchant &&
    tree.merchant.name.includes('Homestead Refinement')
  ) {
    const efficiencyTier = Number(userEfficiencyTiers[tree.id.toString()])
    if (efficiencyTier > 0) {
      const component = { ...tree.components[0] }
      component.quantity = component.quantity / (efficiencyTier * 2)

      if (component.id === 12142) {
        component.quantity = efficiencyTier === 1 ? 1 : 0.5
      }
      if (component.id === 12135) {
        component.quantity = efficiencyTier === 1 ? 8 : 4
      }

      let updatedTree = { ...tree, output: component.quantity < 1 ? tree.output * 2 : tree.output }

      if (component.id === 19699 && efficiencyTier === 2) {
        updatedTree.output = updatedTree.output / 2
      }

      component.quantity = component.quantity < 1 ? 1 : component.quantity
      updatedTree = { ...updatedTree, components: [component, ...tree.components.slice(1)] }

      tree = updatedTree
    }
  }

  if ('components' in tree && Array.isArray(tree.components)) {
    tree = {
      ...tree,
      components: tree.components.map((component) =>
        applyEfficiencyTiersToTree(component as NestedRecipe, userEfficiencyTiers)
      ),
    }
  }

  return tree
}
