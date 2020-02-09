import { Produce } from './products'

export interface Producer {
  name: ProducerType
  cost: number
  produces: Produce
}

export enum ProducerType {
  CHICKEN = 'chicken',
  COW = 'cow',
}
