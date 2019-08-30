import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql'

import userType from '../user/user-type'
import messagesType from '../message/message-type'

const fields = {
    id: {
        type: GraphQLID,
        description: 'Chat unique Id'
    },
    name: {
        type: GraphQLString,
        description: 'Type name'
    },
    participants: {
        type: new GraphQLList(userType),
        description: 'Chat participants'
    },
    messages: {
        type: new GraphQLList(messagesType),
        description: 'Chat messages' 
    }
}

const chatType = new GraphQLObjectType({
    name: 'Chat',
    description: 'Chat schema',
    fields: () => (fields)
})

export default chatType