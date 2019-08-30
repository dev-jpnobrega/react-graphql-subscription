import gql from 'graphql-tag'

export default gql`
subscription {
    typeAdded {
      typeId
      typeName
    }
}`;