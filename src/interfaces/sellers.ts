import { Produce } from './products'

export interface Seller {
  name: SellerType
  buyPrice: number
  multiplier: number
  products: Produce
}

export type SellerType = 'for_sale_sign' | 'farmer'
