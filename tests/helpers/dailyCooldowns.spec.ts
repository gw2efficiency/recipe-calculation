import dailyCooldowns from '../../src/helpers/dailyCooldowns'

describe('helpers > dailyCooldowns', () => {
  it('gets all daily cooldowns from a recipe tree', () => {
    const tree: any = {
      id: 1,
      craft: true,
      totalQuantity: 2,
      usedQuantity: 2,
      components: [
        {
          id: 66913,
          craft: false,
          totalQuantity: 6,
          usedQuantity: 6,
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
          id: 46740,
          craft: true,
          totalQuantity: 10,
          usedQuantity: 3,
          components: [
            {
              id: 19,
              craft: true,
              totalQuantity: 3,
              usedQuantity: 3,
              components: [
                {
                  id: 66913,
                  craft: true,
                  totalQuantity: 3,
                  usedQuantity: 3,
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
          id: 66913,
          craft: true,
          totalQuantity: 1,
          usedQuantity: 1,
          components: [
            {
              id: 7,
              craft: true,
              totalQuantity: 6,
              usedQuantity: 6,
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
          id: 46736,
          craft: true,
          totalQuantity: 1,
          usedQuantity: 1,
        },
      ],
    }

    expect(dailyCooldowns(tree)).toEqual({
      46740: 3,
      66913: 4,
    })
  })
})
