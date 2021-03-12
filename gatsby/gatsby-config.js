import dotenv from "dotenv"

dotenv.config({ path: ".env" })

export default {
  siteMetadata: {
    title: "SlickSlack",
    siteUrl: "https://gatsby.pizza",
    description: "Gatsby Pizza testing",
    twitter: "@slicksenSlacsen",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "wtt7saue",
        dataset: "production",
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
}
