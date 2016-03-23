/* eslint-env node, mocha */
const expect = require('chai').expect

const adjustQuantity = require('../src/adjustQuantity.js')

describe('adjustQuantity', () => {
  it('adjusts the correct quantity for recipes without components', () => {
    let recipeTree = {quantity: 1}

    let adjustedTree = adjustQuantity(1, recipeTree)
    expect(adjustedTree).to.be.deep.equal({quantity: 1, output: 1, totalQuantity: 1})
  })

  it('adjusts the correct quantity for recipes with components', () => {
    let recipeTree = {quantity: 1, components: [{quantity: 1}, {quantity: 5}]}

    let adjustedTree = adjustQuantity(1, recipeTree)
    expect(adjustedTree).to.be.deep.equal({
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      components: [
        {quantity: 1, output: 1, totalQuantity: 1},
        {quantity: 5, output: 1, totalQuantity: 5}
      ]
    })
  })

  it('does not modify the initial recipe tree', () => {
    let recipeTree = {quantity: 1, components: [{quantity: 1}, {quantity: 5}]}

    let adjustedTree = adjustQuantity(1, recipeTree)
    expect(recipeTree).to.be.deep.equal({quantity: 1, components: [{quantity: 1}, {quantity: 5}]})
    expect(adjustedTree).to.be.deep.equal({
      quantity: 1,
      output: 1,
      totalQuantity: 1,
      components: [
        {quantity: 1, output: 1, totalQuantity: 1},
        {quantity: 5, output: 1, totalQuantity: 5}
      ]
    })
  })

  it('adjusts the correct quantity if an amount is set', () => {
    let recipeTree = {quantity: 1, components: [{quantity: 1}, {quantity: 5}]}

    let adjustedTree = adjustQuantity(2, recipeTree)
    expect(adjustedTree).to.be.deep.equal({
      quantity: 1,
      output: 1,
      totalQuantity: 2,
      components: [
        {quantity: 1, output: 1, totalQuantity: 2},
        {quantity: 5, output: 1, totalQuantity: 10}
      ]
    })
  })

  it('adjusts the correct quantity if an recipe has a output > 0', () => {
    let recipeTree = {quantity: 1, output: 5, components: [{quantity: 1}, {quantity: 5}]}
    let adjustedTreeOne = adjustQuantity(1, recipeTree)
    expect(adjustedTreeOne, 'Craft a single item').to.be.deep.equal({
      quantity: 1,
      output: 5,
      totalQuantity: 5,
      components: [
        {quantity: 1, output: 1, totalQuantity: 1},
        {quantity: 5, output: 1, totalQuantity: 5}
      ]
    })

    let adjustedTreeTwo = adjustQuantity(4, recipeTree)
    expect(adjustedTreeTwo, 'Craft multiple items in the same batch').to.be.deep.equal({
      quantity: 1,
      output: 5,
      totalQuantity: 5,
      components: [
        {quantity: 1, output: 1, totalQuantity: 1},
        {quantity: 5, output: 1, totalQuantity: 5}
      ]
    })

    let adjustedTreeThree = adjustQuantity(25, recipeTree)
    expect(adjustedTreeThree, 'Craft multiple batches').to.be.deep.equal({
      quantity: 1,
      output: 5,
      totalQuantity: 25,
      components: [
        {quantity: 1, output: 1, totalQuantity: 5},
        {quantity: 5, output: 1, totalQuantity: 25}
      ]
    })
  })

  it('adjusts the correct quantity if an sub-recipe has a output > 0', () => {
    let recipeTree = {quantity: 1, output: 2, components: [{quantity: 1, output: 10}, {quantity: 7, output: 5}]}
    let adjustedTreeOne = adjustQuantity(1, recipeTree)
    expect(adjustedTreeOne, 'Craft a single item').to.be.deep.equal({
      quantity: 1,
      output: 2,
      totalQuantity: 2,
      components: [
        {quantity: 1, output: 10, totalQuantity: 10},
        {quantity: 7, output: 5, totalQuantity: 10}
      ]
    })

    let adjustedTreeTwo = adjustQuantity(3, recipeTree)
    expect(adjustedTreeTwo, 'Craft multiple batches').to.be.deep.equal({
      quantity: 1,
      output: 2,
      totalQuantity: 4,
      components: [
        {quantity: 1, output: 10, totalQuantity: 10},
        {quantity: 7, output: 5, totalQuantity: 15}
      ]
    })
  })

  it('works with a simple real recipe', () => {
    let recipeTree = {
      output: 5,
      quantity: 1,
      components: [
        {quantity: 25},
        {quantity: 10, output: 1, components: [{quantity: 3}]},
        {quantity: 4, output: 1, components: [{quantity: 2}]}
      ]
    }

    let adjustedTree = adjustQuantity(7, recipeTree)
    expect(adjustedTree).to.deep.equal({
      output: 5,
      quantity: 1,
      totalQuantity: 10,
      components: [
        {quantity: 25, output: 1, totalQuantity: 50},
        {quantity: 10, output: 1, totalQuantity: 20, components: [{quantity: 3, output: 1, totalQuantity: 60}]},
        {quantity: 4, output: 1, totalQuantity: 8, components: [{quantity: 2, output: 1, totalQuantity: 16}]}
      ]
    })
  })

  it('works with a complex real recipe', () => {
    let recipeTree = {
      quantity: 1,
      output: 1,
      components: [
        {quantity: 5},
        {quantity: 5},
        {
          output: 5,
          quantity: 5,
          components: [
            {quantity: 25},
            {quantity: 10, output: 1, components: [{quantity: 3}]},
            {quantity: 4, output: 1, components: [{quantity: 2}]}
          ]
        }
      ]
    }

    let adjustedTree = adjustQuantity(2, recipeTree)
    expect(adjustedTree).to.deep.equal({
      quantity: 1,
      output: 1,
      totalQuantity: 2,
      components: [
        {quantity: 5, output: 1, totalQuantity: 10},
        {quantity: 5, output: 1, totalQuantity: 10},
        {
          output: 5,
          quantity: 5,
          totalQuantity: 10,
          components: [
            {quantity: 25, output: 1, totalQuantity: 50},
            {output: 1, quantity: 10, totalQuantity: 20, components: [{quantity: 3, output: 1, totalQuantity: 60}]},
            {output: 1, quantity: 4, totalQuantity: 8, components: [{quantity: 2, output: 1, totalQuantity: 16}]}
          ]
        }
      ]
    })
  })
})
