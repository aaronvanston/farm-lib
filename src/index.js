import Farm from './Farm/Farm'
import producers from './catalogue/producers'
import products from './catalogue/products'
import sellers from './catalogue/sellers'

const onTick = data => console.log(data)

const farmLib = new Farm({ producers, products, sellers }, onTick)

farmLib.buy('chicken')
farmLib.sell('egg', 10)

console.log(farmLib.total())
