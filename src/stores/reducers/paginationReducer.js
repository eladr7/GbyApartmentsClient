export const PAGINATION_DIRECTION = {
    LEFT: ['last', 'before'],
    RIGHT: ['first', 'after'],
}

export const PAGINATION_OPS = {
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
    SET_APARTMENTS_PER_PAGE: "SET_APARTMENTS_PER_PAGE",
    SET_SHOULD_RELOAD: "SET_SHOULD_RELOAD"
}

export const PaginationReducer = (state, action) => {
    switch (action.type) {
        case PAGINATION_OPS.SET_CURRENT_PAGE:
            return {
                currentPage: action.paginationData.currentPage,
                perPage: state.perPage,
                shouldReload: state.shouldReload
            };
        case PAGINATION_OPS.SET_APARTMENTS_PER_PAGE:
            return {
                currentPage: state.currentPage,
                perPage: action.paginationData.perPage,
                shouldReload: state.shouldReload
            };
        case PAGINATION_OPS.SET_SHOULD_RELOAD:
            return {
                currentPage: state.currentPage,
                perPage: state.perPage,
                shouldReload: action.paginationData.shouldReload
            };
        default:
            return state;
    }
}