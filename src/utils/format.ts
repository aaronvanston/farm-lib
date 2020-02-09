const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const formatPrice = (price: number) => formatter.format(price / 1000)
export const formatQuantity = (quantity: number) => Math.floor(quantity)
