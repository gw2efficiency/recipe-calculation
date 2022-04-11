import { treeCheapestCraftFlags } from '../src/treeCheapestCraftFlags'
import { RecipeTreeWithPrices } from '../src/types'

describe('treeCheapestCraftFlags', () => {
  it('sets the cheapest craft flags', () => {
    const recipeTree: RecipeTreeWithPrices = {
      id: 1,
      type: 'Recipe',
      totalQuantity: 1,
      craftPrice: 123,
      quantity: 1,
      output: 1,
      min_rating: null,
      disciplines: [],
      usedQuantity: 1,
      buyPrice: false,
      buyPriceEach: false,
      decisionPrice: 123,
      components: [
        {
          id: 2,
          type: 'Recipe',
          totalQuantity: 1,
          craftPrice: 123,
          buyPrice: 1,
          buyPriceEach: 1,
          decisionPrice: 1,
          quantity: 1,
          output: 1,
          min_rating: null,
          disciplines: [],
          usedQuantity: 1,
          components: [],
        },
        {
          id: 3,
          type: 'Recipe',
          totalQuantity: 2,
          craftPrice: 123,
          buyPrice: false,
          quantity: 2,
          buyPriceEach: false,
          decisionPrice: 123,
          output: 1,
          min_rating: null,
          disciplines: [],
          usedQuantity: 2,
          components: [],
        },
        {
          id: 4,
          type: 'Recipe',
          totalQuantity: 2,
          craftPrice: 123,
          buyPrice: 555,
          quantity: 2,
          buyPriceEach: 277,
          decisionPrice: 123,
          output: 1,
          disciplines: [],
          min_rating: null,
          usedQuantity: 2,
          components: [],
        },
        {
          id: 5,
          type: 'Recipe',
          totalQuantity: 2,
          craftPrice: 1,
          buyPrice: 555,
          quantity: 2,
          buyPriceEach: 277,
          decisionPrice: 1,
          output: 1,
          min_rating: null,
          disciplines: [],
          usedQuantity: 2,
          components: [],
        },
      ],
    }

    const calculatedTree = treeCheapestCraftFlags(recipeTree, [5])
    expect(calculatedTree).toMatchSnapshot()
  })
})
