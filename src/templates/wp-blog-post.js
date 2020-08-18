import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"

export default function BlogPost({ data }) {
  const post = data.allWordpressPost.edges[0].node
  const imagesResolutions = post.featured_media.localFile.childImageSharp.resolutions

  return (
    <Layout pageTitle={post.title} postExcerpt={post.content}>
      <div className="post-page">
        <h1>{post.title}</h1>
        <div className="post-divider"></div>
        <div className="post-data">
          <div className="post-info">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          {imagesResolutions &&
            <div>
              <Img className="post-image" resolutions={imagesResolutions} />
            </div>
          }
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          content
          featured_media{
            localFile{
                childImageSharp{
                    resolutions(width:500, height: 200){
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