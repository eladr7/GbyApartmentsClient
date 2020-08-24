/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Title from siteMetadata`,
    subtitle: `This is a cool apartments site`,
    copyright: '© 2020 | TLV, Israel',
    description: `A simple description about pandas eating lots...`,
    keywords: ['apartments TLV', 'sublet apartments', 'short term apartments', 'rent apartments'],
    navigationLinks: ['Home', 'About', 'Contact', 'Profile', 'Login'],
    siteUrl: `http://localhost:8000/`,
    menu: [
      {
        label: 'Contact us',
        path: '/contact'
      },
      {
        label: 'About us',
        path: '/about'
      }
    ],
    author: {
      name: 'Available Apartments',
      photo: '/beach.jpg',
      bio: 'Developer. Optimizer. Learner.',
      contacts: {
        // don't remove fields, just make them empty string ''
        // https://github.com/gatsbyjs/gatsby/issues/2392
        github: 'dospolov',
        twitter: 'marat_dospolov',
        linkedin: 'dospolov',
        telegram: 'dospolov',
        instagram: 'dospolov',
        facebook: 'dospolov',
        email: ''
      }
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
         * Example : 'demo.wp-api.org' or 'www.example-site.com'
         */
        baseUrl: `http://35.233.180.148/`,
        // The protocol. This can be http or https.
        protocol: `http`,
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the assumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // If useACF is true, then the source plugin will try to import the WordPress ACF Plugin contents.
        // This feature is untested for sites hosted on WordPress.com
        useACF: true,
        includedRoutes: [
          "**/posts",
          "**/pages",
          "**/media",
          "**/categories",
          "**/tags",
          "**/taxonomies",
          // "**/users", // uncomment this and watch the warning above reappear!
          "**/menus",
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://apartments-server-ugdhobbyma-uw.a.run.app/graphql'
      }
    },
    `gatsby-transformer-remark`,
    'gatsby-plugin-typescript',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/beach.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
  ],
}
