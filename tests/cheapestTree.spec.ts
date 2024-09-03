import { NestedRecipe } from '@gw2efficiency/recipe-nesting'
import { cheapestTree } from '../src'

describe('cheapestTree', () => {
  it('can calculate the cheapest tree correctly', () => {
    const recipeTree: NestedRecipe = {
      id: 1,
      type: 'Recipe',
      prerequisites: [{ type: 'Recipe', id: 124 }],
      min_rating: 300,
      disciplines: ['Amoursmith'],
      quantity: 1,
      output: 1,
      components: [
        { id: 2, type: 'Item', quantity: 1 },
        {
          id: 3,
          type: 'Recipe',
          prerequisites: [{ type: 'Recipe', id: 123 }],
          output: 1,
          min_rating: 200,
          disciplines: ['Amoursmith'],
          quantity: 5,
          components: [
            { id: 4, type: 'Item', quantity: 2 },
            { id: 4, type: 'Currency', quantity: 200 },
            { id: 1, type: 'Currency', quantity: 100 },
          ],
        },
        {
          id: 5,
          type: 'Recipe',
          prerequisites: [{ type: 'Recipe', id: 123 }],
          output: 1,
          min_rating: 200,
          disciplines: ['Amoursmith'],
          quantity: 5,
          components: [{ id: 6, type: 'Item', quantity: 2 }],
        },
      ],
    }
    const prices = { 1: 10, 2: 42, 3: 10, 4: 10, 5: 1000, 6: 10 }

    const calculatedTree = cheapestTree(2, recipeTree, prices)
    expect(calculatedTree).toMatchSnapshot()
  })

  it('can calculate the cheapest tree correctly with available items', () => {
    const recipeTree: NestedRecipe = {
      id: 1,
      type: 'Recipe',
      prerequisites: [{ type: 'Recipe', id: 124 }],
      min_rating: 300,
      disciplines: ['Amoursmith'],
      quantity: 1,
      output: 1,
      components: [
        {
          id: 7,
          type: 'Recipe',
          prerequisites: [{ type: 'Recipe', id: 123 }],
          output: 1,
          min_rating: 200,
          disciplines: ['Amoursmith'],
          quantity: 3,
          components: [{ id: 4, type: 'Item', quantity: 1 }],
        },
        {
          id: 3,
          type: 'Recipe',
          prerequisites: [{ type: 'Recipe', id: 123 }],
          output: 1,
          min_rating: 200,
          disciplines: ['Amoursmith'],
          quantity: 5,
          components: [{ id: 4, type: 'Item', quantity: 2 }],
        },
        {
          id: 5,
          type: 'Recipe',
          prerequisites: [{ type: 'Recipe', id: 123 }],
          output: 1,
          min_rating: 200,
          disciplines: ['Amoursmith'],
          quantity: 2,
          components: [{ id: 6, type: 'Item', quantity: 100 }],
        },
      ],
    }
    const prices = { 1: 10, 3: 100, 4: 10, 5: 25, 6: 1, 7: 1 }
    const availableItems = { 1: 100, 3: 7, 4: 3, 5: 4 }

    const calculatedTree = cheapestTree(2, recipeTree, prices, availableItems, [])
    expect(calculatedTree).toMatchSnapshot()
  })

  it('can calculate the cheapest tree correctly with force buy items', () => {
    const recipeTree: NestedRecipe = {
      id: 1,
      type: 'Recipe',
      prerequisites: [{ type: 'Recipe', id: 124 }],
      min_rating: 300,
      disciplines: ['Amoursmith'],
      quantity: 1,
      output: 1,
      components: [
        {
          id: 3,
          type: 'Recipe',
          prerequisites: [{ type: 'Recipe', id: 123 }],
          output: 1,
          min_rating: 200,
          disciplines: ['Amoursmith'],
          quantity: 5,
          components: [{ id: 4, type: 'Item', quantity: 2 }],
        },
      ],
    }
    const prices = { 1: 10, 3: 100, 4: 10 }

    const calculatedTree = cheapestTree(2, recipeTree, prices, {}, [3])
    expect(calculatedTree).toMatchSnapshot()
  })
})
