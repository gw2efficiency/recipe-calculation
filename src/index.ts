export { cheapestTree } from './cheapestTree'
export { updateTree } from './updateTree'
export { usedItems } from './usedItems'
export { craftingSteps } from './craftingSteps'
export { recipeItems } from './helpers/recipeItems'
export { dailyCooldowns } from './helpers/dailyCooldowns'
export { useVendorPrices } from './helpers/useVendorPrices'
import { DAILY_COOLDOWNS } from './static/dailyCooldowns'
import { VENDOR_ITEMS } from './static/vendorItems'

export const staticItems = {
  dailyCooldowns: DAILY_COOLDOWNS.map((x) => x.id),
  buyableDailyCooldowns: DAILY_COOLDOWNS.filter((x) => x.tradable).map((x) => x.id),
  vendorItems: VENDOR_ITEMS,
}
