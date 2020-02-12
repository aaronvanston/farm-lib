import { SellerType } from '../interfaces/sellers'
import { ProductType } from '../interfaces/products'

const sellers = [
  {
    name: SellerType.for_sale_sign,
    cost: 1000,
    multiplier: 1.05,
    products: {
      name: ProductType.egg,
      rate: 1,
    },
  },
  {
    name: SellerType.farmer,
    cost: 1000,
    multiplier: 1.05,
    products: {
      name: ProductType.milk,
      rate: 1,
    },
  },
]

export default sellers
