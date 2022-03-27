import treePrices from '../src/treePrices'

describe('treePrices', () => {
  it('updates the prices for a tree', () => {
    let recipeTree = {
      id: 1,
      usedQuantity: 1,
      components: [
        { id: 2, usedQuantity: 1 },
        { id: 3, usedQuantity: 2 },
      ],
    }
    let prices = { 1: 123, 2: 1, 3: 2 }

    let calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).toEqual({
      craftPrice: 5,
      id: 1,
      usedQuantity: 1,
      decisionPrice: 5,
      buyPrice: 123,
      buyPriceEach: 123,
      components: [
        {
          decisionPrice: 1,
          buyPrice: 1,
          buyPriceEach: 1,
          id: 2,
          usedQuantity: 1,
        },
        {
          decisionPrice: 4,
          buyPrice: 4,
          buyPriceEach: 2,
          id: 3,
          usedQuantity: 2,
        },
      ],
    })
  })

  it('updates the prices for a tree with flags correctly', () => {
    let recipeTree = {
      id: 1,
      usedQuantity: 1,
      craft: false,
      components: [
        { id: 2, usedQuantity: 1 },
        { id: 3, usedQuantity: 2 },
      ],
    }
    let prices = { 1: 123, 2: 1, 3: 2 }

    let calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).toEqual({
      craftPrice: 5,
      id: 1,
      usedQuantity: 1,
      craft: false,
      decisionPrice: 123,
      buyPrice: 123,
      buyPriceEach: 123,
      components: [
        {
          decisionPrice: 1,
          buyPrice: 1,
          buyPriceEach: 1,
          id: 2,
          usedQuantity: 1,
        },
        {
          decisionPrice: 4,
          buyPrice: 4,
          buyPriceEach: 2,
          id: 3,
          usedQuantity: 2,
        },
      ],
    })
  })

  it('updates the prices for a tree with missing buy prices', () => {
    let recipeTree = {
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
    let prices = { 1: 123, 2: 1, 3: 2, 5: 10 }

    let calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).toEqual({
      craftPrice: 5,
      id: 1,
      usedQuantity: 1,
      decisionPrice: 5,
      buyPrice: 123,
      buyPriceEach: 123,
      components: [
        {
          decisionPrice: 1,
          buyPrice: 1,
          buyPriceEach: 1,
          id: 2,
          usedQuantity: 1,
        },
        {
          decisionPrice: 4,
          buyPrice: 4,
          buyPriceEach: 2,
          id: 3,
          usedQuantity: 2,
          components: [
            {
              decisionPrice: false,
              buyPrice: false,
              buyPriceEach: false,
              id: 4,
              usedQuantity: 50,
            },
            {
              decisionPrice: 20,
              buyPrice: 20,
              buyPriceEach: 10,
              id: 5,
              usedQuantity: 2,
            },
          ],
          craftPrice: 20,
        },
      ],
    })
  })
})
