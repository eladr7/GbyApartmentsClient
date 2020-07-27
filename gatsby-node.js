const path = require(`path`)

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
