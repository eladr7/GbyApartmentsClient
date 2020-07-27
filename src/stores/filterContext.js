import React, { createContext, useState } from 'react';
// import { UserReducer, USER_OPS } from './userReducer';
// import {setCookie, getCookie, eraseCookie} from './cookieManager';

export const FilterContext = createContext();

const FilterContextProvider = (props) => {
    const [filter, setFilter] = useState(null)

    return (
        <FilterContext.Provider value={{
            filter,
            setFilter
        }}>
            {props.children}
        </FilterContext.Provider>
    );
}

export default FilterContextProvider;