export default function craftingStepsWrapper(tree: any) {
  let steps = craftingSteps(tree).reverse()

  // We don't care about steps where we have to craft "0" of something
  // This can happen when a crafting tree is updated after the initial calculation
  steps = steps.filter((step: any) => step.quantity > 0)

  // Calculate how many times you actually have to click on "craft"
  // for items with output > 1
  steps = steps.map((step: any) => {
    step.crafts = Math.ceil(step.quantity / step.output)
    delete step.output
    return step
  })

  // Make sure that "Mystic Clovers" get crafted as the first step,
  // since they generate items that are always useful for crafting the other steps
  let mysticCloverId = 19675
  let clovers = steps.find((step: any) => step.id === mysticCloverId)
  if (clovers) {
    steps = steps.filter((step: any) => step.id !== mysticCloverId)
    steps.unshift(clovers)
  }

  return steps
}

// Generate an ordered list of crafting steps
function craftingSteps(tree: any, steps: any = [], index: any = 0) {
  // Skip any tree parts where nothing needs to be crafted
  if (!tree.components || tree.craft === false) {
    return steps
  }

  // Go through the existing steps, and if we already have a step
  // with this id, just add up the quantities
  let stepIndex = steps.findIndex((step: any) => step.id === tree.id)
  if (stepIndex !== -1) {
    steps[stepIndex].quantity += tree.usedQuantity
    steps[stepIndex].components = steps[stepIndex].components.map((component: any) => {
      let treeComponent = tree.components.find((tC: any) => tC.id === component.id)
      component.quantity += treeComponent.totalQuantity
      return component
    })
    index = stepIndex
  }

  // We don't have a step like this yet, push a new one at the given index
  if (stepIndex === -1) {
    steps.splice(index, 0, {
      id: tree.id,
      output: tree.output,
      quantity: tree.usedQuantity,
      minRating: tree.min_rating,
      disciplines: tree.disciplines,
      recipeId: tree.recipe_id,
      components: tree.components.map((component: any) => {
        return { id: component.id, quantity: component.totalQuantity }
      }),
    })
  }

  // Go through the components and push them after the index of their parent
  tree.components.map((component: any) => craftingSteps(component, steps, index + 1))
  return steps
}
