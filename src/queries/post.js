import { gql } from '@apollo/client';

const Q_GET_POSTS = gql`{
        getPosts {
            id
            body
            username
            createdAt
            likeCount
            commentCount
            likes {
                username
            }
            comments {
                id
                username,
                body,
                createdAt
            }
        }
    }
`;

const Q_GET_POST = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            username
            createdAt
            likeCount
            commentCount
            likes {
                username
            }
            comments {
                id
                username,
                body,
                createdAt
            }
        }
    }
`;

const M_ADD_POST = gql`
    mutation createPost(
        $body: String!
    ) {
        createPost(
            body: $body
        ) {
            id
            body
            username
            createdAt
            likeCount
            commentCount
            likes {
                username
            }
            comments {
                id
                username,
                body,
                createdAt
            }
        }
    }
`;

const M_LIKE_POST = gql`
    mutation likePost(
        $postId: ID!
    ) {
        likePost(
            postId: $postId
        ) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;


const M_DELETE_POST = gql`
    mutation deletePost($postId: ID!)  {
        deletePost(postId: $postId)
    }
`;

const M_ADD_COMMENT = gql`
    mutation createComment(
        $postId: ID!
        $body: String!
    ) {
        createComment(
            postId: $postId
            body: $body
        ) {
            id
            likes {
                id
                username
            }
            commentCount
            comments {
                body 
                username 
                id 
                createdAt 
            } 
            body 
            likeCount
        }
    }
`;

const M_DELETE_COMMENT = gql`
    mutation deleteComment(
        $postId: ID!
        $commentId: ID!
    ) {
        deleteComment(
            postId: $postId
            commentId: $commentId
        ) {
            id
            likes {
                id
                username
            }
            commentCount
            comments {
                body 
                username 
                id 
                createdAt 
            } 
            body 
            likeCount
        }
    }
`;




export {
    Q_GET_POSTS,
    M_ADD_POST,
    M_LIKE_POST,
    M_DELETE_POST,
    Q_GET_POST,
    M_ADD_COMMENT,
    M_DELETE_COMMENT
};