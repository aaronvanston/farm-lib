import { Seller } from '../interfaces/sellers'

const sellers = [
  {
    name: 'for-sale-sign',
    buyPrice: 1000,
    multiplier: 1.05,
    products: {
      name: 'egg',
      rate: 1,
    },
  },
  {
    name: 'farmer',
    buyPrice: 1000,
    multiplier: 1.05,
    products: {
      name: 'milk',
      rate: 1,
    },
  },
]

export default sellers as Seller[]
