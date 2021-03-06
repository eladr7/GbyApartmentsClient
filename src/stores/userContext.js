import React, { createContext, useEffect, useRef } from 'react';
// import { UserReducer, USER_OPS } from './userReducer';
// import {setCookie, getCookie, eraseCookie} from './cookieManager';
import { ApolloClient } from "apollo-client";
import { getAccessToken, setAccessToken } from "../accessToken";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const getCookie = name => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const myServerClient = useRef({ clientForMyServer: null });
    useEffect(() => {
        const cache = new InMemoryCache({});
        const requestLink = new ApolloLink(
            (operation, forward) =>
                new Observable(observer => {
                    let handle;
                    Promise.resolve(operation)
                        .then(operation => {
                            const accessToken = getAccessToken();
                            if (accessToken) {
                                operation.setContext({
                                    headers: {
                                        authorization: `bearer ${accessToken}`
                                    }
                                });
                            }
                        })
                        .then(() => {
                            handle = forward(operation).subscribe({
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer)
                            });
                        })
                        .catch(observer.error.bind(observer));

                    return () => {
                        if (handle) handle.unsubscribe();
                    };
                })
        );
        const clientForMyServer = new ApolloClient({
            link: ApolloLink.from([
                new TokenRefreshLink({
                    accessTokenField: "accessToken",
                    isTokenValidOrUndefined: () => {
                        const token = getAccessToken();

                        if (!token) {
                            return true;
                        }

                        try {
                            const { exp } = jwtDecode(token);
                            if (Date.now() >= exp * 1000) {
                                return false;
                            } else {
                                return true;
                            }
                        } catch {
                            return false;
                        }
                    },
                    fetchAccessToken: () => {
                        const headers = {
                            ...(getCookie('jid')
                                ? {
                                    authorization: `Bearer ${getCookie('jid')}`
                                }
                                : {})
                        }
                        
                        return fetch("https://apartments-server-ugdhobbyma-uw.a.run.app/refresh_token", {
                            method: "POST",
                            credentials: "include",
                            headers: headers
                        });
                    },
                    handleFetch: ({accessToken, jid}) => {
                        setAccessToken({accessToken: accessToken, jid: jid});
                    },
                    handleError: err => {
                        console.warn("Your refresh token is invalid. Try to relogin");
                        console.error(err);
                    }
                }),
                onError(({ graphQLErrors, networkError }) => {
                    console.log(graphQLErrors);
                    console.log(networkError);
                }),
                requestLink,
                new HttpLink({
                    uri: "https://apartments-server-ugdhobbyma-uw.a.run.app/graphql",
                    credentials: "include"
                })
            ]),
            cache
        });

        myServerClient.current.clientForMyServer = clientForMyServer;
    }, []);

    const getMyServerClient = () => {
        return { myServerClient: myServerClient.current.clientForMyServer };
    }

    return (
        <UserContext.Provider value={{
            getMyServerClient: () => getMyServerClient()
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;