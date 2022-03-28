// @ts-nocheck
import cheapestTree from '../src/cheapestTree'

describe('cheapestTree', () => {
  it('can calculate the cheapest tree correctly', () => {
    const recipeTree = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { id: 2, quantity: 1 },
        { id: 3, quantity: 5, components: [{ id: 4, quantity: 2 }] },
        { id: 5, quantity: 5, components: [{ id: 6, quantity: 2 }], recipe_id: 123 },
      ],
    }
    const prices = { 1: 10, 2: 42, 3: 10, 4: 10, 5: 1000, 6: 10 }

    const calculatedTree = cheapestTree(2, recipeTree, prices)
    expect(calculatedTree).toMatchSnapshot()
  })

  it('can calculate the cheapest tree correctly with available items', () => {
    const recipeTree = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [
        { id: 7, quantity: 3, components: [{ id: 4, quantity: 1 }] },
        { id: 3, quantity: 5, components: [{ id: 4, quantity: 2 }] },
        { id: 5, quantity: 2, components: [{ id: 6, quantity: 100 }] },
      ],
    }
    const prices = { 1: 10, 3: 100, 4: 10, 5: 25, 6: 1, 7: 1 }
    const availableItems = { 1: 100, 3: 7, 4: 3, 5: 4 }

    const calculatedTree = cheapestTree(2, recipeTree, prices, availableItems, [])
    expect(calculatedTree).toMatchSnapshot()
  })

  it('can calculate the cheapest tree correctly with force buy items', () => {
    const recipeTree = {
      id: 1,
      quantity: 1,
      output: 1,
      components: [{ id: 3, quantity: 5, components: [{ id: 4, quantity: 2 }] }],
    }
    const prices = { 1: 10, 3: 100, 4: 10 }

    const calculatedTree = cheapestTree(2, recipeTree, prices, {}, [3])
    expect(calculatedTree).toMatchSnapshot()
  })
})
