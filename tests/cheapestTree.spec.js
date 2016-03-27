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
      usedQuantity: 2,
      decisionPrice: 384,
      buyPrice: 20,
      buyPriceEach: 10,
      components: [
        {
          decisionPrice: 84,
          buyPrice: 84,
          buyPriceEach: 42,
          craft: false,
          id: 2,
          output: 1,
          quantity: 1,
          totalQuantity: 2,
          usedQuantity: 2
        },
        {
          decisionPrice: 100,
          buyPrice: 100,
          buyPriceEach: 10,
          craft: false,
          craftPrice: 200,
          id: 3,
          output: 1,
          quantity: 5,
          totalQuantity: 10,
          usedQuantity: 10,
          components: [
            {
              decisionPrice: 200,
              buyPrice: 200,
              buyPriceEach: 10,
              craft: false,
              id: 4,
              output: 1,
              quantity: 2,
              totalQuantity: 20,
              usedQuantity: 20
            }
          ]
        },
        {
          decisionPrice: 200,
          buyPrice: 10000,
          buyPriceEach: 1000,
          craft: true,
          craftPrice: 200,
          id: 5,
          output: 1,
          quantity: 5,
          totalQuantity: 10,
          usedQuantity: 10,
          components: [
            {
              decisionPrice: 200,
              buyPrice: 200,
              buyPriceEach: 10,
              craft: false,
              id: 6,
              output: 1,
              quantity: 2,
              totalQuantity: 20,
              usedQuantity: 20
            }
          ]
        }
      ]
    })
  })

  it('can calculate the cheapest tree correctly with available items', () => {
    let recipeTree = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        {id: 7, quantity: 3, components: [{id: 4, quantity: 1}]},
        {id: 3, quantity: 5, components: [{id: 4, quantity: 2}]},
        {id: 5, quantity: 2, components: [{id: 6, quantity: 100}]}
      ]
    }
    let prices = {1: 10, 3: 100, 4: 10, 5: 25, 6: 1, 7: 1}
    let availableItems = {1: 100, 3: 7, 4: 3, 5: 4}

    let calculatedTree = cheapestTree(2, recipeTree, prices, availableItems, [])
    expect(calculatedTree).to.deep.equal({
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
      usedQuantity: 2,
      decisionPrice: 1000,
      buyPrice: 20,
      buyPriceEach: 10,
      components: [
        {
          decisionPrice: 1000,
          buyPrice: 1000,
          buyPriceEach: 100,
          craft: false,
          craftPrice: 200,
          id: 3,
          output: 1,
          quantity: 5,
          totalQuantity: 10,
          usedQuantity: 10,
          components: [
            {
              decisionPrice: 200,
              buyPrice: 200,
              buyPriceEach: 10,
              craft: false,
              id: 4,
              output: 1,
              quantity: 2,
              totalQuantity: 20,
              usedQuantity: 20
            }
          ]
        }
      ]
    })
  })
})
