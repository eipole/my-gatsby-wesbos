import { graphql } from "gatsby"
import React from "react"
import PizzaList from "../components/PizzaList"
import SEO from "../components/SEO"
import ToppingsFilter from "../components/ToppingsFilter"

function PizzaPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas width ${pageContext.topping}`
            : "All pizzas"
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList arr={pizzas} />
    </>
  )
}
/* in version ($topping: [String]) and filter:{elemMatch:{name:{in: $topping}}}*/
export default PizzaPage
export const pizzaquery = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
