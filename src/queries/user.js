import { gql } from '@apollo/client';

const M_REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword 
            }
        ) {
            id 
            email 
            username 
            createdAt
            token 
        }
    }
`;

const M_LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id 
            email 
            username 
            createdAt
            token 
        }
    }
`;

export {
    M_REGISTER_USER,
    M_LOGIN_USER
};