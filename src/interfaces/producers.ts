import { Produce } from './products'

export interface Producer {
  name: ProducerType
  cost: number
  produces: Produce
}

// export type ProducerType = 'chicken' | 'cow'

export enum ProducerType {
  chicken = 'chicken',
  cow = 'cow',
}
