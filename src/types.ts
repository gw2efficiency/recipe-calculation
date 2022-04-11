import type { NestedRecipe as NestedRecipeTree } from '@gw2efficiency/recipe-nesting'

type ExtendRecipeTree<TBaseTree, TProperties> = Omit<
  TBaseTree,
  'type' | 'components' | 'recipe_id'
> & {
  type: 'Recipe' | 'Item' | 'Currency'
  components?: Array<ExtendRecipeTree<TBaseTree, TProperties>>
  recipe_id?: number
} & TProperties

export type RecipeTree = ExtendRecipeTree<NestedRecipeTree, { __never?: never }>

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
