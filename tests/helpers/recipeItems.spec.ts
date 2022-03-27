// @ts-nocheck
import recipeItems from '../../src/helpers/recipeItems'

describe('helpers > recipeItems', () => {
  it('gets all unique item ids of a recipe tree', () => {
    let recipeTree = {
      id: 1,
      components: [
        { id: 2, components: [{ id: 3 }, { id: 4 }] },
        { id: 5 },
        { id: 6, components: [{ id: 3 }] },
      ],
    }

    expect(recipeItems(recipeTree)).toEqual([1, 2, 3, 4, 5, 6])
  })
})
