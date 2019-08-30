import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLBoolean } from 'graphql'

import errorType from '../../../models/error/error-type'
import addParticipantType  from '../../../models/chat/chat-add-participant-type'

const addParticipantMutation = (resolver, repository) => ({
    type: new GraphQLObjectType({
        name: 'AddParticipantChat',
        fields: {
            validation:  { type: GraphQLBoolean, description: 'Add validation' },
            erros: { type: new GraphQLList(errorType), description: 'Error list validation business operation' }
        }
    }),
    description: 'Add participant in chat',
    args: {
        input: { type: new GraphQLNonNull(addParticipantType) }
    },
    resolve: async (obj, args) => {        
        try {
            let result = await resolver.addParticipant(args, repository)
            return Object.assign({}, { validation: result, erros: [] })
        } 
        catch (e) {
            return Object.assign({}, { validation: false, erros: e })
        }
    }
})

export {
    addParticipantMutation
}