import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
// import { useIsMobile } from './apartmentPreview/utils';
import './apartmentPreview/apartmentPreview.scss';
import PostText from './apartmentPreview/postText';


const apartmentPreview = ({ node }) => {
  const {
    featured_media = {},
    featured_media: { localFile: { childImageSharp: { resolutions } } },
    excerpt, slug, title, date
  } = node;

  return (
    <article className="post-card">
      <PostText
        date={date}
        head={<Link to={slug}>{title}</Link>}
      >
        {/* <p>{excerpt}</p> */}
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      </PostText>
      {resolutions &&
        <Link to={slug} className="preview-img">
          <Img
            resolutions={resolutions}
            style={{ width: `350px`, height: `200px` }}
          />
        </Link>
      }
    </article>
  );
};

const blogPostLink = (posts) => {
  return (
    <div style={{ marginLeft: `2%` }} className="posts">
      {posts.edges.map(({ node }) => (
        <div key={node.id}>
          {apartmentPreview({ node })}
        </div>
      ))}
    </div>
  );
}


const WpApartmentsLinks = ({ data }) => (
  <div>
    <div>
      <h2>Available apartments:</h2>
    </div>
    {blogPostLink(data.allWordpressPost)}
  </div>
)


export default WpApartmentsLinks;