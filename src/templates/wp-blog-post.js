import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import './post.scss';
import { useIsMobile } from './utils';

const PostPrevNext = ({ prev, next }) => {
  const isMobile = useIsMobile();
  return (
    <div className="post-prev-next">
      {prev &&
        (isMobile ? (
          <Link to={prev.slug} rel="prev" className="mobile-post-prev">
            <i className="fas fa-arrow-left" />
            prev
          </Link>
        ) : (
            <Link to={prev.slug} rel="prev" className="post-prev">
              <i className="fas fa-arrow-left" />
              {prev.title}
            </Link>
          ))}
      {next &&
        (isMobile ? (
          <Link to={next.slug} rel="next" className="mobile-post-next">
            next
            <i className="fas fa-arrow-right" />
          </Link>
        ) : (
            <Link to={next.slug} rel="next" className="post-next">
              {next.title}
              <i className="fas fa-arrow-right" />
            </Link>
          ))}
    </div>
  );
};

export default function BlogPost({ data, pageContext }) {
  const { slug, prev, next } = pageContext;

  const post = data.allWordpressPost.edges[0].node
  const imagesResolutions = post.featured_media.localFile.childImageSharp.resolutions

  return (
    <Layout pageTitle={post.title} postExcerpt={post.content}>
      {/* <SEO ...   path={slug}.... /> */}
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
        {/* <PostPrevNext prev={prev} next={next} /> */}
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