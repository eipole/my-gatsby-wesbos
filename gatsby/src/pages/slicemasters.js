import { graphql, Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import Pagination from "../components/Pagination"
import SEO from "../components/SEO"

const StyledPerson = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`
const OnePerson = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-10deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 2rem;
    margin: 2rem;
    margin-top: -4rem;
    z-index: 2;
    position: relative;
    transform: rotate(-0.5deg);
    text-align: center;
  }
`
function Slicemasters({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes
  return (
    <>
      <SEO title={`Slicemaseterer - Page ${pageContext.currentPage || 1} `} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <StyledPerson>
        {slicemasters.map((person) => (
          <OnePerson key={person.id}>
            <Link to={`/slicemasters/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </OnePerson>
        ))}
      </StyledPerson>
    </>
  )
}

export const personquery = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
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

export default Slicemasters
