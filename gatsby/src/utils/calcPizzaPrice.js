const sizes = { S: 0.75, M: 1, L: 1.25 }

function calcPizzaPrice(cents, size) {
  return cents * sizes[size]
}
export default calcPizzaPrice
