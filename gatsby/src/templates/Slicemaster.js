import { graphql } from "gatsby"
import React from "react"
import Img from "gatsby-image"
import SEO from "../components/SEO"

function SingleSlicemaster({ data }) {
  const { person } = data
  console.log(person)
  return (
    <>
      <SEO title={person.name} />
      <div className="center">
        <Img fluid={person.image.asset.fluid} />
        <h2 className={"mark"}>
          <span>{person.name}</span>
        </h2>
        <p>{person.description} </p>
      </div>
    </>
  )
}

export default SingleSlicemaster

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      description
      name
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
      slug {
        current
      }
    }
  }
`
