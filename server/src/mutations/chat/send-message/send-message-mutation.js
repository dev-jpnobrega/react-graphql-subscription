import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql'

import errorType from '../../../models/error/error-type'
import messageType  from '../../../models/message/message-type'
import messageInput  from '../../../models/message/message-type-input'

const sendMessageMutation = (resolver, repository) => ({
    type: new GraphQLObjectType({
        name: 'SendMessage',
        fields: {
            message:  { type: messageType, description: 'Message model' },
            erros: { type: new GraphQLList(errorType), description: 'Error list validation business operation' }
        }
    }),
    description: 'Send message',
    args: {
        input: { type: new GraphQLNonNull(messageInput) }
    },
    resolve: async (obj, args) => {        
        try {
            let result = await resolver.sendMessage(args, repository)
            return Object.assign({}, { message: result, erros: [] })
        } 
        catch (e) {
            return Object.assign({}, { message: null, erros: e })
        }
    }
})

export {
    sendMessageMutation
}