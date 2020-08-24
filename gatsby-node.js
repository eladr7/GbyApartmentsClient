const path = require(`path`)
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
        result.data.allWordpressPost.edges.forEach(({ node }) => {
            createPage({
                path: node.slug,
                component: path.resolve(`./src/templates/wp-blog-post.js`),
                context: {
                    // This is the $slug variable
                    // passed to blog-post.js
                    slug: node.slug,
                },
            })
        })
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
