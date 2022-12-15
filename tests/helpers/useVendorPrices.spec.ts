import { useVendorPrices } from '../../src'

describe('helpers > useVendorPrices', () => {
  it('overwrites and adds vendor prices to the price object', () => {
    const prices = { 1: 1233, 19750: 50000 }

    const pricesWithVendors = useVendorPrices(prices)
    expect(pricesWithVendors).toEqual({ 1: 1233, 19750: 50000 })
  })
})
