import { ProducerType } from '../interfaces/producers'
import { ProductType } from '../interfaces/products'

const producers = [
  {
    name: ProducerType.chicken,
    cost: 10_00,
    multiplier: 1.05,
    produces: { name: ProductType.egg, rate: 0.1 },
  },
  {
    name: ProducerType.chicken_coop,
    cost: 100_00,
    multiplier: 1.07,
    produces: { name: ProductType.egg, rate: 1 },
  },
  {
    name: ProducerType.chicken_barn,
    cost: 1000_00,
    multiplier: 1.07,
    produces: { name: ProductType.egg, rate: 5 },
  },
  {
    name: ProducerType.field_of_wild_chickens,
    cost: 3000_00,
    multiplier: 1.27,
    produces: { name: ProductType.egg, rate: 10 },
  },
  {
    name: ProducerType.chicken_resort,
    cost: 10_000_00,
    multiplier: 1.4,
    produces: { name: ProductType.egg, rate: 100 },
  },
  {
    name: ProducerType.cow,
    cost: 100_00,
    multiplier: 1.1,
    produces: { name: ProductType.milk, rate: 1 },
  },
]

export default producers
