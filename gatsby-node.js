const path = require(`path`)
const config = require('./config/siteConfig');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const createWpPages = (graphql, createPage) => {
  return graphql(`
    {
      allWordpressPost(sort: { fields: [date] }) {
        edges {
          node {
            title
            excerpt
            content
            slug
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allWordpressPost.edges;

    posts.forEach(({ node }, index) => {
      const next = index === 0 ? null : posts[index - 1].node;
      const prev = index === posts.length - 1 ? null : posts[index + 1].node;
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/wp-blog-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
          prev,
          next,
        },
      })
    });

    const { postsPerPage } = config;
    let numPages = Math.ceil(posts.length / postsPerPage);
    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve('./src/templates/postList.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    }
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  createWpPages(graphql, createPage)
}


// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"

    // Update the page.
    createPage(page)
  }
}
