import { Produce } from './products'

export interface Seller {
  name: SellerType
  buyPrice: number
  miltupler: number
  products: Produce
}

export type SellerType = 'for_sale_sign' | 'farmer'
