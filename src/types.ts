import type { NestedRecipe as NestedRecipeTree } from '@gw2efficiency/recipe-nesting'

type ExtendRecipeTree<TBaseTree, TProperties> = Omit<TBaseTree, 'type' | 'components'> & {
  type: 'Recipe' | 'Item' | 'Currency'
  components?: Array<ExtendRecipeTree<TBaseTree, TProperties>>
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

    craftPrice?: number

    /** This price is used for choosing if the recipe should be crafted */
    decisionPrice: number | false

    /** The sum of this price is used to calculate the craftPrice */
    craftResultPrice: number | false

    /** The unaltered decision price for crafting */
    craftDecisionPrice: number | false
  }
>

export type RecipeTreeWithCraftFlags = ExtendRecipeTree<
  RecipeTreeWithPrices,
  {
    craft: boolean
  }
>
