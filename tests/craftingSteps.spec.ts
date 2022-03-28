import craftingSteps from '../src/craftingSteps'

describe('craftingSteps', () => {
  it('gets the correct crafting steps', () => {
    const tree: any = {
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
          min_rating: 400,
          disciplines: ['Armorsmith'],
          recipe_id: 123,
          components: [
            {
              id: 4,
              craft: false,
              totalQuantity: 12,
              usedQuantity: 12,
            },
          ],
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
                      usedQuantity: 6,
                    },
                  ],
                },
              ],
            },
          ],
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
              usedQuantity: 0,
            },
          ],
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
                  usedQuantity: 12,
                },
              ],
            },
          ],
        },
        {
          id: 1337,
          craft: true,
          totalQuantity: 1,
          usedQuantity: 0,
          output: 1,
          components: [
            {
              id: 42,
              craft: true,
              totalQuantity: 6,
              usedQuantity: 6,
              output: 1,
            },
          ],
        },
      ],
    }

    const usedItemObject = craftingSteps(tree)
    expect(usedItemObject).toMatchSnapshot()
  })

  it('gets the correct crafting steps with mystic clovers', () => {
    const tree: any = {
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
              usedQuantity: 12,
            },
          ],
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
                  id: 19675,
                  craft: true,
                  totalQuantity: 3,
                  usedQuantity: 3,
                  output: 1,
                  components: [
                    {
                      id: 99999,
                      craft: false,
                      totalQuantity: 6,
                      usedQuantity: 6,
                    },
                  ],
                },
              ],
            },
          ],
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
              usedQuantity: 0,
            },
          ],
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
                  usedQuantity: 12,
                },
              ],
            },
          ],
        },
      ],
    }

    const usedItemObject = craftingSteps(tree)
    expect(usedItemObject).toMatchSnapshot()
  })

  it('gets the correct crafting steps when merging components', () => {
    const tree: any = {
      id: 1,
      craft: true,
      totalQuantity: 1,
      usedQuantity: 1,
      output: 1,
      components: [
        {
          id: 2,
          craft: true,
          totalQuantity: 1,
          usedQuantity: 1,
          output: 1,
          components: [
            {
              id: 3,
              craft: false,
              totalQuantity: 1,
              usedQuantity: 0,
              output: 1,
              components: [
                {
                  id: 4,
                  craft: false,
                  totalQuantity: 1,
                  usedQuantity: 1,
                  output: 1,
                },
              ],
            },
            {
              id: 5,
              craft: true,
              totalQuantity: 1,
              usedQuantity: 1,
              output: 1,
              components: [
                {
                  id: 6,
                  craft: false,
                  totalQuantity: 1,
                  usedQuantity: 1,
                  output: 1,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          craft: true,
          totalQuantity: 1,
          usedQuantity: 1,
          output: 1,
          components: [
            {
              id: 3,
              craft: true,
              totalQuantity: 1,
              usedQuantity: 1,
              output: 1,
              components: [
                {
                  id: 4,
                  craft: false,
                  totalQuantity: 1,
                  usedQuantity: 1,
                  output: 1,
                },
              ],
            },
            {
              id: 5,
              craft: true,
              totalQuantity: 1,
              usedQuantity: 1,
              output: 1,
              components: [
                {
                  id: 6,
                  craft: false,
                  totalQuantity: 1,
                  usedQuantity: 1,
                  output: 1,
                },
              ],
            },
          ],
        },
      ],
    }

    const usedItemObject = craftingSteps(tree)

    expect(usedItemObject).toMatchSnapshot()
  })
})
