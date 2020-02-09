import { formatPrice } from './format'

import {
  FarmProducers,
  FarmProducts,
  FarmSellers,
  FarmBank,
} from '../interfaces/farm'

interface HandleTick {
  farmProducers: FarmProducers
  farmProducts: FarmProducts
  farmSellers: FarmSellers
  farmBank: FarmBank
}

const onTick = ({
  farmProducers,
  farmProducts,
  farmSellers,
  farmBank,
}: HandleTick): void => {
  console.log({
    producers: farmProducers,
    products: farmProducts,
    sellers: farmSellers,
    total: formatPrice(farmBank),
  })
}

export default onTick
