export interface Product {
  name: ProductType
  value: number
}

export interface Produce {
  type: ProductType
  rate: number
}

export enum ProductType {
  EGG = 'Egg',
  MILK = 'Milk',
}
