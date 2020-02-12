import { ProducerType } from '../interfaces/producers'
import { ProductType } from '../interfaces/products'

const producers = [
  {
    name: ProducerType.chicken,
    cost: 1000,
    produces: { name: ProductType.egg, rate: 0.1 },
  },
  {
    name: ProducerType.cow,
    cost: 10000,
    produces: { name: ProductType.milk, rate: 1 },
  },
]

export default producers
