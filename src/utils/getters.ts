import { Producer, ProducerType } from '../interfaces/producers'
import { Product, ProductType } from '../interfaces/products'
import { Seller, SellerType } from '../interfaces/sellers'

// These can be collapsed into a singel function
export const getProducer = (
  producerName: ProducerType,
  producers: Producer[]
) => {
  return producers.find(({ name }) => name === producerName)
}

export const getProduct = (productName: ProductType, products: Product[]) => {
  return products.find(({ name }) => name === productName)
}

export const getSeller = (sellerName: SellerType, sellers: Seller[]) => {
  return sellers.find(({ name }) => name === sellerName)
}
