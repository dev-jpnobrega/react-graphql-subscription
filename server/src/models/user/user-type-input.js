import { GraphQLInputObjectType, GraphQLString } from 'graphql'

const fields = {
    name: {
        type: GraphQLString,
        description: 'User name'
    },
    email: {
        type: GraphQLString,
        description: 'User e-mail'
    }
}

const inputType = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'UserInput schema',
    fields: () => (fields)
})

export default inputType