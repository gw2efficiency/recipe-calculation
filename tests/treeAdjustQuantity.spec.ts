
import { treeAdjustQuantity } from '../src/treeAdjustQuantity'

describe('treeAdjustQuantity (total quantity)', () => {
  it('calculates the correct quantity for recipes without components', () => {
    const recipeTree: any = { quantity: 1 }

    const adjustedTree = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('calculates the correct quantity for recipes with components', () => {
    const recipeTree: any = { quantity: 1, components: [{ quantity: 1 }, { quantity: 5 }] }

    const adjustedTree = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('does not modify the initial recipe tree', () => {
    const recipeTree: any = { quantity: 1, components: [{ quantity: 1 }, { quantity: 5 }] }

    const adjustedTree = treeAdjustQuantity(1, recipeTree)
    expect(recipeTree).toMatchSnapshot()
    expect(adjustedTree).toMatchSnapshot()
  })

  it('calculates the correct quantity if an amount is set', () => {
    const recipeTree: any = { quantity: 1, components: [{ quantity: 1 }, { quantity: 5 }] }

    const adjustedTree = treeAdjustQuantity(2, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('calculates the correct quantity if an recipe has a output > 0', () => {
    const recipeTree: any = { quantity: 1, output: 5, components: [{ quantity: 1 }, { quantity: 5 }] }
    const adjustedTreeOne = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTreeOne).toMatchSnapshot()

    const adjustedTreeTwo = treeAdjustQuantity(4, recipeTree)
    expect(adjustedTreeTwo).toMatchSnapshot()

    const adjustedTreeThree = treeAdjustQuantity(25, recipeTree)
    expect(adjustedTreeThree).toMatchSnapshot()
  })

  it('calculates the correct quantity if an sub-recipe has a output > 0', () => {
    const recipeTree: any = {
      quantity: 1,
      output: 2,
      components: [
        { quantity: 1, output: 10 },
        { quantity: 7, output: 5 },
      ],
    }

    const adjustedTreeOne = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTreeOne).toMatchSnapshot()

    const adjustedTreeTwo = treeAdjustQuantity(3, recipeTree)
    expect(adjustedTreeTwo).toMatchSnapshot()
  })

  it('works with a simple real recipe', () => {
    const recipeTree: any = {
      output: 5,
      quantity: 1,
      components: [
        { quantity: 25 },
        { quantity: 10, output: 1, components: [{ quantity: 3 }] },
        { quantity: 4, output: 1, components: [{ quantity: 2 }] },
      ],
    }

    const adjustedTree = treeAdjustQuantity(7, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('works with a complex real recipe', () => {
    const recipeTree: any = {
      quantity: 1,
      output: 1,
      components: [
        { quantity: 5 },
        { quantity: 5 },
        {
          output: 5,
          quantity: 5,
          components: [
            { quantity: 25 },
            { quantity: 10, output: 1, components: [{ quantity: 3 }] },
            { quantity: 4, output: 1, components: [{ quantity: 2 }] },
          ],
        },
      ],
    }

    const adjustedTree = treeAdjustQuantity(2, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })

  it('rounds correctly if the output is percentage based', () => {
    const recipeTree: any = { quantity: 1, components: [{ quantity: 77, output: 0.31 }] }

    const adjustedTree = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTree).toMatchSnapshot()
  })
})

describe('treeAdjustQuantity (used quantity)', () => {
  it('sets correct used quantity without available items', () => {
    const recipeTree: any = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { id: 2, quantity: 1, output: 1 },
        { id: 3, quantity: 5, output: 1 },
      ],
    }
    const availableItems = {}

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
  })

  it('sets correct used quantity with available items', () => {
    const recipeTree: any = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { id: 2, quantity: 1, output: 1 },
        { id: 3, quantity: 5, output: 1 },
        { id: 3, quantity: 5, output: 1 },
        { id: 2, quantity: 1, output: 1 },
      ],
    }
    const availableItems = { 2: 2, 3: 2 }

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
    expect(availableItems).toEqual({ 2: 2, 3: 2 })
  })

  it("doesn't use tree components if the tree result is available or not crafted", () => {
    const recipeTree: any = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { id: 2, quantity: 1, output: 1 },
        {
          id: 3,
          quantity: 1,
          output: 1,
          components: [{ id: 4, quantity: 5, output: 1 }],
        },
        {
          id: 6,
          quantity: 1,
          output: 1,
          craft: false,
          components: [{ id: 4, quantity: 5, output: 1 }],
        },
        {
          id: 5,
          quantity: 1,
          output: 1,
          components: [{ id: 4, quantity: 5, output: 1 }],
        },
      ],
    }
    const availableItems = { 2: 3, 3: 1, 4: 5 }

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
  })

  it("doesn't use tree sub-components if the tree result is not crafted or available", () => {
    const recipeTree: any = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        {
          id: 2,
          quantity: 1,
          output: 1,
          craft: false,
          components: [
            {
              id: 3,
              quantity: 5,
              output: 1,
              craft: true,
              components: [{ id: 4, quantity: 5, output: 1 }],
            },
          ],
        },
        {
          id: 99,
          quantity: 1,
          output: 1,
          components: [
            {
              id: 3,
              quantity: 5,
              output: 1,
              components: [{ id: 4, quantity: 5, output: 1 }],
            },
          ],
        },
        {
          id: 5,
          quantity: 1,
          output: 1,
          craft: true,
          components: [
            {
              id: 6,
              quantity: 5,
              output: 1,
              craft: true,
              components: [{ id: 4, quantity: 5, output: 1 }],
            },
          ],
        },
      ],
    }
    const availableItems = { 99: 1000, 4: 20 }

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
  })

  it('does only craft part of the items if the tree result if partially available', () => {
    const recipeTree: any = {
      id: 0,
      quantity: 1,
      output: 1,
      components: [
        {
          id: 1,
          quantity: 1,
          output: 1,
          components: [{ id: 2, quantity: 1, output: 1 }],
        },
      ],
    }
    const availableItems = { 1: 5, 2: 3 }

    expect(treeAdjustQuantity(10, recipeTree, availableItems)).toMatchSnapshot()
  })

  it('always crafts the root node even if it is available', () => {
    const recipeTree: any = {
      id: 1,
      quantity: 1,
      output: 1,
    }
    const availableItems = { 1: 500 }

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toMatchSnapshot()
  })
})
