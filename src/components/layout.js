import React from "react"
import '../layout/style/style.scss'

// import AntLayoutWrapper from "./layoutComps/antLayoutWrapper"
import SideBar from "./layoutComps/Sidebar"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "./layoutComps/seo"
import Footer from "./layoutComps/footer"

// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';

// // const client = new ApolloClient({
// //   uri: 'https://gatsby-server-ugdhobbyma-uw.a.run.app/graphql'
// // });
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql'
// });


export default function Layout({ children, pageTitle, headerText, postExcerpt = null, pagination = false }) {
  const query = graphql`
  query {
    site {
      siteMetadata {
        title
        keywords
        navigationLinks
      }
    }
  }
`;
  const data = useStaticQuery(query);

  const {
    title,
    keywords,
    navigationLinks
  } = data.site.siteMetadata;

  return (
    <div className="d-flex">
      <SideBar hideMobile={true} pages={navigationLinks} headerText={headerText} />
      <div className="page-content">
        <SEO title={pageTitle} description={postExcerpt} />
        {/* <ApolloProvider client={client}> */}
        {children}
        {/* </ApolloProvider> */}
        <Footer pagination={pagination}/>
      </div>
    </div>
  )
}

