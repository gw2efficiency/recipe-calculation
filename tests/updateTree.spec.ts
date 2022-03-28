import { clone } from '@devoxa/flocky'
import { updateTree } from '../src/updateTree'

describe('updateTree', () => {
  const calculatedTree = {
    craft: true,
    craftPrice: 384,
    id: 1,
    output: 1,
    quantity: 1,
    totalQuantity: 2,
    usedQuantity: 2,
    decisionPrice: 384,
    buyPrice: 20,
    buyPriceEach: 10,
    components: [
      {
        decisionPrice: 84,
        buyPrice: 84,
        buyPriceEach: 42,
        craft: false,
        id: 2,
        output: 1,
        quantity: 1,
        totalQuantity: 2,
        usedQuantity: 2,
      },
      {
        decisionPrice: 100,
        buyPrice: 100,
        buyPriceEach: 10,
        craft: false,
        craftPrice: 200,
        id: 3,
        output: 1,
        quantity: 5,
        totalQuantity: 10,
        usedQuantity: 10,
        components: [
          {
            decisionPrice: 200,
            buyPrice: 200,
            buyPriceEach: 10,
            craft: false,
            id: 4,
            output: 1,
            quantity: 2,
            totalQuantity: 20,
            usedQuantity: 20,
          },
        ],
      },
      {
        decisionPrice: 200,
        buyPrice: 10000,
        buyPriceEach: 1000,
        craft: true,
        craftPrice: 200,
        id: 5,
        output: 1,
        quantity: 5,
        totalQuantity: 10,
        usedQuantity: 10,
        components: [
          {
            decisionPrice: 200,
            buyPrice: 200,
            buyPriceEach: 10,
            craft: false,
            id: 6,
            output: 1,
            quantity: 2,
            totalQuantity: 20,
            usedQuantity: 20,
          },
        ],
      },
    ],
  }

  it('keeps the tree the same if nothing changed', () => {
    const tree: any = clone(calculatedTree)
    const prices = { 1: 10, 2: 42, 3: 10, 4: 10, 5: 1000, 6: 10 }
    const updatedTree = updateTree(2, tree, prices)
    expect(updatedTree).toEqual(calculatedTree)
  })

  it('updates a tree correctly if the amount, prices or craft flags changed', () => {
    const tree: any = clone(calculatedTree)
    tree.components[1].craft = true
    const prices = { 1: 10, 2: 42, 3: 10, 4: 10, 5: 1000, 6: 11 }
    const updatedTree = updateTree(5, tree, prices)
    expect(updatedTree).toMatchSnapshot()
  })

  it('updates a tree correctly if the available items changed', () => {
    const tree: any = clone(calculatedTree)
    tree.components[1].craft = true
    const prices = { 1: 10, 2: 42, 3: 10, 4: 10, 5: 1000, 6: 11 }
    const updatedTree = updateTree(5, tree, prices, { 2: 1000 })
    expect(updatedTree).toMatchSnapshot()
  })
})