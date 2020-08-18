import { gql } from 'apollo-boost';


const getApartmentsPreviewsQueryForward = gql`
    query GET_POSTS($first: Int, $after: String, $search: String) {
        posts(first: $first, after: $after, where: {search: $search}) {
            edges {
                cursor
                node {
                    title
                    id
                    content
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
    query GET_POSTS($search: String) {
        posts(where: {search: $search}) {
            edges {
                cursor
            }
        }
    }
`;

export { getApartmentsPreviewsQueryForward, getApartmentsCursors };