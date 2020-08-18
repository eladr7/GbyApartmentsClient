import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const query = graphql`
  query SiteMetaData {
    site {
      siteMetadata {
        author {
          name
          bio
          photo
        }
      }
    }
  }
`
  const { site } = useStaticQuery(query)

  return site.siteMetadata
}

export default useSiteMetadata
