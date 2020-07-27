import React from 'react'
import { Link } from "gatsby"
import '../../layout/style/style.scss'
import './sidebar/sidebar.scss'
import SiteCard from './sidebar/siteCard';

const navigationLinks = (pages) => {
    return (
        <ul>
            {pages.map((pageName, index) => {
                const to = index === 0 ? "/" : "/" + pageName.toLowerCase() + "/";
                return (<li className="mb-3" key={index}>
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
    return (
        <div className="mr_10p">
            <SiteCard author={author}/>
            <Divider className="sidebar-divider" />
            {navigationLinks(pages)}
        </div>
    )
}

export default Sidebar
