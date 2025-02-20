import { NestedRecipe } from '@gw2efficiency/recipe-nesting'
import { cheapestTree } from '../src'
import { RecipeTreeWithCraftFlags } from '../src/types'

type SimplifiedTree = {
  id: number
  craft: boolean
  components?: Array<SimplifiedTree>
}

function simplifyTree(tree: RecipeTreeWithCraftFlags): SimplifiedTree {
  return {
    id: tree.id,
    craft: tree.craft,
    components: tree.components?.map((x) => simplifyTree(x)),
  }
}

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
      multipleRecipeCount: 1,
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
          multipleRecipeCount: 1,
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
          multipleRecipeCount: 1,
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
      multipleRecipeCount: 1,
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
          multipleRecipeCount: 1,
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
          multipleRecipeCount: 1,
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
          multipleRecipeCount: 1,
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
      multipleRecipeCount: 1,
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
          multipleRecipeCount: 1,
        },
      ],
    }
    const prices = { 1: 10, 3: 100, 4: 10 }

    const calculatedTree = cheapestTree(2, recipeTree, prices, {}, [3])
    expect(calculatedTree).toMatchSnapshot()
  })

  it('can calculate the cheapest tree correctly with value own items', () => {
    const recipeTree: NestedRecipe = {
      id: 1,
      type: 'Recipe',
      prerequisites: [{ type: 'Recipe', id: 124 }],
      min_rating: 300,
      disciplines: ['Amoursmith'],
      quantity: 1,
      output: 1,
      multipleRecipeCount: 1,
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
          multipleRecipeCount: 1,
        },
      ],
    }

    const prices = { 1: 10, 3: 100, 4: 500 }
    const availableItems = { 3: 4, 4: 100 }

    const calculatedTreeNoOwn = cheapestTree(1, recipeTree, prices)
    const simpleTreeNoOwn = simplifyTree(calculatedTreeNoOwn)

    // Should make the same decisions as if we had no own materials
    const calculatedTree = cheapestTree(1, recipeTree, prices, availableItems, [], true)
    const simpleTree = simplifyTree(calculatedTree)
    expect(calculatedTree).toMatchSnapshot()
    expect(simpleTree).toEqual(simpleTreeNoOwn)

    // Should value own materials as "free" and make other decisions
    const calculatedTreeNoValue = cheapestTree(1, recipeTree, prices, availableItems, [], false)
    const simpleTreeNoValue = simplifyTree(calculatedTreeNoValue)
    expect(simpleTree).not.toEqual(simpleTreeNoValue)
  })

  it('can calculate the cheapest tree correctly with homestead efficiency tiers', () => {
    const recipeTree: NestedRecipe = {
      id: 1,
      type: 'Recipe',
      prerequisites: [{ type: 'Recipe', id: 124 }],
      min_rating: 300,
      disciplines: ['Amoursmith'],
      quantity: 5,
      output: 1,
      multipleRecipeCount: 1,
      components: [
        {
          id: 102205,
          type: 'Recipe',
          prerequisites: [{ type: 'Recipe', id: 123 }],
          output: 1,
          min_rating: 200,
          disciplines: ['Amoursmith'],
          merchant: {
            locations: [],
            name: '"Homestead Refinement—Metal Forge"',
          },
          quantity: 25,
          components: [{ id: 4, type: 'Item', quantity: 4 }],
          multipleRecipeCount: 1,
        },
      ],
    }
    const prices = { 1: 10, 102205: 100, 4: 10 }

    const calculatedTree = cheapestTree(1, recipeTree, prices, {}, [], false, {
      '102306': '0',
      '102205': '2',
      '103049': '0',
    })
    expect(calculatedTree).toMatchSnapshot()
  })
})
