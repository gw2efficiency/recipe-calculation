import { Prerequisites } from '@gw2efficiency/recipe-nesting'
import { RecipeTreeWithCraftFlags } from './types'

const MYSTIC_CLOVER_ID = 19675

export function craftingSteps(tree: RecipeTreeWithCraftFlags) {
  let steps = craftingStepsInner(tree).reverse()

  // We don't care about steps where we have to craft "0" of something
  // This can happen when a crafting tree is updated after the initial calculation
  steps = steps.filter((step) => step.quantity > 0)

  // Make sure that "Mystic Clovers" (and it's components) get crafted as the first steps,
  // since they generate items that are always useful for crafting the other steps
  // Obsidian Shards and Philosopher Stones (required for Mystic Clovers) will be sorted
  // above the Mystic Clovers in the next step when sorting merchants
  const mysticCloverSteps = steps.filter((step) => step.id === MYSTIC_CLOVER_ID)
  steps = steps.filter((step) => step.id !== MYSTIC_CLOVER_ID)
  steps = [...mysticCloverSteps, ...steps]

  // Move merchants to the top of the steps
  const merchantSteps = steps
    .filter(isMerchantWithNoDependencies)
    .sort((a, b) => a.merchant?.name.localeCompare(b.merchant?.name || '') || 0)
  steps = steps.filter((step) => !isMerchantWithNoDependencies(step))
  steps = [...merchantSteps, ...steps]

  return steps.map((step) => ({
    ...step,
    // Calculate how many times you actually have to click on "craft"
    // for items with output > 1 (calculate here when all steps are aggregated)
    crafts: Math.ceil(step.quantity / step.output),
    output: undefined,
  }))
}

interface CraftingStep {
  id: number
  type: 'Item' | 'Recipe' | 'Currency'
  output: number
  quantity: number
  minRating: number | null
  disciplines: Array<string>
  merchant?: { name: string; locations: Array<string> }
  prerequisites: Prerequisites
  components: Array<{ id: number; type: 'Item' | 'Recipe' | 'Currency'; quantity: number }>
  hasCraftedComponents: boolean
}

// Generate an ordered list of crafting steps
function craftingStepsInner(
  tree: RecipeTreeWithCraftFlags,
  steps: Array<CraftingStep> = [],
  index = 0
) {
  const treeComponents = tree.components

  // Skip any tree parts where nothing needs to be crafted
  if (!treeComponents || tree.craft === false || tree.type === 'Currency') {
    return steps
  }

  const hasCraftedComponents = treeComponents.some((component) => component.craft)

  // Go through the existing steps, and if we already have a step
  // with this id, just add up the quantities
  const stepIndex = steps.findIndex((step) => step.id === tree.id)
  if (stepIndex !== -1) {
    steps[stepIndex].quantity += tree.usedQuantity
    steps[stepIndex].components = steps[stepIndex].components.map((component) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const treeComponent = treeComponents.find((x) => x.id === component.id)!

      component.quantity += treeComponent.totalQuantity
      return component
    })

    // If *any* of the steps have crafted components, this flag needs to be set
    if (hasCraftedComponents) {
      steps[stepIndex].hasCraftedComponents = hasCraftedComponents
    }

    index = stepIndex
  }

  // We don't have a step like this yet, push a new one at the given index
  if (stepIndex === -1) {
    steps.splice(index, 0, {
      id: tree.id,
      type: tree.type,
      output: tree.output,
      quantity: tree.usedQuantity,
      minRating: tree.min_rating,
      disciplines: tree.disciplines,
      merchant: tree.merchant,
      prerequisites: tree.prerequisites,
      components: treeComponents.map((component) => ({
        id: component.id,
        type: component.type,
        quantity: component.totalQuantity,
      })),
      hasCraftedComponents,
    })
  }

  // Go through the components and push them after the index of their parent
  treeComponents.map((component) => craftingStepsInner(component, steps, index + 1))
  return steps
}

function isMerchantWithNoDependencies(step: CraftingStep): boolean {
  return (
    step.disciplines.length === 1 &&
    step.disciplines[0] === 'Merchant' &&
    !step.hasCraftedComponents
  )
}
