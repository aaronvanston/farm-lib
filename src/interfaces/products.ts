export interface Product {
  name: ProductType
  value: number
}

export interface Produce {
  name: ProductType
  rate: number
}

// export type ProductType = 'egg' | 'milk'

export enum ProductType {
  egg = 'egg',
  milk = 'milk',
}
