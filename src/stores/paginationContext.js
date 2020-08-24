import React, { createContext, useReducer, useEffect, useRef } from 'react';
import { PaginationReducer, PAGINATION_OPS } from './reducers/paginationReducer';
import { getApartmentsPreviewsQueryForward, getApartmentsCursors } from '../stores/queries/queries'

// import ApolloClient from 'apollo-boost';
import { ApolloClient } from "apollo-client";
// import { createHttpLink } from "@apollo/client";
import { useQuery } from '@apollo/react-hooks';
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { setContext } from '@apollo/client/link/context';


// const httpLink = createHttpLink({
//     uri: 'https://35.233.180.148/graphql',
//   });
// const UserAgent =  "User-Agent";
// const AcceptLanguage =  "Accept-Language";
// const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     // const token = localStorage.getItem('token');
//     // return the headers to the context so httpLink can read them
//     return {
//       headers: {
//         ...headers,
//         // authorization: token ? `Bearer ${token}` : "",
//         // Origin: "https://practical-panini-bac2b5.netlify.app",
//         // Referer: "https://practical-panini-bac2b5.netlify.app/",
//         // [UserAgent]: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
//         // [AcceptLanguage]: "en-US,en;q=0.9,he;q=0.8",
//         // 'Access-Control-Allow-Origin': '*',
//       }
//     }
//   });

export const PaginationContext = createContext();

const PaginationContextProvider = (props) => {
    const loadCount = useRef(0);

    const paginationEdges = useRef({
        pagesIds: [],
        start: -1,
        end: -1,
        currentPage: 1,
        // wpClient: new ApolloClient({ uri: 'https://35.233.180.148/graphql' }),
        wpClient: new ApolloClient({
            // link: authLink.concat(httpLink),
            link: new HttpLink({
              uri: "https://35.233.180.148/graphql",
              credentials: 'same-origin'
            }),
            fetchOptions: {
                mode: 'no-cors',
              },
            cache: new InMemoryCache({})
          }),
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