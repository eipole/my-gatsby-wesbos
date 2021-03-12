import calcPizzaPrice from "./calcPizzaPrice"

export default function calculateOrderTotal(order, pizzas) {
  // eller return direkte
  const total = order.reduce((acc, curr) => {
    const pizza = pizzas.find((elem) => elem.id === curr.id)
    return acc + calcPizzaPrice(pizza.price, curr.size)
  }, 0)
  return total
}
