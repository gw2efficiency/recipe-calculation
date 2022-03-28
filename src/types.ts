import { NestedRecipe } from '@gw2efficiency/recipe-nesting'

export type RecipeTree = NestedRecipe

export interface RecipeTreeWithQuantity extends RecipeTree {
  totalQuantity: number
  usedQuantity: number

  components?: Array<RecipeTreeWithQuantity>
}

export interface RecipeTreeWithPrices extends RecipeTree {
  totalQuantity: number
  usedQuantity: number

  buyPriceEach: number | false
  buyPrice: number | false
  decisionPrice: number | false
  craftPrice?: number

  components?: Array<RecipeTreeWithPrices>
}

export interface CheapestRecipeTree extends RecipeTree {
  totalQuantity: number
  usedQuantity: number

  buyPriceEach: number | false
  buyPrice: number | false
  decisionPrice: number | false
  craftPrice?: number

  craft: boolean

  components?: Array<CheapestRecipeTree>
}

export type ItemPrices = Record<number, number>

export type AvailableItems = Record<number, number>

export type ForceBuyItems = Array<number>
