import Farm from './Farm/Farm'
import producers from './catalogue/producers'
import products from './catalogue/products'

console.log('init')
const farmLib = new Farm(producers, products)

farmLib.buy('chicken')

farmLib.produce()
farmLib.produce()
farmLib.produce()
farmLib.produce()
farmLib.produce()

farmLib.sell('egg')
farmLib.sell('egg')
farmLib.sell('egg')
farmLib.sell('egg')
farmLib.sell('egg')
farmLib.sell('egg')
farmLib.sell('egg')
farmLib.sell('egg')
farmLib.sell('egg')
farmLib.sell('egg')

farmLib.buy('chicken')

console.log(farmLib.total())
