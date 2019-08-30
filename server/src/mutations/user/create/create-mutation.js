import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql'

import errorType from '../../../models/error/error-type'
import userType  from '../../../models/user/user-type'
import userInput  from '../../../models/user/user-type-input'

const createUserMutation = (resolver, repository) => ({
    type: new GraphQLObjectType({
        name: 'CreateUser',
        fields: {
            user:  { type: userType, description: 'User model' },
            erros: { type: new GraphQLList(errorType), description: 'Error list validation business operation' }
        }
    }),
    description: 'Create user.',
    args: {
        input: { type: new GraphQLNonNull(userInput) }
    },
    resolve: async (obj, args) => {        
        try {
            let result = await resolver.create(args, repository)
            return Object.assign({}, { user: result, erros: [] })
        } 
        catch (e) {
            return Object.assign({}, { user: null, erros: e })
        }
    }
})

export {
    createUserMutation
}