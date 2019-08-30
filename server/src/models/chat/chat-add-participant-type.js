import { GraphQLInputObjectType, GraphQLID, GraphQLNonNull } from 'graphql'

const fields = {
    chatId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Chat id'
    },
    userId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'User id chat create'
    }
}

const inputType = new GraphQLInputObjectType({
    name: 'ChatAddParticipant',
    description: 'ChatAddParticipant schema',
    fields: () => (fields)
})

export default inputType