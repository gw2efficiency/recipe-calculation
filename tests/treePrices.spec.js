/* eslint-env node, mocha */
const expect = require('chai').expect

const treePrices = require('../src/treePrices.js')

describe('treePrices', () => {
  it('updates the prices for a tree', () => {
    let recipeTree = {
      id: 1,
      totalQuantity: 1,
      components: [
        {id: 2, totalQuantity: 1},
        {id: 3, totalQuantity: 2}
      ]
    }
    let prices = {1: 123, 2: 1, 3: 2}

    let calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).to.deep.equal({
      craftPrice: 5,
      id: 1,
      totalQuantity: 1,
      decisionPrice: 5,
      buyPrice: 123,
      buyPriceEach: 123,
      components: [
        {
          decisionPrice: 1,
          buyPrice: 1,
          buyPriceEach: 1,
          id: 2,
          totalQuantity: 1
        },
        {
          decisionPrice: 4,
          buyPrice: 4,
          buyPriceEach: 2,
          id: 3,
          totalQuantity: 2
        }
      ]
    })
  })

  it('updates the prices for a tree with used quantities', () => {
    let recipeTree = {
      id: 1,
      usedQuantity: 1,
      components: [
        {id: 2, usedQuantity: 1},
        {id: 3, usedQuantity: 0}
      ]
    }
    let prices = {1: 123, 2: 1, 3: 2000}

    let calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).to.deep.equal({
      craftPrice: 1,
      id: 1,
      usedQuantity: 1,
      decisionPrice: 1,
      buyPrice: 123,
      buyPriceEach: 123,
      components: [
        {
          decisionPrice: 1,
          buyPrice: 1,
          buyPriceEach: 1,
          id: 2,
          usedQuantity: 1
        },
        {
          decisionPrice: 0,
          buyPrice: 0,
          buyPriceEach: 2000,
          id: 3,
          usedQuantity: 0
        }
      ]
    })
  })

  it('updates the prices for a tree with flags correctly', () => {
    let recipeTree = {
      id: 1,
      totalQuantity: 1,
      craft: false,
      components: [
        {id: 2, totalQuantity: 1},
        {id: 3, totalQuantity: 2}
      ]
    }
    let prices = {1: 123, 2: 1, 3: 2}

    let calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).to.deep.equal({
      craftPrice: 5,
      id: 1,
      totalQuantity: 1,
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
          totalQuantity: 1
        },
        {
          decisionPrice: 4,
          buyPrice: 4,
          buyPriceEach: 2,
          id: 3,
          totalQuantity: 2
        }
      ]
    })
  })

  it('updates the prices for a tree with missing buy prices', () => {
    let recipeTree = {
      id: 1,
      totalQuantity: 1,
      components: [
        {id: 2, totalQuantity: 1},
        {
          id: 3,
          totalQuantity: 2,
          components: [
            {id: 4, totalQuantity: 50},
            {id: 5, totalQuantity: 2}
          ]
        }
      ]
    }
    let prices = {1: 123, 2: 1, 3: 2, 5: 10}

    let calculatedTree = treePrices(recipeTree, prices)
    expect(calculatedTree).to.deep.equal({
      craftPrice: 5,
      id: 1,
      totalQuantity: 1,
      decisionPrice: 5,
      buyPrice: 123,
      buyPriceEach: 123,
      components: [
        {
          decisionPrice: 1,
          buyPrice: 1,
          buyPriceEach: 1,
          id: 2,
          totalQuantity: 1
        },
        {
          decisionPrice: 4,
          buyPrice: 4,
          buyPriceEach: 2,
          id: 3,
          totalQuantity: 2,
          components: [
            {
              decisionPrice: false,
              buyPrice: false,
              buyPriceEach: false,
              id: 4,
              totalQuantity: 50
            },
            {
              decisionPrice: 20,
              buyPrice: 20,
              buyPriceEach: 10,
              id: 5,
              totalQuantity: 2
            }
          ],
          craftPrice: 20
        }
      ]
    })
  })
})
