import { Link } from 'gatsby'
import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

const PizzaGridStyles = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 2rem;
grid-auto-rows: auto auto 500px;
`
const PizzaStyles = styled.div` 
display: grid;
 /* grid-template-rows: auto auto 1fr;  */
@supports not(grid-template-rows: subgrid){
    grid-template-rows: auto auto 1fr;
}
grid-template-rows: subgrid;
grid-row:span 3;
gap: 1rem;
h2,
p{
    margin: 0;
}
`

function SinglePizza({pizza}){
    return(
        <PizzaStyles>
            <Link to={`/pizza/${pizza.slug.current}`}>
                <h2>
                    <span className="mark">{pizza.name}</span>
                </h2>
            </Link>
            <p> {pizza.toppings.map(elem=> elem.name).join(', ')} </p> 
            <Img fluid={pizza.image.asset.fluid} alt=""/>
            
        </PizzaStyles>
    )
}

function PizzaList({arr}){
  return(
      <PizzaGridStyles>
          {arr.map(elem=>
            <SinglePizza key={elem.id} pizza={elem} />
        ) }
      </PizzaGridStyles>
  )
         
}
export default PizzaList