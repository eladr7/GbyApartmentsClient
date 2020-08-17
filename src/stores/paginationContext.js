import React, { createContext, useReducer, useEffect, useRef } from 'react';
import { PaginationReducer, PAGINATION_OPS } from './reducers/paginationReducer';
import { getApartmentsPreviewsQueryForward, getApartmentsCursors } from '../stores/queries/queries'

import ApolloClient from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';


export const PaginationContext = createContext();

const PaginationContextProvider = (props) => {
    const loadCount = useRef(0);

    const paginationEdges = useRef({
        pagesIds: [],
        start: -1,
        end: -1,
        currentPage: 1,
        wpClient: new ApolloClient({ uri: 'http://35.233.180.148/graphql' }),
        filterParams: {
            minPriceCtx: '0',
            maxPriceCtx: '0',
            bedroomsNumCtx: '',
            areaCtx: ''
        }
    });
    const [paginationData, dispatch] = useReducer(PaginationReducer, {}, () => {
        const initialState = {
            currentPage: 1,
            perPage: 2,
            shouldReload: true
        };
        return initialState;
    });

    useEffect(() => {
    }, []);

    const getApartmentsIndexesToFecth = (newPage = -1) => {
        // Get indexes: perPage* (currentPage - 1) --> (perPage * currentPage) - 1
        const { perPage } = paginationData;
        const numOfApartments = paginationEdges.current.pagesIds.length;

        const pageNum = newPage !== -1 ? newPage : paginationEdges.current.currentPage;

        const minIndex = numOfApartments === 0 ? -1 : perPage * (pageNum - 1);
        const maxIndex = (perPage * pageNum > numOfApartments) ? (perPage * pageNum) - (perPage - numOfApartments % perPage) - 1 : (perPage * pageNum) - 1;
        return { minIndex: minIndex, maxIndex: maxIndex };
    }

    const setPageIndexes = (pageNum = -1) => {
        const { minIndex, maxIndex } = getApartmentsIndexesToFecth(pageNum);
        paginationEdges.current.start = minIndex;
        paginationEdges.current.end = maxIndex;
    }

    const filterVariables = {
        "search": "Price: " + paginationEdges.current.filterParams.minPriceCtx.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$/M"
    }
    const { loading, error, data } = useQuery(getApartmentsCursors, { client: paginationEdges.current.wpClient, variables: { ...filterVariables } });

    if (data && data.posts && !loading && !error && loadCount.current === 0) {
        loadCount.current++;
        paginationEdges.current.pagesIds = data.posts.edges.map(edge => edge.cursor);

        setPageIndexes();
    }

    const setCurrentPage = (pageNum) => {
        setPageIndexes(pageNum);
        paginationEdges.current.currentPage = pageNum;

        dispatch({
            type: PAGINATION_OPS.SET_CURRENT_PAGE,
            paginationData: { currentPage: pageNum }
        });
    }

    const setPerPage = (postsPerPage) => {
        dispatch({
            type: PAGINATION_OPS.SET_APARTMENTS_PER_PAGE,
            paginationData: { perPage: postsPerPage }
        });
        loadCount.current = 0;
    }

    const getPaginationData = () => ({ ...paginationData, numOfApartments: paginationEdges.current.pagesIds.length });

    const getPaginationQuery = () => {
        const startIndex = paginationEdges.current.start;
        const cursorIdToFetchFrom = (startIndex === 0 || startIndex === -1) ? null : paginationEdges.current.pagesIds[paginationEdges.current.start - 1];

        const variables = {
            first: paginationData.perPage,
            after: cursorIdToFetchFrom,
            search: "Price: " + paginationEdges.current.filterParams.minPriceCtx.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$/M"
        }

        return { wpQuery: getApartmentsPreviewsQueryForward, variables, wpClient: paginationEdges.current.wpClient };
    }

    const getFilterParams = () => {
        return paginationEdges.current.filterParams;
    }

    const setFilterContext = (minPrice, maxPrice, bedroomsNum, area) => {
        const filterParams = {
            minPriceCtx: minPrice,
            maxPriceCtx: maxPrice,
            bedroomsNumCtx: bedroomsNum,
            areaCtx: area
        }

        paginationEdges.current.filterParams = filterParams;
        loadCount.current = 0;
        dispatch({
            type: PAGINATION_OPS.SET_SHOULD_RELOAD,
            paginationData: { shouldReload: !paginationData.shouldReload }
        });
    }

    const resetFilters = () => {
        const filterParams = {
            minPriceCtx: '0',
            maxPriceCtx: '0',
            bedroomsNumCtx: '',
            areaCtx: ''
        }

        paginationEdges.current.filterParams = filterParams;
        loadCount.current = 0;
        dispatch({
            type: PAGINATION_OPS.SET_SHOULD_RELOAD,
            paginationData: { shouldReload: !paginationData.shouldReload }
        });
    }

    return (
        <PaginationContext.Provider value={{
            paginationData,
            dispatch,
            setCurrentPage: (pageNum) => setCurrentPage(pageNum),
            setPerPage: (postsPerPage) => setPerPage(postsPerPage),
            getPaginationData: () => getPaginationData(),
            getPaginationQuery: () => getPaginationQuery(),
            getFilterParams: () => getFilterParams(),
            setFilterContext: (minPrice, maxPrice, bedroomsNum, area) => setFilterContext(minPrice, maxPrice, bedroomsNum, area),
            resetFilters: () => resetFilters()
        }}>
            {props.children}
        </PaginationContext.Provider>
    );
}

export default PaginationContextProvider;