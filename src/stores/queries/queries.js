import { gql } from 'apollo-boost';


const getApartmentsPreviewsQueryForward = gql`
    query GET_POSTS($first: Int, $after: String) {
        posts(first: $first, after: $after) {
            pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    title
                    id
                    excerpt
                    slug
                    date
                    featuredImage {
                        node {
                          sourceUrl
                        }
                    }
                }
            }
        }
    }
`;

const getApartmentsPreviewsQueryBackward = gql`
    query GET_POSTS($last: Int, $before: String) {
        posts(last: $last, before: $before) {
            pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    title
                    id
                    excerpt
                    slug
                    date
                    featuredImage {
                        node {
                          sourceUrl
                        }
                    }
                }
            }
        }
    }
`;

const getApartmentsCursors = gql`
    query GET_POSTS {
        posts {
            edges {
                cursor
            }
        }
    }
`;

export { getApartmentsPreviewsQueryForward, getApartmentsPreviewsQueryBackward, getApartmentsCursors };