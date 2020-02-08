import { getProduct, getProducer, getSeller } from '../utils/getters'
import updateQuantity from '../utils/updateQuantity'

import config from '../config'

export default class Farm {
  constructor({ producers, products, sellers }, handleTick = () => {}) {
    // All availible Products and Producers
    this.products = products
    this.producers = producers
    this.sellers = sellers

    this.handleTick = handleTick

    this.farmProducers = {}
    this.farmSellers = {
      'for-sale-sign': 2,
    }
    this.farmProducts = {}
    this.farmBank = 1000

    this.initialise()
  }

  initialise() {
    this.interval = setInterval(() => this.onTick(), config.tickRate || 1000)
  }

  onTick() {
    this.produce()
    this.consume()
    this.handleTick(this.total())
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
    } else {
      console.log('Not enough money')
    }
  }

  sell(product, quantity = 1) {
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

    this.farmBank += productInfo.value * quantity
    this.farmProducts = updateQuantity(this.farmProducts, product, -quantity)
  }

  produce() {
    let producedProducts = this.farmProducts
    // for each producer, generate their products into farm products
    for (const [producerName, quantity] of Object.entries(this.farmProducers)) {
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

  consume() {
    // for each seller, sell max possible of good
    for (const [sellerName, quantity] of Object.entries(this.farmSellers)) {
      const sellerInfo = getSeller(sellerName, this.sellers)
      const productToSell = sellerInfo.products.name
      const totalSell = sellerInfo.products.rate * quantity
      const availibleProducts = Math.floor(this.farmProducts[productToSell])
      // If total sell exceeds availible, only sell availible
      const maxSell = Math.min(totalSell, availibleProducts)

      this.sell(productToSell, maxSell)
    }
  }

  total() {
    return {
      farmProducers: this.farmProducers,
      farmProducts: this.farmProducts,
      farmSellers: this.farmSellers,
      farmBank: this.farmBank,
    }
  }
}
