export const getProduct = (productName, products) => {
  return products.find(({ name }) => name === productName)
}

export const getProducer = (producerName, producers) => {
  return producers.find(({ name }) => name === producerName)
}

export const getSeller = (sellerName, sellers) => {
  return sellers.find(({ name }) => name === sellerName)
}
