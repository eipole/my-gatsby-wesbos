import { graphql, Link } from "gatsby"
import React from "react"
import SEO from "../components/SEO"
import useForm from "../utils/useForm"
import Img from "gatsby-image"
import calcPizzaPrice from "../utils/calcPizzaPrice"
import formatMoney from "../utils/formatMoney"
import OrderStyles from "../styles/OrderStyles"
import MenyItemStyles from "../styles/MenyItemStyles"
import usePizza from "../utils/usePizza"
import PizzaOrder from "../components/PizzaOrder"
import calculateOrderTotal from "../utils/calculateOrderTotal"

function Order({ data }) {
  const pizzas = data.pizzas.nodes
  const { values, updateValue } = useForm({
    mapleSyrup: "",
    name: "",
    email: "",
  })
  const {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  } = usePizza({
    pizzas,
    values,
  })
  if (message) {
    return <p>{message} </p>
  }

  return (
    <>
      <SEO title="Order pizZZa!!!" />
      <Link to="/beers">Beers</Link>
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
          <input
            type="mapleSyrup"
            name="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset disabled={loading} className="meny">
          <legend>Meny</legend>
          {pizzas.map((elem) => (
            <MenyItemStyles key={elem.id}>
              <Img fluid={elem.image.asset.fluid} alt={elem.name} />
              <div>
                <h2>{elem.name} </h2>
              </div>
              <div>
                {["S", "M", "L"].map((size, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => addToOrder({ id: elem.id, size })}
                  >
                    {size}:{formatMoney(calcPizzaPrice(elem.price, size))}
                  </button>
                ))}
              </div>
            </MenyItemStyles>
          ))}
        </fieldset>
        <fieldset disabled={loading} className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your total is{formatMoney(calculateOrderTotal(order, pizzas))}{" "}
          </h3>
          <div>{error ? <p>{error} </p> : ""}</div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Submit"}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  )
}

export default Order

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
