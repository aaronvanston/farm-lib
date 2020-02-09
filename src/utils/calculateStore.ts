import { FarmStores } from '../interfaces/farm'

const calculateStore = <T extends FarmStores, K extends keyof T>(
  store: T,
  item: K,
  quantity: number
): T => {
  const storeItem = store[item] || 0
  if (typeof storeItem === 'number') {
    return {
      ...store,
      [item]: (store[item] || 0) + quantity,
    }
  }
  return {
    ...store,
  }
}

export default calculateStore
