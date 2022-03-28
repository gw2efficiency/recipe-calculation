import { NestedRecipe } from '@gw2efficiency/recipe-nesting'

export type ExtendRecipeTree<TBase, TExtend> = Omit<TBase, 'type' | 'components'> & {
  type: 'Recipe' | 'Item' | 'Currency'
  components?: Array<ExtendRecipeTree<TBase, TExtend>>
} & TExtend

export type RecipeTree = ExtendRecipeTree<NestedRecipe, { __never: never }>

export type RecipeTreeWithQuantity = ExtendRecipeTree<
  RecipeTree,
  {
    output: number
    totalQuantity: number
    usedQuantity: number
  }
>

export type RecipeTreeWithPrices = ExtendRecipeTree<
  RecipeTreeWithQuantity,
  {
    buyPriceEach: number | false
    buyPrice: number | false
    decisionPrice: number | false
    craftPrice?: number
  }
>

export type RecipeTreeWithCraftFlags = ExtendRecipeTree<
  RecipeTreeWithPrices,
  {
    craft: boolean
  }
>

export type ItemPrices = Record<string, number>

export type AvailableItems = Record<string, number>

export type ForceBuyItems = Array<number>
