// import "./src/styles/global.css"
import React from "react"
import UserContextProvider from "./src/stores/userContext"
import FilterContextProvider from "./src/stores/filterContext"
import PaginationContextProvider from "./src/stores/paginationContext"

export const wrapRootElement = ({ element }) => {
  return (
    <UserContextProvider>
      <FilterContextProvider>
        <PaginationContextProvider>
          {element}
        </PaginationContextProvider>
      </FilterContextProvider>
    </UserContextProvider>
  )
}

// or:
// require('./src/styles/global.css')