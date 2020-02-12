import { ProducerType, Producer } from './producers'
import { ProductType, Product } from './products'
import { SellerType, Seller } from './sellers'

export type FarmProducers = {
  [key in ProducerType]?: number
}

export type FarmProducts = {
  [key in ProductType]?: number
}

export type FarmSellers = {
  [key in SellerType]?: number
}

export type FarmStores = FarmProducers | FarmProducts | FarmSellers

export type FarmBank = number

export interface FarmInfo {
  producers?: Producer[]
  products?: Product[]
  sellers?: Seller[]
  handleTick?: FarmDay
}

export type FarmDay = (arg0: FarmTotal) => void

export interface FarmTotal {
  farmProducers: FarmProducers
  farmProducts: FarmProducts
  farmSellers: FarmSellers
  farmBank: FarmBank
}
