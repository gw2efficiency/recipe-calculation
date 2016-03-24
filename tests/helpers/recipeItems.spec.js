/* eslint-env node, mocha */
const expect = require('chai').expect

const recipeItems = require('../../src/helpers/recipeItems.js')

describe('helpers > recipeItems', () => {
  it('gets all unique item ids of a recipe tree', () => {
    let recipeTree = {
      id: 1,
      components: [
        {id: 2, components: [{id: 3}, {id: 4}]},
        {id: 5},
        {id: 6, components: [{id: 3}]}
      ]
    }

    expect(recipeItems(recipeTree)).to.deep.equal([1, 2, 3, 4, 5, 6])
  })
})
