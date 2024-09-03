import { calculateTreePrices } from '../src/calculateTreePrices'
import { RecipeTreeWithCraftFlags, RecipeTreeWithQuantity } from '../src/types'

const TREE_PARTIAL = {
  output: 1,
  min_rating: null,
  disciplines: [],
}

describe('calculateTreePrices', () => {
  it('updates the prices for a tree', () => {
    const recipeTree: RecipeTreeWithQuantity = {
      ...TREE_PARTIAL,
      id: 1,
      usedQuantity: 1,
      totalQuantity: 1,
      type: 'Recipe',
      quantity: 1,
      components: [
        { ...TREE_PARTIAL, id: 2, usedQuantity: 1, totalQuantity: 1, type: 'Item', quantity: 1 },
        {
          ...TREE_PARTIAL,
          id: 3,
          usedQuantity: 2,
          totalQuantity: 2,
          type: 'Item',
          quantity: 2,
        },
        {
          ...TREE_PARTIAL,
          id: 1,
          type: 'Currency',
          quantity: 10,
          usedQuantity: 10,
          totalQuantity: 10,
        },
        {
          ...TREE_PARTIAL,
          id: 2,
          type: 'Currency',
          quantity: 10,
          usedQuantity: 10,
          totalQuantity: 10,
        },
      ],
    }
    const prices = { 1: 123, 2: 1, 3: 2 }

    const calculatedTree = calculateTreePrices(recipeTree, prices)
    expect(calculatedTree).toMatchSnapshot()
  })

  it('updates the prices for a tree with flags correctly', () => {
    const recipeTree: RecipeTreeWithCraftFlags = {
      ...TREE_PARTIAL,
      craft: false,
      craftDecisionPrice: 3,
      id: 1,
      usedQuantity: 1,
      totalQuantity: 1,
      type: 'Recipe',
      quantity: 1,
      buyPriceEach: 123,
      buyPrice: 123,
      decisionPrice: 5,
      craftResultPrice: 5,
      components: [
        {
          ...TREE_PARTIAL,
          craft: false,
          craftDecisionPrice: 1,
          id: 2,
          usedQuantity: 1,
          totalQuantity: 1,
          type: 'Item',
          quantity: 1,
          buyPriceEach: 1,
          buyPrice: 1,
          decisionPrice: 1,
          craftResultPrice: 1,
        },
        {
          ...TREE_PARTIAL,
          craft: false,
          craftDecisionPrice: 2,
          id: 3,
          usedQuantity: 2,
          totalQuantity: 2,
          type: 'Item',
          quantity: 2,
          buyPriceEach: 2,
          buyPrice: 2,
          decisionPrice: 2,
          craftResultPrice: 2,
        },
      ],
    }
    const prices = { 1: 123, 2: 1, 3: 2 }

    const calculatedTree = calculateTreePrices(recipeTree, prices)
    expect(calculatedTree).toMatchSnapshot()
  })

  it('updates the prices for a tree with missing buy prices', () => {
    const recipeTree: RecipeTreeWithQuantity = {
      ...TREE_PARTIAL,
      id: 1,
      usedQuantity: 1,
      totalQuantity: 1,
      type: 'Recipe',
      quantity: 1,
      components: [
        {
          ...TREE_PARTIAL,
          id: 2,
          usedQuantity: 1,
          totalQuantity: 1,
          type: 'Item',
          quantity: 1,
        },
        {
          ...TREE_PARTIAL,
          id: 3,
          usedQuantity: 2,
          totalQuantity: 2,
          type: 'Recipe',
          quantity: 2,
          components: [
            {
              ...TREE_PARTIAL,
              id: 4,
              usedQuantity: 50,
              totalQuantity: 50,
              type: 'Item',
              quantity: 50,
            },
            {
              ...TREE_PARTIAL,
              id: 5,
              usedQuantity: 2,
              totalQuantity: 2,
              type: 'Item',
              quantity: 2,
            },
          ],
        },
      ],
    }
    const prices = { 1: 123, 2: 1, 3: 2, 5: 10 }

    const calculatedTree = calculateTreePrices(recipeTree, prices)
    expect(calculatedTree).toMatchSnapshot()
  })
})
