import gql from 'graphql-tag'

export const getAllChats = `
    getAllChats {
        id
        name
        participants {
            id
            name
        }
        messages {
            text
        }
    }`

export default gql`query {
    ${getAllChats}
}`
