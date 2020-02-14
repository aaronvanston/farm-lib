import { FarmStores } from '../interfaces/farm'

const calculateStore = <T extends FarmStores, K extends keyof T>(
  store: T,
  item: K,
  quantity: number
): T => {
  const newQuantity = ((store[item] || 0) as number) + quantity
  return {
    ...store,
    [item]: parseFloat(newQuantity.toFixed(2)),
  }
}

export default calculateStore
