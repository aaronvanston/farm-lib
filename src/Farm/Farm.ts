import { getProduct, getProducer, getSeller } from '../utils/getters'
import calculateStore from '../utils/calculateStore'
import message from '../utils/message'
import config from '../config'

import { Producer, ProducerType } from '../interfaces/producers'
import { Product, ProductType } from '../interfaces/products'
import { Seller, SellerType } from '../interfaces/sellers'
import {
  FarmProducers,
  FarmProducts,
  FarmSellers,
  FarmBank,
  FarmInfo,
  FarmDay,
} from '../interfaces/farm'

export default class Farm {
  private producers: Producer[]
  private products: Product[]
  private sellers: Seller[]
  private handleTick: FarmDay
  private farmProducers: FarmProducers
  private farmSellers: FarmSellers
  private farmProducts: FarmProducts
  private farmBank: FarmBank

  constructor(
    { producers, products, sellers }: FarmInfo,
    handleTick: FarmDay = () => {}
  ) {
    this.products = products
    this.producers = producers
    this.sellers = sellers
    this.handleTick = handleTick

    this.farmProducers = {}
    this.farmSellers = {}
    this.farmProducts = {}
    this.farmBank = 100000

    this.initialiseClock()
  }

  initialiseClock() {
    setInterval(() => this.onTick(), config.tickRate || 1000)
  }

  onTick() {
    this.produce()
    this.consume()
    this.handleTick(this.total())
  }

  buy(producer: ProducerType) {
    const producerInfo = getProducer(producer, this.producers)

    if (!producerInfo) {
      return message(`Cannot find ${producer}`, false)
    }

    if (this.farmBank <= producerInfo.cost) {
      return message('Not enough money', false)
    }

    this.farmBank -= producerInfo.cost
    this.farmProducers = calculateStore(this.farmProducers, producer, 1)

    return message(`Bought ${producer}`, true)
  }

  sell(product: ProductType, quantity = 1) {
    const productInfo = getProduct(product, this.products)

    // Does product exist?
    if (!productInfo) {
      return message(`Cannot find ${product}`, false)
    }

    // Does the product exist?
    // Is there enough product to sell?
    if (this.farmProducts[product] || 0 <= quantity) {
      return message(`You dont have enough ${product}s to sell`, false)
    }

    this.farmBank += productInfo.value * quantity
    this.farmProducts = calculateStore(this.farmProducts, product, -quantity)
    return message(`Sold ${product} (x${quantity})`, true)
  }

  produce() {
    // for each producer, generate their products into farm products
    for (const [producerName, quantity] of Object.entries(this.farmProducers)) {
      const producerInfo = getProducer(
        producerName as ProducerType,
        this.producers
      )

      // Does producer exist?
      if (!producerInfo) {
        return message(`Cannot find ${producerName}`, false)
      }

      const productToProduce = producerInfo.produces
      const totalQty = productToProduce.rate * (quantity || 0)

      this.farmProducts = calculateStore(
        this.farmProducts,
        productToProduce.name,
        totalQty
      )
    }
  }

  consume() {
    // for each seller, sell max possible of good
    for (const [sellerName, quantity] of Object.entries(this.farmSellers)) {
      const sellerInfo = getSeller(sellerName as SellerType, this.sellers)

      // Does seller exist?
      if (!sellerInfo) {
        return message(`Cannot find ${sellerName}`, false)
      }

      const productToSell = sellerInfo?.products.name
      const totalSell = sellerInfo.products.rate * (quantity || 0)
      const availibleProducts = Math.floor(
        this.farmProducts[productToSell] || 0
      )

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
