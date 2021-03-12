import { useContext, useState } from "react"
import OrderContext from "../components/OrderContext"
import attachNamesandPrices from "./attachNamesandPrices"
import calculateOrderTotal from "./calculateOrderTotal"
import formatMoney from "./formatMoney"

function usePizza({ pizzas, values }) {
  // const [order, setOrder] = useState([])
  const [order, setOrder] = useContext(OrderContext)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza])
  }
  function removeFromOrder(index) {
    //   fungerer også med filter! Men alle størrelsene har samme id
    // const filtered = order.filter((elem) => elem.id !== index)
    // setOrder(filtered)
    setOrder([...order.slice(0, index), ...order.slice(index + 1)])
  }

  async function submitOrder(e) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    const body = {
      order: attachNamesandPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup
    }
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
    const text = JSON.parse(await res.text())

    if (res.status >= 400 && res.status < 600) {
      setLoading(false)
      setError(text.message)
    } else {
      setLoading(false)
      setMessage("Order placed, get your pizza")
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  }
}

export default usePizza
