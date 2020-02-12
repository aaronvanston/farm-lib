import { Produce } from './products'

export interface Producer {
  name: ProducerType
  cost: number
  multiplier: number
  produces: Produce
}

export enum ProducerType {
  chicken = 'chicken',
  chicken_coop = 'chicken_coop',
  chicken_barn = 'chicken_barn',
  field_of_wild_chickens = 'field_of_wild_chickens',
  chicken_resort = 'chicken_resort',
  cow = 'cow',
}
