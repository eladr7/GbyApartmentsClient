import React, { createContext, useState } from 'react';
// import { UserReducer, USER_OPS } from './userReducer';
// import {setCookie, getCookie, eraseCookie} from './cookieManager';

export const PaginationContext = createContext();

const PaginationContextProvider = (props) => {
    const [pagination, setPagination] = useState(null)

    return (
        <PaginationContext.Provider value={{
            pagination,
            setPagination
        }}>
            {props.children}
        </PaginationContext.Provider>
    );
}

export default PaginationContextProvider;