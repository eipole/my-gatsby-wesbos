import React from "react"
import MenyItemStyles from "../styles/MenyItemStyles"
import Img from "gatsby-image"

function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, i) => {
        const pizza = pizzas.find((elem) => elem.id === singleOrder.id)
        return (
          <MenyItemStyles key={`${singleOrder.id}- ${i}`}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <button type="button" onClick={(e) => removeFromOrder(i)}>
              Remove
            </button>
          </MenyItemStyles>
        )
      })}
    </>
  )
}

export default PizzaOrder
