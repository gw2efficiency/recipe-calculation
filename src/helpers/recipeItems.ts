import { RecipeTreeWithCraftFlags } from '../types'

// Find all unique item ids used in a recipe tree
export function recipeItems(tree: RecipeTreeWithCraftFlags) {
  if (tree.type === 'Currency') {
    return []
  }

  let ids = [tree.id]

  if (!tree.components) {
    return ids
  }

  tree.components.map((component) => {
    ids = ids.concat(recipeItems(component))
  })

  ids = ids.filter((value, index, self) => self.indexOf(value) === index)

  return ids
}
