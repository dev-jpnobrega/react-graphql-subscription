import { GraphQLObjectType } from 'graphql'

import messageType from '../message/message-type'
import chatType from './chat-type'

const fields = {
    chat: {
        type: chatType,
        description: 'Chat'
    },
    message: {
        type: messageType,
        description: 'Message'
    }
}

const chatReceiverType = new GraphQLObjectType({
    name: 'ChatReceiver',
    description: 'ChatReceiver schema',
    fields: () => (fields)
})

export default chatReceiverType