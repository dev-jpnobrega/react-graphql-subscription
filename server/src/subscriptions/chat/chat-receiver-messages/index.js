import { withFilter } from 'graphql-subscriptions'
import { chatReceiverMessage } from './chat-receiver-messages'

import { pubsub }  from '../../../helpers/pubSub'
import chatsInMemory from '../../../__test__/__mock__/chats.mock'


const MESSAGE_ADDED_TOPIC = 'MESSAGE_ADDED'

const subscription = withFilter(() => 
    pubsub.asyncIterator(MESSAGE_ADDED_TOPIC), 
(payload, variables) => {    
    return payload ? payload.chatId === variables.chatId : payload
})

const resolver = async(rootValue, args, context, info) => { 
    let chat = chatsInMemory.find(_ => _.id === rootValue.chatId)
    
    if (chat)         
        if (chat.participants.filter(_ => _.id === args.userId).length > 0)
            return { message: rootValue.messageAdded, chat }

    let erros = []
    erros.push({code: 1, field: 'chatReceiverMessage', message: 'User not participating in this chat' + info})
    
    throw erros
}

const chatAddedSubscriptionExec = chatReceiverMessage(subscription, resolver)

export default chatAddedSubscriptionExec




