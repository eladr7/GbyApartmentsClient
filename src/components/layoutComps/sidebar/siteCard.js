import React from 'react'
import { withPrefix, Link, useStaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"

const SiteCard = ({ siteData }) => {
  const query = graphql`
  query {
    file(relativePath: { eq: "beach.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
    const data = useStaticQuery(query)

    return (
        <div className="text-center pt-5 site-card">
            <Link to="/">
                {/* <img
                    className="rounded-full"
                    src={withPrefix(siteData.photo)}
                    width={150}
                    alt={siteData.siteTitle}
                    style={{'borderRadius':'50%'}}
                /> */}
                <Img
                    className="headshot"
                    fixed={data.file.childImageSharp.fixed}
                    alt="headshot"
                    style={{ 'borderRadius': '50%' }}
                />
            </Link>
            <div className="title">
                <h3 className="header">{siteData.siteTitle}</h3>
                <p className="description">{siteData.description}</p>
            </div>
        </div>
    )
}

export default SiteCard
