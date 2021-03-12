import calcPizzaPrice from "./calcPizzaPrice"
import formatMoney from "./formatMoney"

export default function attachNamesandPrices(order, pizzas) {
  const koblet = order.map((elem) => {
    const pizza = pizzas.find((pizza) => pizza.id === elem.id)
    return {
      ...elem,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calcPizzaPrice(pizza.price, elem.size)),
    }
  })
  return koblet
}
