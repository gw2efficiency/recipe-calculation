/* eslint-env node, mocha */
const expect = require('chai').expect

const cheapestTree = require('../src/cheapestTree.js')

describe('cheapestTree', () => {
  it('can calculate the cheapest tree correctly', () => {
    let recipeTree = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        {id: 2, quantity: 1},
        {id: 3, quantity: 5, components: [{id: 4, quantity: 2}]},
        {id: 5, quantity: 5, components: [{id: 6, quantity: 2}]}
      ]
    }
    let prices = {1: 10, 2: 42, 3: 10, 4: 10, 5: 1000, 6: 10}

    let calculatedTree = cheapestTree(2, recipeTree, prices)
    expect(calculatedTree).to.deep.equal({
      craft: true,
      craftPrice: 384,
      id: 1,
      output: 1,
      quantity: 1,
      totalQuantity: 2,
      bestPrice: 20,
      buyPrice: 20,
      buyPriceEach: 10,
      components: [
        {
          bestPrice: 84,
          buyPrice: 84,
          buyPriceEach: 42,
          craft: false,
          id: 2,
          output: 1,
          quantity: 1,
          totalQuantity: 2
        },
        {
          bestPrice: 100,
          buyPrice: 100,
          buyPriceEach: 10,
          craft: false,
          craftPrice: 200,
          id: 3,
          output: 1,
          quantity: 5,
          totalQuantity: 10,
          components: [
            {
              bestPrice: 200,
              buyPrice: 200,
              buyPriceEach: 10,
              craft: false,
              id: 4,
              output: 1,
              quantity: 2,
              totalQuantity: 20
            }
          ]
        },
        {
          bestPrice: 200,
          buyPrice: 10000,
          buyPriceEach: 1000,
          craft: true,
          craftPrice: 200,
          id: 5,
          output: 1,
          quantity: 5,
          totalQuantity: 10,
          components: [
            {
              bestPrice: 200,
              buyPrice: 200,
              buyPriceEach: 10,
              craft: false,
              id: 6,
              output: 1,
              quantity: 2,
              totalQuantity: 20
            }
          ]
        }
      ]
    })
  })

  it('can calculate the cheapest tree correctly with force buy items', () => {
    let recipeTree = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        {id: 3, quantity: 5, components: [{id: 4, quantity: 2}]}
      ]
    }
    let prices = {1: 10, 3: 100, 4: 10}

    let calculatedTree = cheapestTree(2, recipeTree, prices, {}, [3])
    expect(calculatedTree).to.deep.equal({
      craft: true,
      craftPrice: 1000,
      id: 1,
      output: 1,
      quantity: 1,
      totalQuantity: 2,
      bestPrice: 20,
      buyPrice: 20,
      buyPriceEach: 10,
      components: [
        {
          bestPrice: 1000,
          buyPrice: 1000,
          buyPriceEach: 100,
          craft: false,
          craftPrice: 200,
          id: 3,
          output: 1,
          quantity: 5,
          totalQuantity: 10,
          components: [
            {
              bestPrice: 200,
              buyPrice: 200,
              buyPriceEach: 10,
              craft: false,
              id: 4,
              output: 1,
              quantity: 2,
              totalQuantity: 20
            }
          ]
        }
      ]
    })
  })
})
