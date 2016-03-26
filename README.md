# recipe-calculation

[![Build Status](https://img.shields.io/travis/gw2efficiency/recipe-calculation.svg?style=flat-square)](https://travis-ci.org/gw2efficiency/recipe-calculation)
[![Coverage Status](https://img.shields.io/codecov/c/github/gw2efficiency/recipe-calculation/master.svg?style=flat-square)](https://codecov.io/github/gw2efficiency/recipe-calculation)

> Calculate the best tree traversal, price and used items of crafting recipes.

## Install

```
npm install gw2e-recipe-calculation
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works).

## Usage

### Calculate the initial cheapest tree

```js
const calc = require('gw2e-recipe-calculation')

// How many times do we want to craft this item
// Note: If you want to craft a item 5 times and the output of the
// recipe is 5, it will calculate 1 craft if you pass in amount = 5
let amount = 1

// A nested recipe tree, as generated from "gw2e-recipe-nesting"
let recipeTree = {
  id: 13243,
  quantity: 5,
  output: 1,
  components: [/* ... */]
}

// The item prices, as a map of item id => price
let itemPrices = {1: 123, 2: 42, 3: 1337}

// (Optional) The available items, e.g. from the user's material
// storage, bank and characters
let availableItems = {1: 1, 2: 250, 3: 5}

// (Optional) A list of item ids for which crafting is *disabled* when generating the
// best tree (e.g. for excluding precursor crafting or daily cooldowns)
let craftingDisabled = [1337, 42]

// Calculate!
let tree = calc.cheapestTree(amount, recipeTree, itemPrices, availableItems, craftingDisabled)

// The tree now looks like this:
{
  id: 13243,
  quantity: 5,
  output: 1,
  components: [/* ... */],
  
  // The following keys get set for the top level
  // and all sub-components:
  
  // The total quantity that is needed to craft this component
  totalQuantity: 5,
  
  // The total quantity that this item needs to be created
  // If this is 0 then the user already owns all components
  usedQuantity: 5,
  
  // The flag if the component should be crafted or bought
  craft: true,
  
  // Total buy price of the component
  buyPrice: 50,
  
  // Buy price for one of the components
  buyPriceEach: 10,
  
  // Total price to craft this component
  craftPrice: 42
}
```

### TODO

- **Flip "craft/buy" toggle**
	- Takes `recipeTree`, `itemPrices` and `availableItems`
	- Go through the tree and adjust the quantities based on `availableItems` for nodes with `craft` set
	- Recalculate the tree price
- **Adjust amount**
	- Recalculate the needed quantities for each tree step based on amounts and outputs
	- Go through the tree and adjust the quantities based on `availableItems` for nodes with `craft` set
	- Recalculate the tree price
- **Get a list of used items (own / have to buy)**
- **Get crafting steps**
- Get all item ids from a recipe tree
- Generate a item price map of a list of items and a map of vendor items
- Generate a available materials map of a list of API items
- Generate a short overview about crafting cost & profits
- Generate a short overview about used daily cooldowns
- Generate a short overview about needed professions

## Tests

```
npm test
```

## Licence

MIT
