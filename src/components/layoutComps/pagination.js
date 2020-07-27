import React, { useContext } from 'react';
import { Link } from 'gatsby';
import './footer.scss'
import { isNumber } from 'util';
import { PaginationContext } from '../../stores/paginationContext';

function getPages(currentPage, pageCount, delta = 2) {
    const separate = (a, b) => [
        a,
        ...({
            0: [],
            1: [b],
            2: [a + 1, b],
        }[b - a] || ['...', b]),
    ];

    return Array(delta * 2 + 1)
        .fill()
        .map((_, index) => currentPage - delta + index)
        .filter(page => page > 0 && page <= pageCount)
        .flatMap((page, index, { length }) => {
            if (!index) return separate(1, page);
            if (index === length - 1) return separate(page, pageCount);

            return [page];
        });
}

const Pagination = () => {
    const paginationContext = useContext(PaginationContext);
    const { currentPage, perPage, numOfApartments } = paginationContext.getPaginationData();

    let numPages = Math.ceil(numOfApartments / perPage);
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const pages = getPages(currentPage, numPages);


    return (
        <div className="pagination">
            {!isFirst && (
                <Link to='/' rel="prev"
                    onClick={event => {
                        event.preventDefault();
                        paginationContext.setCurrentPage(currentPage - 1);
                    }}
                >
                    <i className="fas fa-arrow-left" />
            Previous Page
                </Link>
            )}
            <div className="pagination-number">
                {pages.map(page =>
                    isNumber(page) ? (
                        <Link
                            key={`pagination-number${page}`}
                            to='/'
                            activeClassName={currentPage === page ? "active" : ""}
                            onClick={event => {
                                event.preventDefault()
                                paginationContext.setCurrentPage(page);
                            }}
                        >
                            {page}
                        </Link>
                    ) : (
                            <span key="ellipsis">{page}</span>
                        ),
                )}
            </div>
            {!isLast && (
                <Link rel="next"
                    to="/"
                    onClick={event => {
                        event.preventDefault()
                        paginationContext.setCurrentPage(currentPage + 1);
                    }}
                >
                    Next Page
                    <i className="fas fa-arrow-right" />
                </Link>
            )}
        </div>
    );
}

export default Pagination;
