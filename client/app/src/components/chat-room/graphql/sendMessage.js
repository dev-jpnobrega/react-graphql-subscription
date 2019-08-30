import gql from 'graphql-tag'

export default gql`
mutation sendMessage (
  $chatId: ID,
  $text: String,
  $sendingUser: UserSendingInput
) { 
  sendMessage (input: {
    chatId: $chatId,
    text: $text,
    sendingUser: $sendingUser
  }) {
    message {
      id
      text
      sendingUser {
        id
      }
    }
    erros {
      field
      message
    }
  }
}`