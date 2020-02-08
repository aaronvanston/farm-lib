import Farm from './Farm/Farm'
import producers from './catalogue/producers'
import products from './catalogue/products'
import sellers from './catalogue/sellers'

import { formatPrice } from './utils/format'

const onTick = ({ farmProducers, farmProducts, farmSellers, farmBank }) => {
  console.log({
    producers: farmProducers,
    products: farmProducts,
    sellers: farmSellers,
    total: formatPrice(farmBank),
  })
}

const farmLib = new Farm({ producers, products, sellers }, onTick)

console.log(farmLib.buy('chicken'))
console.log(farmLib.sell('egg', 10))
