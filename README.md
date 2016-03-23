# recipe-calculation

[![Build Status](https://img.shields.io/travis/gw2efficiency/recipe-calculation.svg?style=flat-square)](https://travis-ci.org/gw2efficiency/recipe-calculation)
[![Coverage Status](https://img.shields.io/codecov/c/github/gw2efficiency/recipe-calculation/master.svg?style=flat-square)](https://codecov.io/github/gw2efficiency/recipe-calculation)

> Calculate the best tree traversal, price and used items of crafting recipes.

## Install

```
npm install gw2e-recipe-calculation
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works).

## Usage outline

- **Calculate the initial best tree**
	- Takes `amount`, `recipeTree`, `itemPrices`, `availableItems` and `craftingDisabled`
	- Calculate the needed quantities for each tree step based on amounts and outputs
	- Go through the tree and adjust the quantities based on `availableItems` (*this should only take items that get actually crafted into account!*)
	- Go through the tree and calculate the crafting prices, compare with the buy prices and set the best `craft` flags
	- Calculate the tree price
- **Flip "craft/buy" toggle**
	- Takes `recipeTree`, `itemPrices` and `availableItems`
	- Go through the tree and adjust the quantities based on `availableItems` for nodes with `craft` set
	- Recalculate the tree price
- **Get a list of used items (own / have to buy)**
- **Get crafting steps**
- Get all item ids from a recipe tree
- Generate a item price map of a list of items and a map of vendor items
- Generate a available materials map of a list of API items
- Generate a short overview about crafting cost & profits
- Generate a short overview about used daily cooldowns

## Tests

```
npm test
```

## Licence

MIT
