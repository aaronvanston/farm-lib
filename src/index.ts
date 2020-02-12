import Farm from './Farm/Farm'
import producers from './catalogue/producers'
import products from './catalogue/products'
import sellers from './catalogue/sellers'

import debugLogger from './utils/debugLogger'
import { ProducerType } from './interfaces/producers'
import { ProductType } from './interfaces/products'
import { SellerType } from './interfaces/sellers'

const farmLib = new Farm({ producers, products, sellers }, debugLogger)

// console.log(farmLib.buy(ProducerType.chicken_coop))
// console.log(farmLib.buy(SellerType.for_sale_sign))
// console.log(farmLib.save())
// console.log(farmLib.sell(ProductType.egg, 10))

// console.log(farmLib.buy(ProducerType.chicken))
// console.log(farmLib.buy(SellerType.for_sale_sign))
// console.log(farmLib.buy(SellerType.for_sale_sign))
// console.log(farmLib.buy(SellerType.for_sale_sign))
// console.log(farmLib.buy(SellerType.for_sale_sign))
// console.log(farmLib.save())
console.log(
  farmLib.load(
    'eyJmYXJtUHJvZHVjZXJzIjp7ImNoaWNrZW5fY29vcCI6MX0sImZhcm1Qcm9kdWN0cyI6e30sImZhcm1TZWxsZXJzIjp7ImZvcl9zYWxlX3NpZ24iOjF9LCJmYXJtQmFuayI6ODkwMDAsImRhdGUiOjE1ODE1MDY0MDE1NDF9'
  )
)
