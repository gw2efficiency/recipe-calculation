import * as recipeCalculation from '../src/index'

describe('recipeCalculation', () => {
  it('exports the correct functions', () => {
    expect(Object.keys(recipeCalculation)).toEqual([
      'cheapestTree',
      'craftingSteps',
      'dailyCooldowns',
      'recipeItems',
      'useVendorPrices',
      'updateTree',
      'usedItems',
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
