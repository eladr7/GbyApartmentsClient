import React from 'react'
import { Link } from "gatsby"
import '../../layout/style/style.scss'
import './sidebar/sidebar.scss'
import SiteCard from './sidebar/siteCard';
import config from '../../../config/siteConfig';
import { useSiteMetadata } from '../hooks'


const navigationLinks = (pages) => {
    return (
        <ul className="suka">
            {pages.map((pageName, index) => {
                const to = index === 0 ? "/" : "/" + pageName.toLowerCase() + "/";
                return (<li className="mb-3 blat" key={index}>
                    <Link
                        to={to}
                        className="align-bottom"
                        activeClassName="current-page"
                    >
                        {pageName}
                    </Link>
                </li>)
            })}
        </ul>
    );
}

const Sidebar = ({ pages }) => {
  const { author } = useSiteMetadata()

    return (
        <div className="sidebar-container">
            <SiteCard siteData={{ siteTitle: config.siteTitle, description: config.siteDescription, photo: author.photo } }/>
            <div className="sidebar-divider"></div>
            {navigationLinks(pages)}
        </div>
    )
}

export default Sidebar
