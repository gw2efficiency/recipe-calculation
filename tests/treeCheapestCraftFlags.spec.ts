import treeCheapestCraftFlags from '../src/treeCheapestCraftFlags'

describe('treeCheapestCraftFlags', () => {
  it('sets the cheapest craft flags', () => {
    let recipeTree = {
      id: 1,
      totalQuantity: 1,
      craftPrice: 123,
      components: [
        { id: 2, totalQuantity: 1, craftPrice: 123, buyPrice: 1 },
        { id: 3, totalQuantity: 2, craftPrice: 123 },
        { id: 4, totalQuantity: 2, craftPrice: 123, buyPrice: 555 },
        { id: 5, totalQuantity: 2, craftPrice: 1, buyPrice: 555 },
      ],
    }

    let calculatedTree = treeCheapestCraftFlags(recipeTree, [5])
    expect(calculatedTree).toEqual({
      craft: true,
      craftPrice: 123,
      id: 1,
      totalQuantity: 1,
      components: [
        {
          buyPrice: 1,
          craft: false,
          craftPrice: 123,
          id: 2,
          totalQuantity: 1,
        },
        {
          craft: true,
          craftPrice: 123,
          id: 3,
          totalQuantity: 2,
        },
        {
          buyPrice: 555,
          craft: true,
          craftPrice: 123,
          id: 4,
          totalQuantity: 2,
        },
        {
          buyPrice: 555,
          craft: false,
          craftPrice: 1,
          id: 5,
          totalQuantity: 2,
        },
      ],
    })
  })
})
