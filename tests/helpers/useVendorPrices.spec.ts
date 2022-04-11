import { useVendorPrices } from '../../src'

describe('helpers > useVendorPrices', () => {
  it('overwrites and adds vendor prices to the price object', () => {
    const prices = { 1: 1233, 19750: 50000 }

    const pricesWithVendors = useVendorPrices(prices)
    expect(pricesWithVendors[1]).toEqual(1233)
    expect(pricesWithVendors[19750]).toEqual(16)
    expect(pricesWithVendors[13009]).toEqual(100000)
  })
})
