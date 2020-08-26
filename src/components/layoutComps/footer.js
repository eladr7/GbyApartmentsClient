import React from 'react';
import config from '../../../config/siteConfig';
import './footer.scss'
// import Pagination from './pagination';
import Pagination2 from './pagination2';
const Footer = ({pagination = false, currentPage = -1, numPages = -1}) => {
// const Footer = () => {
    return (
        <div className="footer">
            {pagination && <Pagination2 currentPage={currentPage} numPages={numPages} />}
            <div className="footer-divider"></div>
            <footer className="footer-links">
                <div className="links">
                    {config.rrssb.map(item => (
                        <a href={item.url} key={item.label} target="_top" rel="noopener noreferrer" aria-label={item.label}>
                            <i className={`${item.iconClassName} fa-2x`} />
                        </a>
                    ))}
                    <a href={`${config.pathPrefix}${config.siteRss}`} target="_blank" rel="noopener noreferrer" aria-label="rss">
                        <i className="fa fa-rss fa-2x" />
                    </a>
                </div>
                <p>{config.copyright}</p>
            </footer>
        </div>
    );
}

export default Footer;