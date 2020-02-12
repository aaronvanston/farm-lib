import { Produce } from './products'

export interface Seller {
  name: SellerType
  cost: number
  multiplier: number
  products: Produce
}

// export type SellerType = 'for_sale_sign' | 'farmer'

export enum SellerType {
  for_sale_sign = 'for_sale_sign',
  newspaper_ad = 'newspaper_ad',
  craigslist_ad = 'craigslist_ad',
  chicken_dealer = 'chicken_dealer',
  shopkeeper = 'shopkeeper',
  farmer = 'farmer',
}
