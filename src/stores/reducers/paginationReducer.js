export const PAGINATION_DIRECTION = {
    LEFT: ['last', 'before'],
    RIGHT: ['first', 'after'],
}

export const PAGINATION_OPS = {
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
    SET_APARTMENTS_PER_PAGE: "SET_APARTMENTS_PER_PAGE",
    SET_PAGINATION_EDGES_CURSORS: "SET_PAGINATION_EDGES_CURSORS",
}

export const PaginationReducer = (state, action) => {
    switch (action.type) {
        case PAGINATION_OPS.SET_CURRENT_PAGE:
            return {
                currentPage: action.paginationData.currentPage,
                perPage: state.perPage,
                numOfApartments: state.numOfApartments,
                paginationEdges: state.paginationEdges
            };
        case PAGINATION_OPS.SET_APARTMENTS_PER_PAGE:
            return {
                currentPage: state.currentPage,
                perPage: action.paginationData.perPage,
                numOfApartments: state.numOfApartments,
                paginationEdges: state.paginationEdges
            };
        case PAGINATION_OPS.SET_PAGINATION_EDGES_CURSORS:
            return {
                currentPage: state.currentPage,
                perPage: state.perPage,
                numOfApartments: state.numOfApartments,
                paginationEdges: action.paginationData.paginationEdges
            };
        default:
            return state;
    }
}