import vendorItems from '../static/vendorItems.js'

// Go through the vendor items and generate a map of vendor prices
let vendorPrices = {}
for (let id in vendorItems) {
  let vendorItem = vendorItems[id]
  if (vendorItem.type !== 'gold') {
    continue
  }

  vendorPrices[id] = Math.round(vendorItem.cost / vendorItem.quantity)
}

// Overwrite and add all vendor prices to a price array
export default function useVendorPrices (prices) {
  return {...prices, ...vendorPrices}
}
