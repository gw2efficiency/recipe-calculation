/* eslint-env node, mocha */
const expect = require('chai').expect

const module = require('../src/index.js')

describe('module', () => {
  it('exports the correct functions', () => {
    expect(Object.keys(module)).to.deep.equal(['cheapestTree', 'usedItems', 'recipeItems'])
  })
})
