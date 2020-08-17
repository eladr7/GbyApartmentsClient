import React from 'react'
import { Link } from "gatsby"
import '../../layout/style/style.scss'
import './sidebar/sidebar.scss'
import SiteCard from './sidebar/siteCard';
import SearchBar from './sidebar/SearchBar';
import config from '../../../config/siteConfig';
import { useSiteMetadata } from '../hooks'


const navigationLinks = (pages) => {
    return (
        <nav className="sidebar-navigation">
            <ul className="nav-list">
                {pages.map((pageName, index) => {
                    const pathName = pageName.toLowerCase();
                    const path = (pathName === 'login' || pathName === 'profile') ? 'app/' + pathName : pathName;
                    const to = index === 0 ? "/" : "/" + path + "/";
                    return (<li className="mb-3 nav-link" key={index}>
                        <Link
                            to={to}
                            className="align-bottom"
                            activeClassName="current-page"
                            activeStyle={{ color: 'red' }}
                        >
                            {pageName}
                        </Link>
                    </li>)
                })}
            </ul>
        </nav>
    );
}

const Sidebar = ({ pages }) => {
    const { author } = useSiteMetadata()

    return (
        <div className="sidebar-container">
            <SiteCard siteData={{ siteTitle: config.siteTitle, description: config.siteDescription, photo: author.photo }} />
            <div className="sidebar-divider"></div>
            {navigationLinks(pages)}
            <div className="sidebar-divider"></div>
            <SearchBar/>
        </div>
    )
}

export default Sidebar
