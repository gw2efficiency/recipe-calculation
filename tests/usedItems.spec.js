/* eslint-env node, mocha */
const expect = require('chai').expect

const usedItems = require('../src/usedItems.js')

describe('usedItems', () => {
  it('gets the correct items to buy and used available items', () => {
    let tree = {
      craft: true,
      craftPrice: 36,
      id: 1,
      output: 1,
      quantity: 1,
      totalQuantity: 2,
      usedQuantity: 2,
      decisionPrice: 36,
      buyPrice: 20,
      buyPriceEach: 10,
      components: [
        {
          craft: false,
          craftPrice: 60,
          decisionPrice: 6,
          id: 7,
          output: 1,
          quantity: 3,
          totalQuantity: 6,
          usedQuantity: 6,
          buyPrice: 6,
          buyPriceEach: 1,
          components: [
            {
              buyPrice: 60,
              buyPriceEach: 10,
              craft: false,
              decisionPrice: 60,
              id: 4,
              output: 1,
              quantity: 1,
              totalQuantity: 6,
              usedQuantity: 6
            }
          ]
        },
        {
          decisionPrice: 30,
          buyPrice: 300,
          buyPriceEach: 100,
          craft: true,
          craftPrice: 30,
          id: 3,
          output: 1,
          quantity: 5,
          totalQuantity: 10,
          usedQuantity: 3,
          components: [
            {
              decisionPrice: 30,
              buyPrice: 30,
              buyPriceEach: 10,
              craft: false,
              id: 4,
              output: 1,
              quantity: 2,
              totalQuantity: 6,
              usedQuantity: 3
            }
          ]
        },
        {
          craft: false,
          craftPrice: 0,
          decisionPrice: 0,
          id: 5,
          output: 1,
          quantity: 2,
          totalQuantity: 4,
          usedQuantity: 0,
          buyPrice: 0,
          buyPriceEach: 25,
          components: [
            {
              buyPrice: 0,
              buyPriceEach: 1,
              craft: false,
              decisionPrice: 0,
              id: 6,
              output: 1,
              quantity: 100,
              totalQuantity: 0,
              usedQuantity: 0
            }
          ]
        }
      ]
    }

    let usedItemObject = usedItems(tree)
    expect(usedItemObject).to.deep.equal({
      buy: {4: 3, 7: 6},
      available: {3: 7, 4: 3, 5: 4}
    })
  })
})
