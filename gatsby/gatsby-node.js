import fetch from "isomorphic-fetch"
import { graphql } from "gatsby"
import path from "path"

async function turnPizzasintoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve("./src/templates/Pizza.js")
  // node API need to await
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)
  data.pizzas.nodes.forEach((elem) => {
    actions.createPage({
      path: `pizza/${elem.slug.current}`,
      component: pizzaTemplate,
      // can use pageContext for aditional data(slug or samthind)
      context: {
        slug: elem.slug.current,
      },
    })
  })
}
/* use name for path, pass name as context */

async function turnToppingsInPages({ graphql, actions }) {
  const toppingTemplate = path.resolve("./src/pages/pizzas.js")
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
    }
  `)
  data.toppings.nodes.forEach((elem) =>
    actions.createPage({
      path: `topping/${elem.name}`,
      component: toppingTemplate,
      context: {
        topping: elem.name,
        toppingRegex: `/${elem.name}/i`,
      },
    })
  )
}

/* fetching data (no sanity) */

async function fetchBeersAndMakeNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch("https://api.sampleapis.com/beers/ale")
  const beers = await res.json()
  for (const beer of beers) {
    // const nodeContent = JSON.stringify(beer) Not needed
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: "Beer",
        mediaType: "application/json",
        contentDigest: createContentDigest(beer),
      },
    }
    actions.createNode({
      ...beer,
      ...nodeMeta,
    })
  }
}

async function turnSlicemastersToPages({ graphql, actions }) {
  const personTemplate = path.resolve("./src/templates/Slicemaster.js")
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)
  data.slicemasters.nodes.forEach((elem) => {
    actions.createPage({
      path: `/slicemasters/${elem.slug.current}`,
      component: personTemplate,
      context: {
        name: elem.person,
        slug: elem.slug.current,
      },
    })
  })
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve("./src/pages/slicemasters.js"),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    })
  })
}
// bruker ferdig slisemasters func istedet
/* async function turnMasterToPage({ graphql, actions }) {
  const personTemplate = path.resolve("./src/templates/Slicemaster.js")
  const { data } = await graphql(`
    query {
      person: allSanityPerson {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `)
  data.person.nodes.forEach((elem) => {
    actions.createPage({
      path: `/slicemasters/${elem.slug.current}`,
      component: personTemplate,
      context: {
        name: elem.person,
        slug: elem.slug.current,
      },
    })
  })
} */

export async function sourceNodes(params) {
  // fetch list and source to gatsby api
  await fetchBeersAndMakeNodes(params)
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasintoPages(params),
    turnToppingsInPages(params),
    turnSlicemastersToPages(params),
    // turnMasterToPage(params),
  ])
}

/* https://sampleapis.com/beers/api/ale */
