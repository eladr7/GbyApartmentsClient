import React, { createContext, useState } from 'react';
// import { UserReducer, USER_OPS } from './userReducer';
// import {setCookie, getCookie, eraseCookie} from './cookieManager';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;