// @ts-nocheck
import { treeAdjustQuantity } from '../src/treeAdjustQuantity'

describe('treeAdjustQuantity (total quantity)', () => {
  it('calculates the correct quantity for recipes without components', () => {
    const recipeTree = { quantity: 1 }

    const adjustedTree = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTree).toEqual({
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
    })
  })

  it('calculates the correct quantity for recipes with components', () => {
    const recipeTree = { quantity: 1, components: [{ quantity: 1 }, { quantity: 5 }] }

    const adjustedTree = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTree).toEqual({
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
      components: [
        { quantity: 1, output: 1, totalQuantity: 1, usedQuantity: 1 },
        { quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 5 },
      ],
    })
  })

  it('does not modify the initial recipe tree', () => {
    const recipeTree = { quantity: 1, components: [{ quantity: 1 }, { quantity: 5 }] }

    const adjustedTree = treeAdjustQuantity(1, recipeTree)
    expect(recipeTree).toEqual({
      quantity: 1,
      components: [{ quantity: 1 }, { quantity: 5 }],
    })
    expect(adjustedTree).toEqual({
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
      components: [
        { quantity: 1, output: 1, totalQuantity: 1, usedQuantity: 1 },
        { quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 5 },
      ],
    })
  })

  it('calculates the correct quantity if an amount is set', () => {
    const recipeTree = { quantity: 1, components: [{ quantity: 1 }, { quantity: 5 }] }

    const adjustedTree = treeAdjustQuantity(2, recipeTree)
    expect(adjustedTree).toEqual({
      quantity: 1,
      output: 1,
      totalQuantity: 2,
      usedQuantity: 2,
      components: [
        { quantity: 1, output: 1, totalQuantity: 2, usedQuantity: 2 },
        { quantity: 5, output: 1, totalQuantity: 10, usedQuantity: 10 },
      ],
    })
  })

  it('calculates the correct quantity if an recipe has a output > 0', () => {
    const recipeTree = { quantity: 1, output: 5, components: [{ quantity: 1 }, { quantity: 5 }] }
    const adjustedTreeOne = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTreeOne).toEqual({
      quantity: 1,
      output: 5,
      totalQuantity: 5,
      usedQuantity: 5,
      components: [
        { quantity: 1, output: 1, totalQuantity: 1, usedQuantity: 1 },
        { quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 5 },
      ],
    })

    const adjustedTreeTwo = treeAdjustQuantity(4, recipeTree)
    expect(adjustedTreeTwo).toEqual({
      quantity: 1,
      output: 5,
      totalQuantity: 5,
      usedQuantity: 5,
      components: [
        { quantity: 1, output: 1, totalQuantity: 1, usedQuantity: 1 },
        { quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 5 },
      ],
    })

    const adjustedTreeThree = treeAdjustQuantity(25, recipeTree)
    expect(adjustedTreeThree).toEqual({
      quantity: 1,
      output: 5,
      totalQuantity: 25,
      usedQuantity: 25,
      components: [
        { quantity: 1, output: 1, totalQuantity: 5, usedQuantity: 5 },
        { quantity: 5, output: 1, totalQuantity: 25, usedQuantity: 25 },
      ],
    })
  })

  it('calculates the correct quantity if an sub-recipe has a output > 0', () => {
    const recipeTree = {
      quantity: 1,
      output: 2,
      components: [
        { quantity: 1, output: 10 },
        { quantity: 7, output: 5 },
      ],
    }
    const adjustedTreeOne = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTreeOne).toEqual({
      quantity: 1,
      output: 2,
      totalQuantity: 2,
      usedQuantity: 2,
      components: [
        { quantity: 1, output: 10, totalQuantity: 10, usedQuantity: 10 },
        { quantity: 7, output: 5, totalQuantity: 10, usedQuantity: 10 },
      ],
    })

    const adjustedTreeTwo = treeAdjustQuantity(3, recipeTree)
    expect(adjustedTreeTwo).toEqual({
      quantity: 1,
      output: 2,
      totalQuantity: 4,
      usedQuantity: 4,
      components: [
        { quantity: 1, output: 10, totalQuantity: 10, usedQuantity: 10 },
        { quantity: 7, output: 5, totalQuantity: 15, usedQuantity: 15 },
      ],
    })
  })

  it('works with a simple real recipe', () => {
    const recipeTree = {
      output: 5,
      quantity: 1,
      components: [
        { quantity: 25 },
        { quantity: 10, output: 1, components: [{ quantity: 3 }] },
        { quantity: 4, output: 1, components: [{ quantity: 2 }] },
      ],
    }

    const adjustedTree = treeAdjustQuantity(7, recipeTree)
    expect(adjustedTree).toEqual({
      output: 5,
      quantity: 1,
      totalQuantity: 10,
      usedQuantity: 10,
      components: [
        { quantity: 25, output: 1, totalQuantity: 50, usedQuantity: 50 },
        {
          quantity: 10,
          output: 1,
          totalQuantity: 20,
          usedQuantity: 20,
          components: [{ quantity: 3, output: 1, totalQuantity: 60, usedQuantity: 60 }],
        },
        {
          quantity: 4,
          output: 1,
          totalQuantity: 8,
          usedQuantity: 8,
          components: [{ quantity: 2, output: 1, totalQuantity: 16, usedQuantity: 16 }],
        },
      ],
    })
  })

  it('works with a complex real recipe', () => {
    const recipeTree = {
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
    expect(adjustedTree).toEqual({
      quantity: 1,
      output: 1,
      totalQuantity: 2,
      usedQuantity: 2,
      components: [
        { quantity: 5, output: 1, totalQuantity: 10, usedQuantity: 10 },
        { quantity: 5, output: 1, totalQuantity: 10, usedQuantity: 10 },
        {
          output: 5,
          quantity: 5,
          totalQuantity: 10,
          usedQuantity: 10,
          components: [
            { quantity: 25, output: 1, totalQuantity: 50, usedQuantity: 50 },
            {
              output: 1,
              quantity: 10,
              totalQuantity: 20,
              usedQuantity: 20,
              components: [{ quantity: 3, output: 1, totalQuantity: 60, usedQuantity: 60 }],
            },
            {
              output: 1,
              quantity: 4,
              totalQuantity: 8,
              usedQuantity: 8,
              components: [{ quantity: 2, output: 1, totalQuantity: 16, usedQuantity: 16 }],
            },
          ],
        },
      ],
    })
  })

  it('rounds correctly if the output is percentage based', () => {
    const recipeTree = { quantity: 1, components: [{ quantity: 77, output: 0.31 }] }

    const adjustedTree = treeAdjustQuantity(1, recipeTree)
    expect(adjustedTree).toEqual({
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
      components: [{ quantity: 77, output: 0.31, totalQuantity: 77, usedQuantity: 77 }],
    })
  })
})

describe('treeAdjustQuantity (used quantity)', () => {
  it('sets correct used quantity without available items', () => {
    const recipeTree = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { id: 2, quantity: 1, output: 1 },
        { id: 3, quantity: 5, output: 1 },
      ],
    }
    const availableItems = {}

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toEqual({
      id: 1,
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
      components: [
        { id: 2, quantity: 1, output: 1, totalQuantity: 1, usedQuantity: 1 },
        { id: 3, quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 5 },
      ],
    })
  })

  it('sets correct used quantity with available items', () => {
    const recipeTree = {
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

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toEqual({
      id: 1,
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
      components: [
        { id: 2, quantity: 1, output: 1, totalQuantity: 1, usedQuantity: 0 },
        { id: 3, quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 3 },
        { id: 3, quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 5 },
        { id: 2, quantity: 1, output: 1, totalQuantity: 1, usedQuantity: 0 },
      ],
    })
    expect(availableItems).toEqual({
      2: 2,
      3: 2,
    })
  })

  it("doesn't use tree components if the tree result is available or not crafted", () => {
    const recipeTree = {
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

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toEqual({
      id: 1,
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
      components: [
        { id: 2, quantity: 1, output: 1, totalQuantity: 1, usedQuantity: 0 },
        {
          id: 3,
          quantity: 1,
          output: 1,
          totalQuantity: 1,
          usedQuantity: 0,
          components: [{ id: 4, quantity: 5, output: 1, totalQuantity: 0, usedQuantity: 0 }],
        },
        {
          id: 6,
          quantity: 1,
          output: 1,
          totalQuantity: 1,
          usedQuantity: 1,
          craft: false,
          components: [{ id: 4, quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 5 }],
        },
        {
          id: 5,
          quantity: 1,
          output: 1,
          totalQuantity: 1,
          usedQuantity: 1,
          components: [{ id: 4, quantity: 5, output: 1, totalQuantity: 5, usedQuantity: 0 }],
        },
      ],
    })
  })

  it("doesn't use tree sub-components if the tree result is not crafted or available", () => {
    const recipeTree = {
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

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toEqual({
      id: 1,
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
      components: [
        {
          id: 2,
          quantity: 1,
          output: 1,
          craft: false,
          totalQuantity: 1,
          usedQuantity: 1,
          components: [
            {
              id: 3,
              quantity: 5,
              output: 1,
              craft: true,
              totalQuantity: 5,
              usedQuantity: 5,
              components: [{ id: 4, quantity: 5, output: 1, totalQuantity: 25, usedQuantity: 25 }],
            },
          ],
        },
        {
          id: 99,
          quantity: 1,
          output: 1,
          totalQuantity: 1,
          usedQuantity: 0,
          components: [
            {
              id: 3,
              quantity: 5,
              output: 1,
              totalQuantity: 0,
              usedQuantity: 0,
              components: [{ id: 4, quantity: 5, output: 1, totalQuantity: 0, usedQuantity: 0 }],
            },
          ],
        },
        {
          id: 5,
          quantity: 1,
          output: 1,
          craft: true,
          totalQuantity: 1,
          usedQuantity: 1,
          components: [
            {
              id: 6,
              quantity: 5,
              output: 1,
              craft: true,
              totalQuantity: 5,
              usedQuantity: 5,
              components: [{ id: 4, quantity: 5, output: 1, totalQuantity: 25, usedQuantity: 5 }],
            },
          ],
        },
      ],
    })
  })

  it('does only craft part of the items if the tree result if partially available', () => {
    const recipeTree = {
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

    expect(treeAdjustQuantity(10, recipeTree, availableItems)).toEqual({
      id: 0,
      quantity: 1,
      output: 1,
      totalQuantity: 10,
      usedQuantity: 10,
      components: [
        {
          id: 1,
          quantity: 1,
          output: 1,
          totalQuantity: 10,
          usedQuantity: 5,
          components: [
            {
              id: 2,
              quantity: 1,
              output: 1,
              totalQuantity: 5,
              usedQuantity: 2,
            },
          ],
        },
      ],
    })
  })

  it('always crafts the root node even if it is available', () => {
    const recipeTree = {
      id: 1,
      quantity: 1,
      output: 1,
    }
    const availableItems = { 1: 500 }

    expect(treeAdjustQuantity(1, recipeTree, availableItems)).toEqual({
      id: 1,
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      usedQuantity: 1,
    })
  })
})
