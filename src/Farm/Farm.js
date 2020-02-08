import { getProduct, getProducer } from '../utils/getters'
import updateQuantity from '../utils/updateQuantity'

export default class Farm {
  constructor(producers, products) {
    // All availible Products and Producers
    this.products = products
    this.producers = producers

    // The users Producers, Products and Bank
    this.farmProducers = {
      chicken: 1,
    }
    this.farmProducts = {}
    this.farmBank = 1000
  }

  buy(producer) {
    const producerInfo = getProducer(producer, this.producers)

    if (!producerInfo) {
      console.log(`Cannot find ${producer}`)
      return false
    }

    if (this.farmBank >= producerInfo.cost) {
      this.farmBank -= producerInfo.cost
      this.farmProducers = updateQuantity(this.farmProducers, producer, 1)

      console.log(`Bought ${producer}`)
      console.log(`Bank now at ${this.farmBank}`)
    } else {
      console.log('Not enough money')
    }
  }

  sell(product) {
    const productInfo = getProduct(product, this.products)

    // Does product exist?
    if (!productInfo) {
      console.log(`Cannot find ${product}`)
      return false
    }

    // Is there enough product to sell?
    if (!this.farmProducts[product] > 0) {
      console.log(`You dont have enough ${product}s to sell`)
      return false
    }

    this.farmBank += productInfo.value
    console.log(`Bank now at ${this.farmBank}`)

    this.farmProducts = updateQuantity(this.farmProducts, product, -1)
  }

  produce() {
    let producedProducts = this.farmProducts
    // for each producer, generate their products into farm products
    for (const [producerName, quantity] of Object.entries(this.farmProducers)) {
      console.log(`Producing for ${producerName} (x${quantity})`)
      const producerInfo = getProducer(producerName, this.producers)

      // For each producers products
      producerInfo.produces.forEach(product => {
        const totalQty = product.rate * quantity
        producedProducts = updateQuantity(
          producedProducts,
          product.type,
          totalQty
        )
      })
    }
    this.farmProducts = producedProducts
  }

  total() {
    return {
      farmProducers: this.farmProducers,
      farmProducts: this.farmProducts,
      farmBank: this.farmBank,
    }
  }
}
