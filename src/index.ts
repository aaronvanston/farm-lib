import Farm from './Farm/Farm'
import producers from './catalogue/producers'
import products from './catalogue/products'
import sellers from './catalogue/sellers'

import debugLogger from './utils/debugLogger'
import { ProducerType } from './interfaces/producers'
import { ProductType } from './interfaces/products'
import { SellerType } from './interfaces/sellers'

const farmLib = new Farm({ producers, products, sellers }, debugLogger)

console.log(farmLib.buy(ProducerType.chicken))
console.log(farmLib.sell(ProductType.egg, 10))

console.log(farmLib.buy(ProducerType.chicken))
console.log(farmLib.buy(SellerType.for_sale_sign))
console.log(farmLib.buy(SellerType.for_sale_sign))
console.log(farmLib.buy(SellerType.for_sale_sign))
console.log(farmLib.buy(SellerType.for_sale_sign))
