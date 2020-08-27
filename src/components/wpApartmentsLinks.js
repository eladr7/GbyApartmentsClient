import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import './apartmentPreview/apartmentPreview.scss';
import PostText from './apartmentPreview/postText';


const apartmentPreview = ({ node }) => {
  // const {
  //   featuredImage = {},
  //   featuredImage: { node: { sourceUrl } },
  //   content, slug, title, date
  // } = node;
  const {
    content, slug, title, date
  } = node;
  const imagesResolutions = node.featured_media.localFile.childImageSharp.fixed

  return (
    <article className="post-card">
      <PostText
        date={date}
        head={<Link to={`/${slug}`}>{title}</Link>}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </PostText>
      <Link to={`/${slug}`} className="preview-img">
          {imagesResolutions &&
            <Img resolutions={imagesResolutions} 
            style={{ width: `260px`, height: `130px` }}
            />
          }
        </Link>
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