export type LimitedRecipe = {
  id: number
  limit: { type: string; quantity: number }
} & Partial<{
  components: { id: number; type: string; quantity: number }[]
}>

export const LIMITED_RECIPES: LimitedRecipe[] = [
  {
    id: 92272,
    components: [{ id: 2, type: 'Currency', quantity: 2668 }],
    limit: { type: 'daily', quantity: 10 },
  }, // Eternal Ice Shard
  {
    id: 103846,
    components: [
      { id: 68063, type: 'Item', quantity: 1 },
      { id: 102494, type: 'Item', quantity: 1 },
      { id: 2, type: 'Currency', quantity: 1050 },
    ],
    limit: { type: 'weekly', quantity: 21 },
  }, // Discounted Shard of Janthir Syntri
  {
    id: 103316,
    components: [
      { id: 68063, type: 'Item', quantity: 3 },
      { id: 102494, type: 'Item', quantity: 3 },
      { id: 2, type: 'Currency', quantity: 1750 },
    ],
    limit: { type: 'weekly', quantity: 21 },
  }, // Shard of Janthir Syntri
  {
    id: 103991,
    components: [
      { id: 68063, type: 'Item', quantity: 1 },
      { id: 103038, type: 'Item', quantity: 1 },
      { id: 2, type: 'Currency', quantity: 1050 },
    ],
    limit: { type: 'weekly', quantity: 21 },
  }, // Discounted Shard of Lowland Shore
  {
    id: 103991,
    components: [
      { id: 68063, type: 'Item', quantity: 3 },
      { id: 103038, type: 'Item', quantity: 3 },
      { id: 2, type: 'Currency', quantity: 1750 },
    ],
    limit: { type: 'weekly', quantity: 21 },
  }, // Shard of Lowland Shore
  {
    id: 102494,
    components: [
      { id: 103038, type: 'Item', quantity: 1 },
      { id: 102558, type: 'Item', quantity: 3 },
      { id: 102503, type: 'Item', quantity: 3 },
    ],
    limit: { type: 'daily', quantity: 3 },
  }, // Curious Mursaat Currency
  {
    id: 102494,
    components: [{ id: 2, type: 'Currency', quantity: 1050 }],
    limit: { type: 'daily', quantity: 3 },
  }, // Curious Mursaat Currency (Karma)
  {
    id: 103038,
    components: [
      { id: 102494, type: 'Item', quantity: 1 },
      { id: 103279, type: 'Item', quantity: 3 },
      { id: 102255, type: 'Item', quantity: 3 },
    ],
    limit: { type: 'daily', quantity: 3 },
  }, // Curious Lowland Honeycomb
  {
    id: 103038,
    components: [{ id: 2, type: 'Currency', quantity: 1050 }],
    limit: { type: 'daily', quantity: 3 },
  }, // Curious Lowland Honeycomb (Karma)
]
