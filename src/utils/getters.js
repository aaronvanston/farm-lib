export const getProduct = (productName, products) => {
  return products.find(({ name }) => name === productName)
}

export const getProducer = (producerName, producers) => {
  return producers.find(({ name }) => name === producerName)
}
