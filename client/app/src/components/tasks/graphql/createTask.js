import gql from 'graphql-tag'

export default gql`
mutation createType (
  $typeId: Int
  $typeName: String
) { 
 createType(input: {
   typeName: $typeName,
   typeId: $typeId
 }) {
    erros {
      code
      field
      message
    }
  }
}`