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
    quantity: tree.usedQuantity,
    components: tree.components.map(component => {
      return {id: component.id, quantity: component.totalQuantity}
    })
  })

  return steps
}

module.exports = craftingSteps
