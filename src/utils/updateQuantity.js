// should rename to calculateNewStore
const updateQuantity = (store, product, quantity) => {
  const newStore = {
    ...store,
    [product]: (store[product] || 0) + quantity,
  }
  return newStore
}

export default updateQuantity
