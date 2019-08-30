import gql from 'graphql-tag'

export default gql`
mutation createChat (
  $name: String!,
  $userId: ID!
) { 
  createChat(input: {
    name: $name,
    userId: $userId
  })
  {
    erros {
      code
      field
      message
    }
    chat {
      id     
      name
      participants {
        id
        name
      }
    }
  }
}`