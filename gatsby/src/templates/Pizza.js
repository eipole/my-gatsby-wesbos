import { graphql } from "gatsby"
import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import SEO from "../components/SEO"

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`

export default function SinglePizzaPage({ data }) {
  const { pizza } = data
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGrid>
        <div>
          <h2>{pizza.name} </h2>
          <ul>
            {pizza.toppings.map((elem) => (
              <li key={elem.id}>{elem.name} </li>
            ))}
          </ul>
          {pizza.toppings.every((elem) => elem.vegetarian) && (
            <p>All vegetarian pizza</p>
          )}
        </div>
        <Img fluid={pizza.image.asset.fluid} />
      </PizzaGrid>
    </>
  )
}
// using context via gatsby-node.js(slug)

export const query = graphql`
  query($slug: String) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`

/* A aproach */
/* function Toppings(toppings){
    const veggi = toppings.every(elem=>elem.vegetarian)
    console.log(veggi)
   const toppers = toppings.map(elem=><p key={elem.id} >hei hoo {elem.name} </p> )

        return(
            <>
            {toppers}
            {veggi && <p>all vegetarian pizza</p> }
            </>
        )
}
   
     const pizza = Object.values(data)
    return(
        <div>
            <h1>hei</h1>
           {pizza.map(elem=> (
            <React.Fragment key={elem.id}>
           <p>{elem.name}</p>
           <div>
               Er toppet med: {Toppings(elem.toppings)}
           </div>
           <Img fluid={elem.image.asset.fluid} />
           </React.Fragment>
           ) )} 
        </div>
    ) */
