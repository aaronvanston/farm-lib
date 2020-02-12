const calculateMultiplerCost = (
  cost: number,
  currentQuantity: number,
  multipler: number
) => {
  return currentQuantity === 0 ? cost : cost * multipler ** currentQuantity
}

export default calculateMultiplerCost
