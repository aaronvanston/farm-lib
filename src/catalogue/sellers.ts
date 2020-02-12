import { SellerType } from '../interfaces/sellers'
import { ProductType } from '../interfaces/products'

const sellers = [
  {
    name: SellerType.for_sale_sign,
    cost: 10_00,
    multiplier: 1.05,
    products: {
      name: ProductType.egg,
      rate: 1,
    },
  },
  {
    name: SellerType.newspaper_ad,
    cost: 50_00,
    multiplier: 1.05,
    products: {
      name: ProductType.egg,
      rate: 2,
    },
  },
  {
    name: SellerType.craigslist_ad,
    cost: 75_00,
    multiplier: 1.05,
    products: {
      name: ProductType.egg,
      rate: 5,
    },
  },
  {
    name: SellerType.chicken_dealer,
    cost: 100_00,
    multiplier: 1.05,
    products: {
      name: ProductType.egg,
      rate: 7,
    },
  },
  {
    name: SellerType.shopkeeper,
    cost: 200_00,
    multiplier: 1.05,
    products: {
      name: ProductType.egg,
      rate: 10,
    },
  },
  {
    name: SellerType.farmer,
    cost: 10_00,
    multiplier: 1.05,
    products: {
      name: ProductType.milk,
      rate: 1,
    },
  },
]

export default sellers
