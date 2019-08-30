import gql from 'graphql-tag'

export default gql`
mutation createUser (
  $name: String
  $email: String
) { 
  createUser(input: {
   name: $name,
   email: $email
 }) {
    user {
      id
      email
      name
    }
    erros {
      code
      field
      message
    }
  }
}`
