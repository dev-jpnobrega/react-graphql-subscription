import gql from 'graphql-tag'

export default gql`
subscription chatReceiverMessages (
  $chatId: String!,
  $userId: String!
) { 
    chatReceiverMessages(
        chatId: $chatId,
        userId: $userId
  )
  {
    erros {
      code
      field
      message
    }
    receiver {
        message {
          id
          text
          sendingUser {
            id
            name
          }        
        }
        chat {
          id
          name
        }
      }
  }
}`
