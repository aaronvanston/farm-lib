import { getProduct, getProducer, getSeller } from '../utils/getters'
import updateQuantity from '../utils/updateQuantity'
import message from '../utils/message'

import config from '../config'

export default class Farm {
  constructor({ producers, products, sellers }, handleTick = () => {}) {
    // All availible Products and Producers
    this.products = products
    this.producers = producers
    this.sellers = sellers
    this.handleTick = handleTick

    this.farmProducers = {}
    this.farmSellers = {}
    this.farmProducts = {}
    this.farmBank = 100000

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
      return message(`Cannot find ${producer}`, false)
    }

    if (this.bank >= producerInfo.cost) {
      return message('Not enough money', false)
    }

    this.farmBank -= producerInfo.cost
    this.farmProducers = updateQuantity(this.farmProducers, producer, 1)

    return message(`Bought ${producer}`, true)
  }

  sell(product, quantity = 1) {
    const productInfo = getProduct(product, this.products)

    // Does product exist?
    if (!productInfo) {
      return message(`Cannot find ${product}`, false)
    }

    // Is there enough product to sell?
    if (
      !this.farmProducts[product] >= quantity ||
      this.farmProducts[product] == undefined
    ) {
      return message(`You dont have enough ${product}s to sell`, false)
    }

    this.farmBank += productInfo.value * quantity
    this.farmProducts = updateQuantity(this.farmProducts, product, -quantity)
    return message(`Sold ${product} (x${quantity})`, true)
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
