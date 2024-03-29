import { dailyCooldowns } from '../../src'
import { RecipeTreeWithCraftFlags } from '../../src/types'

describe('helpers > dailyCooldowns', () => {
  it('gets all daily cooldowns from a recipe tree', () => {
    const tree: RecipeTreeWithCraftFlags = {
      id: 1,
      craft: true,
      totalQuantity: 2,
      usedQuantity: 2,
      quantity: 2,
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
          id: 66913,
          craft: false,
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
              id: 4,
              craft: false,
              totalQuantity: 12,
              usedQuantity: 12,
              quantity: 12,
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
        {
          id: 46740,
          craft: true,
          totalQuantity: 10,
          usedQuantity: 3,
          quantity: 10,
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
              id: 19,
              craft: true,
              totalQuantity: 3,
              usedQuantity: 3,
              quantity: 3,
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
                  id: 66913,
                  craft: true,
                  totalQuantity: 3,
                  usedQuantity: 3,
                  quantity: 3,
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
                      id: 4,
                      craft: false,
                      totalQuantity: 6,
                      usedQuantity: 6,
                      quantity: 6,
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
            },
          ],
        },
        {
          id: 5,
          craft: false,
          totalQuantity: 4,
          usedQuantity: 0,
          quantity: 4,
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
              id: 6,
              craft: false,
              totalQuantity: 0,
              usedQuantity: 0,
              quantity: 0,
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
        {
          id: 66913,
          craft: true,
          totalQuantity: 1,
          usedQuantity: 1,
          quantity: 1,
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
              id: 7,
              craft: true,
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
                  id: 4,
                  craft: false,
                  totalQuantity: 12,
                  usedQuantity: 12,
                  quantity: 12,
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
        },
        {
          id: 46736,
          craft: true,
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
          id: 1,
          craft: false,
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
    }

    expect(dailyCooldowns(tree)).toEqual({
      46740: 3,
      66913: 4,
    })
  })
})
