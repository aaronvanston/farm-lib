import Farm from './Farm/Farm'
import producers from './catalogue/producers'
import products from './catalogue/products'
import sellers from './catalogue/sellers'

import debugLogger from './utils/debugLogger'

const farmLib = new Farm({ producers, products, sellers }, debugLogger)

console.log(farmLib.buy('chicken'))
console.log(farmLib.sell('egg', 10))
