// import "./src/styles/global.css"
// or:
// require('./src/styles/global.css')
import React from "react"
import UserContextProvider from "./src/stores/userContext"
import FilterContextProvider from "./src/stores/filterContext"
import PaginationContextProvider from "./src/stores/paginationContext"

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";


const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
  }),
  cache: new InMemoryCache({})
});

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <FilterContextProvider>
          <PaginationContextProvider>
            {element}
          </PaginationContextProvider>
        </FilterContextProvider>
      </UserContextProvider>
    </ApolloProvider>
  )
}
