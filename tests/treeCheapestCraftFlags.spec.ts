import { treeCheapestCraftFlags } from '../src/treeCheapestCraftFlags'

describe('treeCheapestCraftFlags', () => {
  it('sets the cheapest craft flags', () => {
    const recipeTree: any = {
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

    const calculatedTree = treeCheapestCraftFlags(recipeTree, [5])
    expect(calculatedTree).toMatchSnapshot()
  })
})
