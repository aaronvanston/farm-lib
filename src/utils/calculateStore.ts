import { FarmProducers, FarmProducts, FarmSellers } from '../interfaces/farm'

type StoreTypes = FarmProducers | FarmProducts | FarmSellers
type test = FarmProducers[keyof FarmProducers]

const calculateStore = <T extends StoreTypes, K extends keyof T>(
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
