const staticDailyCooldowns = require('../static/dailyCooldowns.js').dailyCooldowns

// Get a list of daily cooldowns used in the recipe
function dailyCooldowns (tree, breakdown = {}) {
  if (!tree.components || tree.craft === false) {
    return breakdown
  }

  if (staticDailyCooldowns.indexOf(tree.id) !== -1) {
    breakdown[tree.id] = (breakdown[tree.id] || 0) + tree.usedQuantity
  }

  tree.components.map(component => dailyCooldowns(component, breakdown))
  return breakdown
}

module.exports = dailyCooldowns
