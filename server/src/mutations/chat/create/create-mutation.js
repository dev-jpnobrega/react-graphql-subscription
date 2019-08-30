import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql'

import errorType from '../../../models/error/error-type'
import chatType  from '../../../models/chat/chat-type'
import chatInput  from '../../../models/chat/chat-type-input'

const createChatMutation = (resolver, repository) => ({
    type: new GraphQLObjectType({
        name: 'CreateChat',
        fields: {
            chat:  { type: chatType, description: 'Chat model' },
            erros: { type: new GraphQLList(errorType), description: 'Error list validation business operation' }
        }
    }),
    description: 'Create chats.',
    args: {
        input: { type: new GraphQLNonNull(chatInput) }
    },
    resolve: async (obj, args) => {        
        try {
            let result = await resolver.create(args, repository)
            return Object.assign({}, { chat: result, erros: [] })
        } 
        catch (e) {
            return Object.assign({}, { chat: null, erros: e })
        }
    }
})

export {
    createChatMutation
}