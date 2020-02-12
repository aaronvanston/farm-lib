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
  farmer = 'farmer',
}
