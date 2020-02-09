import { Produce } from './products'

export interface Seller {
  name: SellerType
  buyPrice: number
  miltupler: number
  products: Produce
}

export enum SellerType {
  FOR_SALE_SIGN = 'for_sale_sign',
  FARMER = 'farmer',
}
