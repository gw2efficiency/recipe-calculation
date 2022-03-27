import _cheapestTree from './cheapestTree'
import _updateTree from './updateTree'
import _usedItems from './usedItems'
import _craftingSteps from './craftingSteps'
import _recipeItems from './helpers/recipeItems'
import _dailyCooldowns from './helpers/dailyCooldowns'
import _useVendorPrices from './helpers/useVendorPrices'
import { DAILY_COOLDOWNS } from './static/dailyCooldowns'
import { VENDOR_ITEMS } from './static/vendorItems'

const _staticItems = {
  dailyCooldowns: DAILY_COOLDOWNS.map((x) => x.id),
  buyableDailyCooldowns: DAILY_COOLDOWNS.filter((x) => x.tradable).map((x) => x.id),
  vendorItems: VENDOR_ITEMS,
}

export default {
  cheapestTree: _cheapestTree,
  updateTree: _updateTree,
  usedItems: _usedItems,
  craftingSteps: _craftingSteps,
  recipeItems: _recipeItems,
  dailyCooldowns: _dailyCooldowns,
  useVendorPrices: _useVendorPrices,
  staticItems: _staticItems,
}

export const cheapestTree = _cheapestTree
export const updateTree = _updateTree
export const usedItems = _usedItems
export const craftingSteps = _craftingSteps
export const recipeItems = _recipeItems
export const dailyCooldowns = _dailyCooldowns
export const useVendorPrices = _useVendorPrices
export const staticItems = _staticItems
