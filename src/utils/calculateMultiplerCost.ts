const calculateMultiplerCost = (
  cost: number,
  quantity: number,
  multipler: number
) => {
  return quantity === 0 ? cost : cost * quantity ** multipler
}

export default calculateMultiplerCost
