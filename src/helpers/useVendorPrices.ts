import { VENDOR_ITEMS } from '../static/vendorItems'

// Go through the vendor items and generate a map of vendor prices
const vendorPrices: Record<string, number> = {}
for (const _id in VENDOR_ITEMS) {
  const id = _id as unknown as keyof typeof VENDOR_ITEMS
  const vendorItem = VENDOR_ITEMS[id]

  if (vendorItem.type !== 'gold') {
    continue
  }

  vendorPrices[id] = Math.round(vendorItem.cost / vendorItem.quantity)
}

// Overwrite and add all vendor prices to the price map
export function useVendorPrices(priceMap: Record<string, number>): Record<string, number> {
  return { ...priceMap, ...vendorPrices }
}
