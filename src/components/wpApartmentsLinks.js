import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import './apartmentPreview/apartmentPreview.scss';
import PostText from './apartmentPreview/postText';


const apartmentPreview = ({ node }) => {
  const {
    featuredImage = {},
    featuredImage: { node: { sourceUrl } },
    excerpt, slug, title, date
  } = node;

  return (
    <article className="post-card">
      <PostText
        date={date}
        head={<Link to={slug}>{title}</Link>}
      >
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      </PostText>
      {sourceUrl &&
        <Link to={slug} className="preview-img">
          {/* <Img
            resolutions={resolutions}
            style={{ width: `350px`, height: `200px` }}
          /> */}
          <img
            src={sourceUrl}
            style={{ width: `150px`, height: `90px` }}
          />
        </Link>
      }
    </article>
  );
};

const blogPostLinks = (posts) => (
  <div style={{ marginLeft: `2%` }} className="posts">
    {posts.edges.map(({ node }) => (
      <div key={node.id} style={{ marginTop: `4%` }}>
        {apartmentPreview({ node })}
      </div>
    ))}
  </div>
);

const WpApartmentsLinks = ({ previews }) => (
  <div>
    <div>
      <h2>Available apartments:</h2>
    </div>
    {blogPostLinks(previews)}
  </div>
)


export default WpApartmentsLinks;