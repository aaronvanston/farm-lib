import Farm from './Farm/Farm'
import producers from './catalogue/producers'
import products from './catalogue/products'
import sellers from './catalogue/sellers'

export default Farm
export { producers, products, sellers }

//  ----
// TEST CODE
//  ----
import debugLogger from './utils/debugLogger'
const farmLib = new Farm({
  handleTick: debugLogger,
})

console.log(farmLib.buy('for_sale_sign'))

console.log(
  farmLib.load(
    'eyJmYXJtUHJvZHVjZXJzIjp7ImNoaWNrZW5fY29vcCI6MX0sImZhcm1Qcm9kdWN0cyI6e30sImZhcm1TZWxsZXJzIjp7ImZvcl9zYWxlX3NpZ24iOjF9LCJmYXJtQmFuayI6ODkwMDAsImRhdGUiOjE1ODE1MDY0MDE1NDF9'
  )
)
