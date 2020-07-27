// import "./src/styles/global.css"
import React from "react"
import UserContextProvider from "./src/stores/userContext"
import FilterContextProvider from "./src/stores/filterContext"
import PaginationContextProvider from "./src/stores/paginationContext"

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
const client = new ApolloClient({
  uri: 'http://35.233.180.148/graphql'
});

export const wrapRootElement = ({ element }) => {
  return (
    <UserContextProvider>
      <FilterContextProvider>
        <ApolloProvider client={client}>
          <PaginationContextProvider>
            {element}
          </PaginationContextProvider>
        </ApolloProvider>
      </FilterContextProvider>
    </UserContextProvider>
  )
}

// or:
// require('./src/styles/global.css')