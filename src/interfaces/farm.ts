import { ProducerType } from './producers'
import { ProductType } from './products'
import { SellerType } from './sellers'

export type FarmProducers = {
  [key in ProducerType]: number
}

export type FarmProducts = {
  [key in ProductType]: number
}

export type FarmSellers = {
  [key in SellerType]: number
}

export type FarmBank = number
