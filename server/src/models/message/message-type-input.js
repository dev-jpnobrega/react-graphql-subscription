import { GraphQLInputObjectType, GraphQLString, GraphQLID } from 'graphql'

import userSendingType from '../user/user-sending-input'

const fields = {
    chatId: {
        type: GraphQLID,
        description: 'ChatId send message'
    },
    text: {
        type: GraphQLString,
        description: 'Message text'
    },
    sendingUser: {
        type: userSendingType,
        description: 'User sending message'
    }
}

const inputType = new GraphQLInputObjectType({
    name: 'MessageInput',
    description: 'MessageInput schema',
    fields: () => (fields)
})

export default inputType