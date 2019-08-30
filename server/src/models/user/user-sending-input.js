import { GraphQLInputObjectType, GraphQLString,GraphQLID } from 'graphql'

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

const inputType = new GraphQLInputObjectType({
    name: 'UserSendingInput',
    description: 'UserSendingInput schema',
    fields: () => (fields)
})

export default inputType