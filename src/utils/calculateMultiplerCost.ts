const calculateMultiplerCost = (
  cost: number,
  currentQuantity: number,
  multipler: number
) => {
  return currentQuantity === 0
    ? cost
    : Math.floor(cost * multipler ** currentQuantity)
}

export default calculateMultiplerCost
