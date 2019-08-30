import gql from 'graphql-tag'

export default gql`query
    getByIdChat(
        $id: ID!
    ) {
        getByIdChat(
            id: $id
        ){
            name
            participants {
                name
                id
            }
            messages {
                id
                text
                sendingUser {
                    id
                    name
                }
            }
        }
    }`