<!-- Title -->
<h1 align="center">
  recipe-calculation
</h1>

<!-- Description -->
<h4 align="center">
  Calculate the cheapest tree traversal, price and used items of crafting recipes.
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@gw2efficiency/recipe-calculation">
    <img
      src="https://img.shields.io/npm/v/@gw2efficiency/recipe-calculation?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://github.com/gw2efficiency/recipe-calculation/actions?query=branch%3Amaster+workflow%3A%22Continuous+Integration%22">
    <img
      src="https://img.shields.io/github/workflow/status/gw2efficiency/recipe-calculation/Continuous%20Integration?style=flat-square"
      alt="Build Status"
    />
  </a>

  <a href="https://codecov.io/github/gw2efficiency/recipe-calculation">
    <img
      src="https://img.shields.io/codecov/c/github/gw2efficiency/recipe-calculation/master?style=flat-square"
      alt="Code Coverage"
    />
  </a>
</p>

<!-- Issues -->
<p align="center">
  <i>
    This is part of <a href="https://gw2efficiency.com">gw2efficiency</a>. Please report all issues in <a href="https://github.com/gw2efficiency/issues/issues">the central repository</a>.
  </i>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

```bash
yarn add @gw2efficiency/recipe-calculation
```

The recipe trees this package consumes are generated via
[`@gw2efficiency/recipe-nesting`](https://github.com/gw2efficiency/recipe-nesting).

## Usage

### Calculate the cheapest tree

```ts
import {cheapestTree} from '@gw2efficiency/recipe-calculation'

// How many times do we want to craft this item
// Note: If you want to craft a item 5 times and the output of the
// recipe is 5, it will calculate 1 craft if you pass in amount = 5
const amount = 1

// A nested recipe tree, as generated from "@gw2efficiency/recipe-nesting"
const recipeTree = {
  id: 13243,
  quantity: 5,
  output: 1,
  components: [/* ... */]
}

// The item prices, as a map of item id -> price
const itemPrices = {1: 123, 2: 42, 3: 1337}

// (Optional) The available items, e.g. from the material storage, bank and characters,
// as a map of item id -> amount
const availableItems = {1: 1, 2: 250, 3: 5}

// (Optional) A list of item ids for which crafting is *disabled* when generating the
// cheapest tree (e.g. for excluding precursor crafting or daily cooldowns)
const craftingDisabled = [1337, 42]

// Calculate the tree
const calculatedTree = cheapestTree(amount, recipeTree, itemPrices, availableItems, craftingDisabled)

// The result looks like this:
{
  id: 13243,
  quantity: 5,
  output: 1,
  components: [/* ... */],

  // (The following keys get set for the top level and all sub-components)

  // The total quantity of this component
  totalQuantity: 5,

  // The total used quantity of this component. This is after
  // subtracting the available items of the user. If this is 0
  // then the user owns all items already.
  usedQuantity: 5,

  // The flag if the component should be crafted (true) or bought (false)
  craft: true,

  // Total buy price of the component
  buyPrice: 50,

  // Buy price for one of the components
  buyPriceEach: 10,

  // Total price to craft this component
  craftPrice: 42
}
```

### Update tree quantities & prices

If you want to update the tree, because the `amount`, `availableItems` or `itemPrices` changed or
the user flipped a `craft` flag, you should use this method. This updates the following keys:
`totalQuantity`, `usedQuantity`, `buyPrice`, `buyPriceEach` and `craftPrice`

**This method does not change any `craft` flags (= uses the pre-calculated best tree). If you want
to recalculate the cheapest tree, just use `cheapestTree` again!**

```ts
import { updateTree } from '@gw2efficiency/recipe-calculation'

// How many times do we want to craft this item
const amount = 1

// The already calculated tree (from "cheapestTree") that got changed
const calculatedTree = {
  /* ... */
}

// The item prices, as a map of item id -> price
const itemPrices = { 1: 123, 2: 42, 3: 1337 }

// (Optional) The available items, e.g. from the material storage, bank and characters,
// as a map of item id -> amount
const availableItems = { 1: 1, 2: 250, 3: 5 }

// Update the tree
const updatedTree = updateTree(amount, calculatedTree, itemPrices, availableItems)
```

### Generate list of items to buy & used available items

```ts
import {usedItems} from '@gw2efficiency/recipe-calculation'

// Get all item ids of a calculated recipe tree (after "cheapestTree")
const calculatedTree = {/* ... */}
const usedItemsMap = usedItems(calculatedTree)

// Generates a object with maps of item id -> amount
{
  buy: {1: 5, 3: 10, /* ... */},
  available: {1: 10, 2: 5, /* ... */}
}
```

### Generate list of crafting steps

```ts
import {craftingSteps} from '@gw2efficiency/recipe-calculation'

// Get the crafting steps of a calculated recipe tree (after "cheapestTree")
const calculatedTree = {/* ... */}
const craftingStepsArray = craftingSteps(calculatedTree)

// Generates an array with the crafting steps in correct order
[
  {
    id: 1,
    quantity: 10,
    components: [
      {id: 2, quantity: 20},
      {id: 3, quantity: 10}
    ]
  },
  // ...
]
```

### Static content

```ts
import {staticItems} from '@gw2efficiency/recipe-calculation'

// Get all item ids of items that can only be crafted once a day
const dailyCooldowns = staticItems.dailyCooldowns
// -> [1, 2, 3, 4]

// Get all item ids of items that can be bought, where the item or the immediate component
// (e.g. Deldrimor Steel Ingot-> Lump of Mithrillium) is a daily cooldown
const buyableDailyCooldowns = staticItems.buyableDailyCooldowns
// -> [1, 2, 3, 4]

// Get an object with item ids as keys of all vendor-buyable items
const vendorItems = staticItems.vendorItems
// Returns an object like this:
{
  20798: {
    type: 'spirit-shard', // can be gold, spirit shards, karma or dungeon currency
    quantity: 1, // quantity the vendor sells
    cost: 1, // copper the vendor sells the quantity for
    npcs: [
      {name: 'Miyani / Mystic Forge Attendant', position: 'Mystic Forge'}
    ]
  },
  // ...
}
```

### Helpers

```ts
import { recipeItems, dailyCooldowns, useVendorPrices } from '@gw2efficiency/recipe-calculation'

// Get all item ids of a recipe tree (before or after "cheapestTree")
const recipeTree = {
  /* ... */
}
const itemIds = recipeItems(recipeTree)
// -> [1, 2, 3, 4]

// Get a map of item id -> count of all needed daily cooldowns (after "cheapestTree")
const calculatedTree = {
  /* ... */
}
const cooldownItemsMap = dailyCooldowns(calculatedTree)
// -> {46740: 3, 66913: 4}

// Overwrite and add all vendor prices to a price array
// To show the users more information afterwards use "staticItems.vendorItems"
const prices = useVendorPrices({ 1: 1233, 19750: 50000 })
// -> {1: 1233, 19750: 16, 19924: 48, /* ... */}
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4?s=75" width="75px;" alt="David Reeß"/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/gw2efficiency/recipe-calculation/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/gw2efficiency/recipe-calculation/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/gw2efficiency/recipe-calculation/commits?author=queicherius" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ben.lubar.me/"><img src="https://avatars.githubusercontent.com/u/4257305?v=4?s=75" width="75px;" alt="Ben Lubar"/><br /><sub><b>Ben Lubar</b></sub></a><br /><a href="#data-BenLubar" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/holoxx"><img src="https://avatars.githubusercontent.com/u/16797784?v=4?s=75" width="75px;" alt="Holox"/><br /><sub><b>Holox</b></sub></a><br /><a href="#data-holoxx" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ecmelt"><img src="https://avatars.githubusercontent.com/u/7891512?v=4?s=75" width="75px;" alt="Ecmelt"/><br /><sub><b>Ecmelt</b></sub></a><br /><a href="https://github.com/gw2efficiency/recipe-calculation/commits?author=Ecmelt" title="Code">💻</a> <a href="https://github.com/gw2efficiency/recipe-calculation/commits?author=Ecmelt" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://gw2treasures.com/"><img src="https://avatars.githubusercontent.com/u/2511547?v=4?s=75" width="75px;" alt="darthmaim"/><br /><sub><b>darthmaim</b></sub></a><br /><a href="https://github.com/gw2efficiency/recipe-calculation/commits?author=darthmaim" title="Code">💻</a> <a href="https://github.com/gw2efficiency/recipe-calculation/commits?author=darthmaim" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
