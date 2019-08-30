import gql from 'graphql-tag'

export const getAllTasks = `
    getAllTypes {
        typeId
        typeName
    }`

export default gql`query {
    ${getAllTasks}
}`
