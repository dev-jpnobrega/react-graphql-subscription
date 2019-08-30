import uuid from 'uuid/v4'

import resolveSendMessage from '../resolvers/send-message'
import { sendMessageMutation } from './send-message-mutation'

import chatsInMemory from '../../../__test__/__mock__/chats.mock'

import { pubsub } from '../../../helpers/pubSub'

const resolvers = {
    sendMessage: resolveSendMessage
}

const fnMcock = {
    sendMessage: async(input) => {
        input.id = uuid()

        let chat = chatsInMemory.find(_ => _.id === input.chatId)
        
        if (!chat) {
            let erros = []
            erros.push({key: 'chat', code: 1, message: 'Chat not found'})
            throw erros
        }

        if (!chat.messages)
            chat.messages = []

        chat.messages.push(input)

        //chatsInMemory.push(input)
        //channelsInMemory.push(input.id)

        pubsub.publish('MESSAGE_ADDED', { messageAdded: input, chatId: chat.id })
                
        return input
    }
}

const sendMessage = sendMessageMutation(resolvers, fnMcock)

export {
    sendMessage
}