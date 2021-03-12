import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const ToppingStyles = styled.div`
display: flex;
flex-wrap: wrap;
gap: 1rem;
margin-bottom: 4rem;
a{
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    padding: 5px;
    align-items: center;
    background: var(--grey)
}
.count{
    background:white;
    padding: 2px 5px;
}
[aria-current='page']{
    background: var(--yellow)
}
/* .active{
    background: var(--yellow)
} */
`


function countPizzasInToppings(pizzas){
    const counts = pizzas
       .map(pizza=> pizza.toppings)
       .flat()
       .reduce((acc, curr)=>{
           const existingTopping = acc[curr.id]
           /* if it is increment + 1 */
           if(existingTopping){
               existingTopping.count += 1
           } else    //  create new entry
        {
           acc[curr.id] = {
               id: curr.id,
               name: curr.name,
               count: 1
           } }  
           console.clear()
           return acc
       },{})
       /* const tobings = Object.values(counts) */
       const sortedToppings = Object.values(counts).sort(
        (a, b) => b.count - a.count
      ) 
      return sortedToppings /* tobings */
}


function ToppingsFilter({activeTopping}){
    /* return of query is data - toppings need to be destructured  */

    /* Toppings is actually not in use */
    const {toppings, pizzas} = useStaticQuery(graphql`
    query{
        toppings: allSanityTopping {
            nodes {
              name
              id
              vegetarian
            }
          }
          pizzas: allSanityPizza{
              nodes{
                  toppings{
                      name
                      id
                  }
              }
          }
    }
    `)
    // console.clear()
    const toppingsCount = countPizzasInToppings(pizzas.nodes)
    return (
    <ToppingStyles>
        <Link to="/pizzas/" >
            <span className="name" >All</span>
    <span className="count" >{pizzas.nodes.length}</span>
        </Link>
        {toppingsCount.map(elem=>(
            <Link 
            to={`/topping/${elem.name}`} 
            key={elem.id}
            // className={elem.name === activeTopping && 'active' } 
            >
                <span className="name">{elem.name} </span>
                <span className="count">{elem.count} </span>
            </Link>
        ))}
    </ToppingStyles>
    )
}

export default ToppingsFilter