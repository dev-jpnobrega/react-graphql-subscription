import { GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLList  }  from 'graphql'

import errorType from '../../../models/error/error-type'
import chatReceiverType  from '../../../models/chat/chat-receiver-type'

const chatReceiverMessage = (subscribe, resolve) => ({
    args: {
        chatId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Id chat'
        },
        userId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'User id chat'
        }
    },
    type: new GraphQLObjectType({
        name: 'MessageReceiverChat',
        fields: {
            receiver: { type: chatReceiverType, description: 'Chat receiver model' },
            erros: { type: new GraphQLList(errorType), description: 'Error list validation business operation' }
        }
    }),
    subscribe: subscribe,
    resolve: async (rootValue, args, context, info) => { 
        console.warn('args', args)
        try {
            let result = await resolve(rootValue, args, context, info)
            return Object.assign({}, { receiver: result, erros: [] })
        } 
        catch (e) {
            return Object.assign({}, { message: null, erros: e })
        }
    }
})

export { chatReceiverMessage }