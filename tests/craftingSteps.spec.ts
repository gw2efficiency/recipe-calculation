import craftingSteps from '../src/craftingSteps'

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

    let usedItemObject = craftingSteps(tree)
    expect(usedItemObject).toEqual([
      {
        id: 7,
        crafts: 15,
        quantity: 15,
        minRating: 400,
        disciplines: ['Armorsmith'],
        recipeId: 123,
        components: [{ id: 4, quantity: 30 }],
      },
      {
        id: 19,
        crafts: 3,
        quantity: 3,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 7, quantity: 3 }],
      },
      {
        id: 3,
        crafts: 3,
        quantity: 3,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 19, quantity: 3 }],
      },
      {
        id: 15,
        crafts: 1,
        quantity: 1,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 7, quantity: 6 }],
      },
      {
        id: 1,
        crafts: 1,
        quantity: 2,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [
          { id: 7, quantity: 6 },
          { id: 3, quantity: 10 },
          { id: 5, quantity: 4 },
          { id: 15, quantity: 1 },
          { id: 1337, quantity: 1 },
        ],
      },
    ])
  })

  it('gets the correct crafting steps with mystic clovers', () => {
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

    let usedItemObject = craftingSteps(tree)
    expect(usedItemObject).toEqual([
      {
        id: 19675,
        crafts: 3,
        quantity: 3,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 99999, quantity: 6 }],
      },
      {
        id: 7,
        crafts: 12,
        quantity: 12,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 4, quantity: 24 }],
      },
      {
        id: 19,
        crafts: 3,
        quantity: 3,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 19675, quantity: 3 }],
      },
      {
        id: 3,
        crafts: 3,
        quantity: 3,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 19, quantity: 3 }],
      },
      {
        id: 15,
        crafts: 1,
        quantity: 1,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 7, quantity: 6 }],
      },
      {
        id: 1,
        crafts: 1,
        quantity: 2,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [
          { id: 7, quantity: 6 },
          { id: 3, quantity: 10 },
          { id: 5, quantity: 4 },
          { id: 15, quantity: 1 },
        ],
      },
    ])
  })

  it('gets the correct crafting steps when merging components', () => {
    let tree = {
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

    let usedItemObject = craftingSteps(tree)

    expect(usedItemObject).toEqual([
      {
        id: 5,
        quantity: 2,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 6, quantity: 2 }],
        crafts: 2,
      },
      {
        id: 3,
        quantity: 1,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [{ id: 4, quantity: 1 }],
        crafts: 1,
      },
      {
        id: 2,
        quantity: 2,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [
          { id: 3, quantity: 2 },
          { id: 5, quantity: 2 },
        ],
        crafts: 2,
      },
      {
        id: 1,
        quantity: 1,
        minRating: undefined,
        disciplines: undefined,
        recipeId: undefined,
        components: [
          { id: 2, quantity: 1 },
          { id: 2, quantity: 1 },
        ],
        crafts: 1,
      },
    ])
  })
})
