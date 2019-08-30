import { GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql'

const fields = {
    name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Chat name'
    },
    userId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'User id chat create'
    }
}

const inputType = new GraphQLInputObjectType({
    name: 'ChatInput',
    description: 'ChatInput schema',
    fields: () => (fields)
})

export default inputType