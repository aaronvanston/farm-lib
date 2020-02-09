import { FarmStores } from '../interfaces/farm'

const calculateStore = <T extends FarmStores, K extends keyof T>(
  store: T,
  item: K,
  quantity: number
): T => {
  return {
    ...store,
    [item]: ((store[item] || 0) as number) + quantity,
  }
}

export default calculateStore
