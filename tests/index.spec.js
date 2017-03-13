/* eslint-env node, mocha */
import { expect } from 'chai'
import module from '../src/index.js'

describe('module', () => {
  it('exports the correct functions', () => {
    expect(Object.keys(module)).to.deep.equal([
      'cheapestTree',
      'updateTree',
      'usedItems',
      'craftingSteps',
      'recipeItems',
      'dailyCooldowns',
      'useVendorPrices',
      'staticItems'
    ])

    expect(Object.keys(module.staticItems)).to.deep.equal([
      'dailyCooldowns',
      'buyableDailyCooldowns',
      'vendorItems'
    ])

    expect(module.staticItems.dailyCooldowns).to.not.equal(undefined)
    expect(module.staticItems.buyableDailyCooldowns).to.not.equal(undefined)
    expect(module.staticItems.vendorItems).to.not.equal(undefined)
  })
})
