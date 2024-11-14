import { NestedRecipe } from '@gw2efficiency/recipe-nesting'
import { cheapestTree } from '../src'
import { RecipeTreeWithCraftFlags } from '../src/types'
import { clone } from '@devoxa/flocky'
import { JSONValue } from '@devoxa/flocky/dist/typeHelpers'

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

function cloneRecipe(recipe: NestedRecipe): NestedRecipe {
  return clone(recipe as unknown as JSONValue) as unknown as NestedRecipe
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

    const recipeTreeA = cloneRecipe(recipeTree)
    const calculatedTreeNoOwn = cheapestTree(1, recipeTreeA, prices)
    const simpleTreeNoOwn = simplifyTree(calculatedTreeNoOwn)

    // Should make the same decisions as if we had no own materials
    const recipeTreeB = cloneRecipe(recipeTree)
    const calculatedTree = cheapestTree(1, recipeTreeB, prices, availableItems, [], true)
    const simpleTree = simplifyTree(calculatedTree)
    expect(calculatedTree).toMatchSnapshot()
    expect(simpleTree).toEqual(simpleTreeNoOwn)

    // Should value own materials as "free" and make other decisions
    const recipeTreeC = cloneRecipe(recipeTree)
    const calculatedTreeNoValue = cheapestTree(1, recipeTreeC, prices, availableItems, [], false)
    const simpleTreeNoValue = simplifyTree(calculatedTreeNoValue)
    expect(simpleTree).not.toEqual(simpleTreeNoValue)
  })
})
