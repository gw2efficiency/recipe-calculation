import { DAILY_COOLDOWNS } from '../static/dailyCooldowns'
import { LIMITED_RECIPES, LimitedRecipe } from '../static/limitedRecipes'
import { RecipeTreeWithCraftFlags } from '../types'

const dailyCooldownIds = DAILY_COOLDOWNS.filter((x) => x.craftInterval === 'daily').map((x) => x.id)
const limitedRecipes = LIMITED_RECIPES

export type DailyCooldownsBreakdown = Record<string, number>
export type MatchingRecipeWithoutLimit = Omit<LimitedRecipe, 'limit'>

// Get a list of daily cooldowns used in the recipe
export function dailyCooldowns(
  tree: RecipeTreeWithCraftFlags,
  breakdown: DailyCooldownsBreakdown = {}
) {
  if (!tree.components || tree.craft === false || tree.type === 'Currency') {
    return breakdown
  }

  if (dailyCooldownIds.indexOf(tree.id) !== -1) {
    breakdown[tree.id] = (breakdown[tree.id] || 0) + tree.usedQuantity
  }

  const matchingRecipe = limitedRecipes.find((recipe) => recipe.id === tree.id)
  if (
    matchingRecipe &&
    matchesRecipeProperties(
      tree,
      (({ limit, ...matchingRecipeWithoutLimit }) => matchingRecipeWithoutLimit)(matchingRecipe)
    )
  ) {
    breakdown[tree.id] = (breakdown[tree.id] || 0) + tree.usedQuantity
  }

  tree.components.map((component) => dailyCooldowns(component, breakdown))
  return breakdown
}

export function matchesRecipeProperties(
  tree: RecipeTreeWithCraftFlags,
  matchingRecipeWithoutLimit: MatchingRecipeWithoutLimit
): boolean {
  return Object.entries(matchingRecipeWithoutLimit).every(([key, value]) => {
    if (!(key in tree)) {
      return false
    }

    const treeValue = tree[key as keyof RecipeTreeWithCraftFlags] as unknown

    if (typeof value === 'object' && !Array.isArray(value) && typeof treeValue === 'object') {
      return matchesRecipeProperties(treeValue as RecipeTreeWithCraftFlags, value)
    }

    if (Array.isArray(value)) {
      if (!Array.isArray(treeValue)) {
        return false
      }
      return value.every((nestedObject, index) =>
        matchesRecipeProperties(treeValue[index], nestedObject as MatchingRecipeWithoutLimit)
      )
    }

    return treeValue === value
  })
}
