import * as recipeCalculation from '../src/index'

describe('recipeCalculation', () => {
  it('exports the correct functions', () => {
    expect(Object.keys(recipeCalculation)).toEqual([
      'cheapestTree',
      'updateTree',
      'usedItems',
      'craftingSteps',
      'recipeItems',
      'dailyCooldowns',
      'useVendorPrices',
      'staticItems',
    ])

    expect(Object.keys(recipeCalculation.staticItems)).toEqual([
      'dailyCooldowns',
      'buyableDailyCooldowns',
      'vendorItems',
    ])

    expect(recipeCalculation.staticItems.dailyCooldowns).toBeDefined()
    expect(recipeCalculation.staticItems.buyableDailyCooldowns).toBeDefined()
    expect(recipeCalculation.staticItems.vendorItems).toBeDefined()
  })
})
