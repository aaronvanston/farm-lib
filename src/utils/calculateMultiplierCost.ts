const addMultiplier = (
  cost: number,
  currentQuantity: number,
  multiplier: number
) => Math.floor(cost * multiplier ** currentQuantity)

const calculateMultiplierCost = (
  cost: number,
  currentQuantity: number,
  multiplier: number,
  purchaseQuantity: number
) => {
  const quantities = [...Array(purchaseQuantity).keys()].map(item => {
    const tempQuantity = item + currentQuantity

    return tempQuantity === 0
      ? cost
      : addMultiplier(cost, tempQuantity, multiplier)
  })
  return quantities.reduce((total, amount) => total + amount)
}

export default calculateMultiplierCost
