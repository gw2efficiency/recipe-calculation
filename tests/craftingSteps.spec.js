/* eslint-env node, mocha */
const expect = require('chai').expect

const craftingSteps = require('../src/craftingSteps.js')

describe('craftingSteps', () => {
  it('gets the correct crafting steps', () => {
    let tree = {
      id: 1,
      craft: true,
      totalQuantity: 2,
      usedQuantity: 2,
      output: 2,
      components: [
        {
          id: 7,
          craft: true,
          totalQuantity: 6,
          usedQuantity: 6,
          output: 1,
          components: [
            {
              id: 4,
              craft: false,
              totalQuantity: 12,
              usedQuantity: 12
            }
          ]
        },
        {
          id: 3,
          craft: true,
          totalQuantity: 10,
          usedQuantity: 3,
          output: 1,
          components: [
            {
              id: 19,
              craft: true,
              totalQuantity: 3,
              usedQuantity: 3,
              output: 1,
              components: [
                {
                  id: 7,
                  craft: true,
                  totalQuantity: 3,
                  usedQuantity: 3,
                  output: 1,
                  components: [
                    {
                      id: 4,
                      craft: false,
                      totalQuantity: 6,
                      usedQuantity: 6
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 5,
          craft: false,
          totalQuantity: 4,
          usedQuantity: 0,
          output: 1,
          components: [
            {
              id: 6,
              craft: false,
              totalQuantity: 0,
              usedQuantity: 0
            }
          ]
        },
        {
          id: 15,
          craft: true,
          totalQuantity: 1,
          usedQuantity: 1,
          output: 1,
          components: [
            {
              id: 7,
              craft: true,
              totalQuantity: 6,
              usedQuantity: 6,
              output: 1,
              components: [
                {
                  id: 4,
                  craft: false,
                  totalQuantity: 12,
                  usedQuantity: 12
                }
              ]
            }
          ]
        }
      ]
    }

    let usedItemObject = craftingSteps(tree)
    expect(usedItemObject).to.deep.equal([
      {
        id: 7,
        crafts: 15,
        quantity: 15,
        components: [{id: 4, quantity: 30}]
      },
      {
        id: 19,
        crafts: 3,
        quantity: 3,
        components: [{id: 7, quantity: 3}]
      },
      {
        id: 3,
        crafts: 3,
        quantity: 3,
        components: [{id: 19, quantity: 3}]
      },
      {
        id: 15,
        crafts: 1,
        quantity: 1,
        components: [{id: 7, quantity: 6}]
      },
      {
        id: 1,
        crafts: 1,
        quantity: 2,
        components: [
          {id: 7, quantity: 6},
          {id: 3, quantity: 10},
          {id: 5, quantity: 4},
          {id: 15, quantity: 1}
        ]
      }
    ])
  })
})
