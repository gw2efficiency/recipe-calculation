// @ts-nocheck
import treePrices from '../src/treePrices'

describe('treePrices', () => {
  it('updates the prices for a tree', () => {
    const recipeTree = {
      id: 1,
      usedQuantity: 1,
      components: [
        { id: 2, usedQuantity: 1 },
        { id: 3, usedQuantity: 2 },
      ],
    }
    const prices = { 1: 123, 2: 1, 3: 2 }

    const calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).toMatchSnapshot()
  })

  it('updates the prices for a tree with flags correctly', () => {
    const recipeTree = {
      id: 1,
      usedQuantity: 1,
      craft: false,
      components: [
        { id: 2, usedQuantity: 1 },
        { id: 3, usedQuantity: 2 },
      ],
    }
    const prices = { 1: 123, 2: 1, 3: 2 }

    const calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).toMatchSnapshot()
  })

  it('updates the prices for a tree with missing buy prices', () => {
    const recipeTree = {
      id: 1,
      usedQuantity: 1,
      components: [
        { id: 2, usedQuantity: 1 },
        {
          id: 3,
          usedQuantity: 2,
          components: [
            { id: 4, usedQuantity: 50 },
            { id: 5, usedQuantity: 2 },
          ],
        },
      ],
    }
    const prices = { 1: 123, 2: 1, 3: 2, 5: 10 }

    const calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).toMatchSnapshot()
  })
})
