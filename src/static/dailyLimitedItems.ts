export type DailyLimitedItem = { id: number; dailyLimit: number } & Partial<{
  components: { id: number; type: string; quantity: number }[]
}>

export const DAILY_LIMITED_ITEMS: DailyLimitedItem[] = [
  { id: 92272, components: [{ id: 2, type: 'Currency', quantity: 2668 }], dailyLimit: 10 }, // Eternal Ice Shard
]
