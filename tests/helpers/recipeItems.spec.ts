import { recipeItems } from '../../src'
import { RecipeTreeWithCraftFlags } from '../../src/types'

describe('helpers > recipeItems', () => {
  it('gets all unique item ids of a recipe tree', () => {
    const recipeTree: RecipeTreeWithCraftFlags = {
      craft: true,
      craftDecisionPrice: 3,
      id: 1,
      totalQuantity: 6,
      usedQuantity: 6,
      quantity: 6,
      type: 'Recipe',
      output: 1,
      min_rating: null,
      disciplines: [],
      buyPriceEach: 1,
      buyPrice: 1,
      decisionPrice: 1,
      craftResultPrice: 1,
      components: [
        {
          craft: true,
          craftDecisionPrice: 2,
          id: 2,
          totalQuantity: 6,
          usedQuantity: 6,
          quantity: 6,
          type: 'Recipe',
          output: 1,
          min_rating: null,
          disciplines: [],
          buyPriceEach: 1,
          buyPrice: 1,
          decisionPrice: 1,
          craftResultPrice: 1,
          components: [
            {
              craft: false,
              craftDecisionPrice: 1,
              id: 3,
              totalQuantity: 1,
              usedQuantity: 1,
              quantity: 1,
              type: 'Item',
              output: 1,
              min_rating: null,
              disciplines: [],
              buyPriceEach: 1,
              buyPrice: 1,
              decisionPrice: 1,
              craftResultPrice: 1,
            },
            {
              craft: false,
              craftDecisionPrice: 1,
              id: 4,
              totalQuantity: 1,
              usedQuantity: 1,
              quantity: 1,
              type: 'Item',
              output: 1,
              min_rating: null,
              disciplines: [],
              buyPriceEach: 1,
              buyPrice: 1,
              decisionPrice: 1,
              craftResultPrice: 1,
            },
            {
              craft: false,
              craftDecisionPrice: false,
              id: 12,
              totalQuantity: 1,
              usedQuantity: 1,
              quantity: 1,
              type: 'Currency',
              output: 1,
              min_rating: null,
              disciplines: [],
              buyPriceEach: false,
              buyPrice: false,
              decisionPrice: false,
              craftResultPrice: false,
            },
          ],
        },
        {
          craft: false,
          craftDecisionPrice: 1,
          id: 5,
          totalQuantity: 1,
          usedQuantity: 1,
          quantity: 1,
          type: 'Item',
          output: 1,
          min_rating: null,
          disciplines: [],
          buyPriceEach: 1,
          buyPrice: 1,
          decisionPrice: 1,
          craftResultPrice: 1,
        },
        {
          craft: true,
          craftDecisionPrice: 1,
          id: 6,
          totalQuantity: 6,
          usedQuantity: 6,
          quantity: 6,
          type: 'Recipe',
          output: 1,
          min_rating: null,
          disciplines: [],
          buyPriceEach: 1,
          buyPrice: 1,
          decisionPrice: 1,
          craftResultPrice: 1,
          components: [
            {
              craft: false,
              craftDecisionPrice: 1,
              id: 3,
              totalQuantity: 1,
              usedQuantity: 1,
              quantity: 1,
              type: 'Item',
              output: 1,
              min_rating: null,
              disciplines: [],
              buyPriceEach: 1,
              buyPrice: 1,
              decisionPrice: 1,
              craftResultPrice: 1,
            },
          ],
        },
      ],
    }

    expect(recipeItems(recipeTree)).toEqual([1, 2, 3, 4, 5, 6])
  })
})
