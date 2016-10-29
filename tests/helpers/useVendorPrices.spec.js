/* eslint-env node, mocha */
import {expect} from 'chai'
import useVendorPrices from '../../src/helpers/useVendorPrices.js'

describe('helpers > useVendorPrices', () => {
  it('overwrites and adds vendor prices to the price object', () => {
    let prices = {1: 1233, 19750: 50000}

    prices = useVendorPrices(prices)
    expect(prices[1]).to.equal(1233)
    expect(prices[19750]).to.equal(16)
    expect(prices[13009]).to.equal(100000)
  })
})
