import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

import userType from '../user/user-type'

const fields = {
    id: {
        type: GraphQLID,
        description: 'Message unique Id'
    },
    text: {
        type: GraphQLString,
        description: 'Text message'
    },
    sendingUser: {
        type: userType,
        description: 'User sending message'
    }
}

const messageType = new GraphQLObjectType({
    name: 'Message',
    description: 'Message schema',
    fields: () => (fields)
})

export default messageType