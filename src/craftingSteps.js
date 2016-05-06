function craftingStepsWrapper (tree) {
  let steps = craftingSteps(tree)

  // Calculate how many times you actually have to click on "craft"
  // for items with output > 1
  steps = steps.map(step => {
    step.crafts = Math.ceil(step.quantity / step.output)
    delete step.output
    return step
  })

  // Make sure that "Mystic Clovers" get crafted as the first step,
  // since they generate items that are always useful for crafting the other steps
  let mysticCloverId = 19675
  let clovers = steps.find(step => step.id === mysticCloverId)
  if (clovers) {
    steps = steps.filter(step => step.id !== mysticCloverId)
    steps.unshift(clovers)
  }

  return steps
}

// Generate an ordered list of crafting steps
function craftingSteps (tree, steps = []) {
  // Skip any tree parts where nothing needs to be crafted
  if (!tree.components || tree.craft === false) {
    return steps
  }

  // Go through the components first, they have to be crafted before crafting the result
  tree.components.map(component => craftingSteps(component, steps))

  // Go through the existing steps, and if we already have a step
  // with this id, just add up the quantities
  for (let i = 0; i !== steps.length; i++) {
    let step = steps[i]

    if (step.id !== tree.id) {
      continue
    }

    step.quantity += tree.usedQuantity
    step.components = step.components.map(component => {
      let treeComponent = tree.components.find(tC => tC.id === component.id)
      component.quantity += treeComponent.totalQuantity
      return component
    })
    return steps
  }

  // We don't have a step like this yet, push a new one
  steps.push({
    id: tree.id,
    output: tree.output,
    quantity: tree.usedQuantity,
    components: tree.components.map(component => {
      return {id: component.id, quantity: component.totalQuantity}
    })
  })

  return steps
}

module.exports = craftingStepsWrapper
