import React from "react"
import { graphql } from "gatsby"

// import { useQuery } from '@apollo/react-hooks';

import Layout from '../components/layout'
// import Pagination2 from '../components/layoutComps/pagination2';

// import { PaginationContext } from '../stores/paginationContext';
import WpApartmentsLinks from '../components/wpApartmentsLinks'

export default function PostList({ data, pageContext }) {

  const { currentPage, numPages } = pageContext;

  return (
    <Layout pageTitle="My site title" headerText="Apartments list" pagination={true} currentPage={currentPage} numPages={numPages} >
      <WpApartmentsLinks previews={data.allWordpressPost} />
      {/* <Pagination2 currentPage={currentPage} numPages={numPages} /> */}
    </Layout>
  );


  // const paginationContext = useRef(useContext(PaginationContext));
  // const { wpQuery, variables, wpClient } = paginationContext.current.getPaginationQuery();

  // const { loading, error, data } = useQuery(wpQuery, { client: wpClient, variables: { ...variables } });

  // if (loading) return <p>Loading the apartments previews</p>;

  // if (error) return (
  //   <Layout pageTitle="My site title" headerText="Apartments list" pagination={true}>
  //     <p>Error :(</p>
  //   </Layout>
  // )

  // if (data.posts) {
  //   return (
  //     <Layout pageTitle="My site title" headerText="Apartments list" pagination={true}>
  //       <WpApartmentsLinks previews={data.posts} />
  //     </Layout>
  //   );
  // }

  // return (
  //   <Layout pageTitle="My site title" headerText="Apartments list" pagination={true}>
  //     <div>No apartments to show</div>
  //   </Layout>
  // );
}

export const query = graphql`
  query PostListQuery($skip: Int!, $limit: Int!) {
    allWordpressPost(sort: { fields: [date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          title
          id
          content
          slug
          date
          featured_media{
            localFile{
              childImageSharp{
                  fixed(width:260, height: 130){
                      src
                      width
                      height
                  }
              }
            }
          }
        }
      }
    }
  }
`
// export const pageQuery = graphql`
//   query PostListQuery($skip: Int!, $limit: Int!) {
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           excerpt(pruneLength: 120)
//           timeToRead
//           frontmatter {
//             title
//             tags
//             cover {
//               childImageSharp {
//                 fluid(maxWidth: 400, maxHeight: 275) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//             date
//             category
//           }
//         }
//       }
//     }
//   }
// `;