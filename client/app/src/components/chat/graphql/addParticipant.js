import gql from 'graphql-tag'

export default gql`
mutation addParticipant (
  $chatId: ID!,
  $userId: ID!
) { 
  addParticipant(input: {
    chatId: $chatId,
    userId: $userId
  })
  {
    erros {
      code
      field
      message
    }
    validation
  }
}`