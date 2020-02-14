const addMultiplier = (
  cost: number,
  currentQuantity: number,
  multipler: number
) => Math.floor(cost * multipler ** currentQuantity)

const calculateMultiplerCost = (
  cost: number,
  currentQuantity: number,
  multipler: number,
  purchaseQuantity: number
) => {
  const quantities = [...Array(purchaseQuantity).keys()].map(item => {
    const tempQuantity = item + currentQuantity

    return tempQuantity === 0
      ? cost
      : addMultiplier(cost, tempQuantity, multipler)
  })
  return quantities.reduce((total, amount) => total + amount)
}

export default calculateMultiplerCost
