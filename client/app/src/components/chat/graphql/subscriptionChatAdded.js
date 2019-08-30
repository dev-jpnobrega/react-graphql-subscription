import gql from 'graphql-tag'

export default gql`
subscription {
  chatAdded {
    id
    name
    participants
    {
      id
      name
    }
    messages {
      text
    }
  }
}`;