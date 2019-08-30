import { GraphQLList } from 'graphql'

import chatType from '../../../models/chat/chat-type'

const getAllChats = (getAll) => ({
    type: new GraphQLList(chatType),
    description: 'GET all chats actives',  
    resolve: async () => {
        return await getAll()
    }    
})

export default getAllChats