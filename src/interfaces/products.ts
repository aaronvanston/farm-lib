export interface Product {
  name: ProductType
  value: number
}

export interface Produce {
  name: ProductType
  rate: number
}

export type ProductType = 'egg' | 'milk'
