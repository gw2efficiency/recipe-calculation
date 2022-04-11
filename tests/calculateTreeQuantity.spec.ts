import { calculateTreeQuantity } from '../src/calculateTreeQuantity'
import { RecipeTree, RecipeTreeWithCraftFlags } from '../src/types'

const RECIPE_PARTIAL = {
  id: 1,
  type: 'Recipe' as const,
  output: 1,
  min_rating: 400,
  recipe_id: 123,
  disciplines: ['Armorsmith'],
}

const ITEM_PARTIAL = {
  id: 1,
  type: 'Item' as const,
  output: 1,
  min_rating: null,
  disciplines: [],
}

const RECIPE_PARTIAL_WITH_CRAFT_FLAGS = {
  ...RECIPE_PARTIAL,
  craft: true,
  totalQuantity: 1,
  usedQuantity: 1,
  buyPriceEach: 1,
  buyPrice: 1,
  decisionPrice: 1,
}

const ITEM_PARTIAL_WITH_CRAFT_FLAGS = {
  ...ITEM_PARTIAL,
  craft: false,
  totalQuantity: 1,
  usedQuantity: 1,
  buyPriceEach: 1,
  buyPrice: 1,
  decisionPrice: 1,
}

describe('calculateTreeQuantity (total quantity)', () => {
  it('calculates the correct quantity for recipes without components', () => {
    const recipeTree: RecipeTree = { ...RECIPE_PARTIAL, quantity: 1 }

    const adjustedTree = calculateTreeQuantity(1, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('calculates the correct quantity for recipes with components', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      quantity: 1,
      components: [
        { ...ITEM_PARTIAL, quantity: 1 },
        { ...ITEM_PARTIAL, quantity: 5 },
      ],
    }

    const adjustedTree = calculateTreeQuantity(1, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('does not modify the initial recipe tree', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      quantity: 1,
      components: [
        { ...ITEM_PARTIAL, quantity: 1 },
        { ...ITEM_PARTIAL, quantity: 5 },
      ],
    }

    const adjustedTree = calculateTreeQuantity(1, recipeTree)
    expect(recipeTree).toMatchSnapshot()
    expect(adjustedTree).toMatchSnapshot()
  })

  it('calculates the correct quantity if an amount is set', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      quantity: 1,
      components: [
        { ...ITEM_PARTIAL, quantity: 1 },
        { ...ITEM_PARTIAL, quantity: 5 },
        { ...ITEM_PARTIAL, type: 'Currency', quantity: 10 },
      ],
    }

    const adjustedTree = calculateTreeQuantity(2, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('calculates the correct quantity if an recipe has a output > 0', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      quantity: 1,
      output: 5,
      components: [
        { ...ITEM_PARTIAL, quantity: 1 },
        { ...ITEM_PARTIAL, quantity: 5 },
      ],
    }
    const adjustedTreeOne = calculateTreeQuantity(1, recipeTree)
    expect(adjustedTreeOne).toMatchSnapshot()

    const adjustedTreeTwo = calculateTreeQuantity(4, recipeTree)
    expect(adjustedTreeTwo).toMatchSnapshot()

    const adjustedTreeThree = calculateTreeQuantity(25, recipeTree)
    expect(adjustedTreeThree).toMatchSnapshot()
  })

  it('calculates the correct quantity if an sub-recipe has a output > 0', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      quantity: 1,
      output: 2,
      components: [
        { ...ITEM_PARTIAL, quantity: 1, output: 10 },
        { ...ITEM_PARTIAL, quantity: 7, output: 5 },
      ],
    }

    const adjustedTreeOne = calculateTreeQuantity(1, recipeTree)
    expect(adjustedTreeOne).toMatchSnapshot()

    const adjustedTreeTwo = calculateTreeQuantity(3, recipeTree)
    expect(adjustedTreeTwo).toMatchSnapshot()
  })

  it('works with a simple real recipe', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      output: 5,
      quantity: 1,
      components: [
        { ...ITEM_PARTIAL, quantity: 25 },
        {
          ...RECIPE_PARTIAL,
          quantity: 10,
          output: 1,
          components: [{ ...ITEM_PARTIAL, quantity: 3 }],
        },
        {
          ...RECIPE_PARTIAL,
          quantity: 4,
          output: 1,
          components: [{ ...ITEM_PARTIAL, quantity: 2 }],
        },
      ],
    }

    const adjustedTree = calculateTreeQuantity(7, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('works with a complex real recipe', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      quantity: 1,
      output: 1,
      components: [
        { ...ITEM_PARTIAL, quantity: 5 },
        { ...ITEM_PARTIAL, quantity: 5 },
        {
          ...RECIPE_PARTIAL,
          output: 5,
          quantity: 5,
          components: [
            { ...ITEM_PARTIAL, quantity: 25 },
            {
              ...RECIPE_PARTIAL,
              quantity: 10,
              output: 1,
              components: [{ ...ITEM_PARTIAL, quantity: 3 }],
            },
            {
              ...RECIPE_PARTIAL,
              quantity: 4,
              output: 1,
              components: [{ ...ITEM_PARTIAL, quantity: 2 }],
            },
          ],
        },
      ],
    }

    const adjustedTree = calculateTreeQuantity(2, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('rounds correctly if the output is percentage based', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      quantity: 1,
      components: [{ ...ITEM_PARTIAL, quantity: 77, output: 0.31 }],
    }

    const adjustedTree = calculateTreeQuantity(1, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })
})

describe('calculateTreeQuantity (used quantity)', () => {
  it('sets correct used quantity without available items', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { ...ITEM_PARTIAL, id: 2, quantity: 1, output: 1 },
        { ...ITEM_PARTIAL, id: 3, quantity: 5, output: 1 },
      ],
    }
    const availableItems = {}

    expect(calculateTreeQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
  })

  it('sets correct used quantity with available items', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { ...ITEM_PARTIAL, id: 2, type: 'Currency', quantity: 100, output: 1 },
        { ...ITEM_PARTIAL, id: 2, quantity: 1, output: 1 },
        { ...ITEM_PARTIAL, id: 3, quantity: 5, output: 1 },
        { ...ITEM_PARTIAL, id: 3, quantity: 5, output: 1 },
        { ...ITEM_PARTIAL, id: 2, quantity: 1, output: 1 },
      ],
    }
    const availableItems = { 2: 2, 3: 2 }

    expect(calculateTreeQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
    expect(availableItems).toEqual({ 2: 2, 3: 2 })
  })

  it("doesn't use tree components if the tree result is available or not crafted", () => {
    const recipeTree: RecipeTreeWithCraftFlags = {
      ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { ...ITEM_PARTIAL_WITH_CRAFT_FLAGS, id: 2, quantity: 1, output: 1 },
        {
          ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
          id: 3,
          quantity: 1,
          output: 1,
          components: [{ ...ITEM_PARTIAL_WITH_CRAFT_FLAGS, id: 4, quantity: 5, output: 1 }],
        },
        {
          ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
          id: 6,
          quantity: 1,
          output: 1,
          craft: false,
          components: [{ ...ITEM_PARTIAL_WITH_CRAFT_FLAGS, id: 4, quantity: 5, output: 1 }],
        },
        {
          ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
          id: 5,
          quantity: 1,
          output: 1,
          components: [{ ...ITEM_PARTIAL_WITH_CRAFT_FLAGS, id: 4, quantity: 5, output: 1 }],
        },
      ],
    }
    const availableItems = { 2: 3, 3: 1, 4: 5 }

    expect(calculateTreeQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
  })

  it("doesn't use tree sub-components if the tree result is not crafted or available", () => {
    const recipeTree: RecipeTreeWithCraftFlags = {
      ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        {
          ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
          id: 2,
          quantity: 1,
          output: 1,
          craft: false,
          components: [
            {
              ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
              id: 3,
              quantity: 5,
              output: 1,
              craft: true,
              components: [{ ...ITEM_PARTIAL_WITH_CRAFT_FLAGS, id: 4, quantity: 5, output: 1 }],
            },
          ],
        },
        {
          ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
          id: 99,
          quantity: 1,
          output: 1,
          components: [
            {
              ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
              id: 3,
              quantity: 5,
              output: 1,
              components: [{ ...ITEM_PARTIAL_WITH_CRAFT_FLAGS, id: 4, quantity: 5, output: 1 }],
            },
          ],
        },
        {
          ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
          id: 5,
          quantity: 1,
          output: 1,
          craft: true,
          components: [
            {
              ...RECIPE_PARTIAL_WITH_CRAFT_FLAGS,
              id: 6,
              quantity: 5,
              output: 1,
              craft: true,
              components: [{ ...ITEM_PARTIAL_WITH_CRAFT_FLAGS, id: 4, quantity: 5, output: 1 }],
            },
          ],
        },
      ],
    }
    const availableItems = { 99: 1000, 4: 20 }

    expect(calculateTreeQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
  })

  it('does only craft part of the items if the tree result if partially available', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      id: 0,
      quantity: 1,
      output: 1,
      components: [
        {
          ...RECIPE_PARTIAL,
          id: 1,
          quantity: 1,
          output: 1,
          components: [{ ...ITEM_PARTIAL, id: 2, quantity: 1, output: 1 }],
        },
      ],
    }
    const availableItems = { 1: 5, 2: 3 }

    expect(calculateTreeQuantity(10, recipeTree, availableItems)).toMatchSnapshot()
  })

  it('always crafts the root node even if it is available', () => {
    const recipeTree: RecipeTree = {
      ...RECIPE_PARTIAL,
      id: 1,
      quantity: 1,
      output: 1,
    }
    const availableItems = { 1: 500 }

    expect(calculateTreeQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
  })
})
