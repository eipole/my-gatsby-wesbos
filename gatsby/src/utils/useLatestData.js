const { useEffect } = require("react")
const { useState } = require("react")
const gql = String.raw
const deets = `
     name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
 `

function useLatestData() {
  const [hotSlices, setHotSlices] = useState()
  const [slicemasters, setSlicemasters] = useState()
  const url = process.env.GATSBY_GRAPHQL_ENDPOINT
  // use sideeffect to fetch data from gq endpoint
  useEffect(function () {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSlicemasters(res.data.StoreSettings.slicemaster)
        setHotSlices(res.data.StoreSettings.hotSlices)
      })
      .catch((err) => {
        console.log("Idiot")
        console.log(err)
      })
  }, [])
  return {
    hotSlices,
    slicemasters,
  }
}
export default useLatestData
