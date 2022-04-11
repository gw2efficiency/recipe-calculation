export { cheapestTree } from './cheapestTree'
export { craftingSteps } from './craftingSteps'
export { dailyCooldowns } from './helpers/dailyCooldowns'
export { recipeItems } from './helpers/recipeItems'
export { useVendorPrices } from './helpers/useVendorPrices'
export { updateTree } from './updateTree'
export { usedItems } from './usedItems'
import { DAILY_COOLDOWNS } from './static/dailyCooldowns'
import { VENDOR_ITEMS } from './static/vendorItems'

export const staticItems = {
  dailyCooldowns: DAILY_COOLDOWNS.map((x) => x.id),
  buyableDailyCooldowns: DAILY_COOLDOWNS.filter((x) => x.tradable).map((x) => x.id),
  vendorItems: VENDOR_ITEMS,
}
