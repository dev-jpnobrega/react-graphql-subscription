import uuid from 'uuid/v4'

import resolveCreate from '../resolvers/create'
import { createChatMutation } from './create-mutation'

import chatsInMemory from '../../../__test__/__mock__/chats.mock'
import channelsInMemory from '../../../__test__/__mock__/channels.mock'
import usersInMemory from '../../../__test__/__mock__/users.mock'

import { pubsub } from '../../../helpers/pubSub'

const CHAT_ADDED_TOPIC = 'CHAT_ADDED'

const resolvers = {
    create: resolveCreate
}

const fnMcock = {
    create: async(input) => {
        input.id = uuid()

        const user = usersInMemory.find(_ => _.id === input.userId)
        
        if (!user) {
            let erros = [
                {code: 1, field: 'user', message: 'User not found'}
            ]
            throw erros
        }
        
        input.participants = [
            user
        ]        
        
        chatsInMemory.push(input)
        channelsInMemory.push(input.id)

        pubsub.publish(CHAT_ADDED_TOPIC, { chatAdded: input })
                
        return input
    }
}

const createChat = createChatMutation(resolvers, fnMcock)

export {
    createChat
}