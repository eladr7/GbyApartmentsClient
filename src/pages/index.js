import React from "react"
import Layout from '../components/layout'
import WpApartmentsLinks from '../components/wpApartmentsLinks'
import { graphql } from "gatsby"

// Elad: pass to Layout: headerText="Home page blat!" pageTitle="My site title"
// And also if there should be a query or not.
export default function Home({ data }) {
  return (
    <Layout pageTitle="My site title" headerText="Apartments list">
      <WpApartmentsLinks data={data} />
    </Layout>
  );
}

export const query = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`