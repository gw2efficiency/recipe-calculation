import module from '../src/index'

describe('module', () => {
  it('exports the correct functions', () => {
    expect(Object.keys(module)).toEqual([
      'cheapestTree',
      'updateTree',
      'usedItems',
      'craftingSteps',
      'recipeItems',
      'dailyCooldowns',
      'useVendorPrices',
      'staticItems',
    ])

    expect(Object.keys(module.staticItems)).toEqual([
      'dailyCooldowns',
      'buyableDailyCooldowns',
      'vendorItems',
    ])

    expect(module.staticItems.dailyCooldowns).toBeDefined()
    expect(module.staticItems.buyableDailyCooldowns).toBeDefined()
    expect(module.staticItems.vendorItems).toBeDefined()
  })
})
