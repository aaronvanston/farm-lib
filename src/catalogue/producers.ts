import { Producer } from '../interfaces/producers'

const producers = [
  {
    name: 'chicken',
    cost: 1000,
    produces: { name: 'egg', rate: 0.1 },
  },
  {
    name: 'cow',
    cost: 10000,
    produces: { name: 'milk', rate: 1 },
  },
]

export default producers as Producer[]
