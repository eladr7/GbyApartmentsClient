import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import Pagination from './pagination';

const getLink = (node, slug, title, date) => {
  return (
    <Link
      to={slug}
      css={css`text-decoration: none; color: inherit;`}
    >
      <h3 css={css`margin-bottom: 5px;`}>
        {title}{" "}
        <span>
          — {date}
        </span>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </Link>
  );
}

const blogPostLink = (blogType, posts, color, blogsTitle) => {
  return (
    <div style={{ marginLeft: `5%` }}>
      <h3 style={{ color: `${color}` }}>{blogsTitle}</h3>
      <h4>{posts.totalCount} Posts</h4>
      {posts.edges.map(({ node }) => (
        <div key={node.id}>
          {blogType === "wp" ? getLink(node, node.slug, node.title, node.date) : getLink(node, node.fields.slug, node.frontmatter.title, node.frontmatter.date)}
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
    <div>
      {blogPostLink("wp", data.allWordpressPost, 'red', 'My WordPress Posts:')}
      <Pagination />
    </div>
  </div>
)


export default WpApartmentsLinks;