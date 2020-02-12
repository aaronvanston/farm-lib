import { getProduct, getProducer, getSeller } from '../utils/getters'
import calculateStore from '../utils/calculateStore'
import message from '../utils/message'
import calculateMultiplerCost from '../utils/calculateMultiplerCost'
import config from '../config'

import defaultProducers from '../catalogue/producers'
import defaultProducts from '../catalogue/products'
import defaultSellers from '../catalogue/sellers'

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

  constructor({
    producers = defaultProducers,
    products = defaultProducts,
    sellers = defaultSellers,
    handleTick = () => {},
  }: FarmInfo) {
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

  buy(item: string) {
    if (item in ProducerType) {
      const producerInfo = getProducer(item as ProducerType, this.producers)
      const currentQuantity = this.farmProducers[item] || 0

      const multiplerCost = calculateMultiplerCost(
        producerInfo.cost,
        currentQuantity,
        producerInfo.multiplier
      )

      if (this.farmBank <= multiplerCost) {
        return message('Not enough money', false)
      }

      this.farmBank -= multiplerCost
      this.farmProducers = calculateStore(
        this.farmProducers,
        item as ProducerType,
        1
      )

      return message(`Bought ${item}`, true)
    } else if (item in SellerType) {
      const sellerInfo = getSeller(item as SellerType, this.sellers)
      const currentQuantity = this.farmSellers[item] || 0

      const multiplerCost = calculateMultiplerCost(
        sellerInfo.cost,
        currentQuantity,
        sellerInfo.multiplier
      )

      if (this.farmBank <= multiplerCost) {
        return message('Not enough money', false)
      }

      this.farmBank -= multiplerCost
      this.farmSellers = calculateStore(this.farmSellers, item as SellerType, 1)

      return message(`Bought ${item} for ${multiplerCost}`, true)
    } else {
      return message(`Cannot find: ${item} in availible lists`, false)
    }
  }

  sell(product: string, quantity = 1) {
    // Does product exist?
    if (!(product in ProductType)) {
      return message(`Cannot find ${product}`, false)
    }

    const productInfo = getProduct(product as ProductType, this.products)

    // Does the product exist?
    // Is there enough product to sell?
    if ((this.farmProducts[product] || 0) <= quantity) {
      return message(`You dont have enough ${product}s to sell`, false)
    }

    this.farmBank += productInfo.value * quantity
    this.farmProducts = calculateStore(
      this.farmProducts,
      product as ProductType,
      -quantity
    )

    return message(`Sold ${product} (x${quantity})`, true)
  }

  produce() {
    // for each producer, generate their products into farm products
    for (const [producerName, quantity] of Object.entries(this.farmProducers)) {
      // Does producer exist?
      if (!(producerName in ProducerType)) {
        return message(`Cannot find ${producerName}`, false)
      }

      const producerInfo = getProducer(
        producerName as ProducerType,
        this.producers
      )

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
      // Does seller exist?
      if (!(sellerName in SellerType)) {
        return message(`Cannot find ${sellerName}`, false)
      }

      const sellerInfo = getSeller(sellerName as SellerType, this.sellers)
      const productToSell = sellerInfo?.products.name
      const totalSell = sellerInfo.products.rate * (quantity || 0)
      const availibleProducts = Math.floor(
        this.farmProducts[productToSell] || 0
      )

      // If total sell exceeds availible, only sell availible
      const maxSell = Math.min(totalSell, availibleProducts)

      if (maxSell > 0) {
        this.sell(productToSell, maxSell)
      }
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

  save() {
    const date = Date.now()
    const progress = {
      farmProducers: this.farmProducers,
      farmProducts: this.farmProducts,
      farmSellers: this.farmSellers,
      farmBank: this.farmBank,
      date,
    }

    const stringify = JSON.stringify(progress)
    const encoded = Buffer.from(stringify, 'binary').toString('base64')

    return encoded
  }

  load(progress: string) {
    const decoded = Buffer.from(progress, 'base64').toString('binary')
    const progressData = JSON.parse(decoded)
    const {
      farmProducers,
      farmProducts,
      farmSellers,
      farmBank,
      date,
    } = progressData

    const loadData = new Date(date)

    this.farmProducers = farmProducers
    this.farmProducts = farmProducts
    this.farmSellers = farmSellers
    this.farmBank = farmBank

    return message(`Loading save from ${loadData}`, true)
  }
}
