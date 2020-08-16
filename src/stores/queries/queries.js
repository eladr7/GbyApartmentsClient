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
                          sourceUrl(size: THUMBNAIL)
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

export { getApartmentsPreviewsQueryForward, getApartmentsCursors };