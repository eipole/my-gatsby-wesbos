import { graphql } from 'gatsby';
import React from 'react'
import styled from 'styled-components';
// import Img from 'gatsby-image'

const BeersDiv = styled.div`
display: grid;
grid-gap: 1rem;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
/* display: flex;
flex-wrap: wrap;
justify-content: space-between; */
`
const SingleBeerStyle = styled.div`
border: 1px solid var(--grey);
padding: 2rem;
text-align: center;
img{
  width: 100%;
  height: 200px;
  object-fit: contain;
  display: block;
  display: grid;
  align-items: center;
  font-size: 10px;
}
`

function Beers({ data }) {
  const beers = data.allBeer.nodes
  return (
    <>
      <h2 className="center" >We have {beers.length} beers available! </h2>
      <BeersDiv>
      {beers.map(beer => {
        const rating = Math.round(beer.rating.average)
        return (
          <SingleBeerStyle key={beer.id} >
            <img src={beer.image} alt={beer.name} />
            <h3>{beer.name}</h3>
            {beer.price}
            <p title={`${rating}out of 5 stars`} >
              {/* need star emoji or samthing */}
              {`*`.repeat(rating)} 
              <span style={{ filter: `grayscale(100%)` }} >
                {`*`.repeat(5 - rating)}
              </span>
              <span>({beer.rating.reviews})</span>
            </p>
          </SingleBeerStyle>)
      })}
      </BeersDiv>
    </>
  )

}


export const query = graphql`
query BeerQueery {
  allBeer {
    nodes {
      image
      name
      id
      rating {
        average
        reviews
      }
    }
  }
}
`

export default Beers;
/* my variant */
/*

function Beers({data}){
  const beers = data.allBeer.nodes
  console.log(beers)
 return (
<BeersDiv>
  {beers.slice(0,7).map(beer=>(
 <div className="singelBeer" key={beer.id} >
   <img src={beer.image} alt="beer" />
   <h3>{beer.name}</h3>
  <p>Average rating: {beer.rating.average}</p>
 </div>
 ) )}
</BeersDiv>
 )
} */