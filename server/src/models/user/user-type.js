import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

const fields = {
    id: {
        type: GraphQLID,
        description: 'User unique Id'
    },
    name: {
        type: GraphQLString,
        description: 'User name'
    },
    email: {
        type: GraphQLString,
        description: 'User e-mail'
    }
}

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'User schema',
    fields: () => (fields)
})

export default userType