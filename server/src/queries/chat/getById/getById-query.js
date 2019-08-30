import { GraphQLNonNull, GraphQLID } from 'graphql'

import chatType from '../../../models/chat/chat-type'

const getByIdChat = (getById) => ({
    type: chatType,
    description: 'GET chat',  
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'Chat Id primary key'
        }
    },
    resolve: async (_, args) => {
        return await getById(args.id)
    }    
})

export default getByIdChat