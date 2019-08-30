import resolveAddParticipant from '../resolvers/add-participant'
import { addParticipantMutation } from './add-participant-mutation'

import chatsInMemory from '../../../__test__/__mock__/chats.mock'
import usersInMemory from '../../../__test__/__mock__/users.mock'

import { pubsub } from '../../../helpers/pubSub'

const resolvers = {
    addParticipant: resolveAddParticipant
}

const fnMcock = {
    addParticipant: async(input) => {
        let { chatId, userId } = input
        let erros = []

        let chat = chatsInMemory.find(_ => _.id === chatId)
        if (!chat) {
            
            erros.push({key: 'chat', code: 1, message: 'Chat not found'})
            throw erros
        }

        let user = usersInMemory.find(u => u.id === userId)
        if (!user) {
            erros.push({key: 'user', code: 1, message: 'User not found'})
            throw erros
        }

        if (chat.participants.find(c => c.id === userId)) {
            return true
        }

        chat.participants.push(user)

        pubsub.publish('PARTICIPANT_ADDED', { participant: user, chat: { id: chat.id, name: chat.name } })
                
        return true
    }
}

const addParticipant = addParticipantMutation(resolvers, fnMcock)

export {
    addParticipant
}