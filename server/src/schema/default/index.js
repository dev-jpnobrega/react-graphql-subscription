import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import * as queries from '../../queries'
import * as mutations from '../../mutations'
import * as subscriptions from '../../subscriptions'

let rootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Capta GrahQL Schema',
    fields: () => (queries)
})

let rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Capta Mutation GrahQL Schema',
    fields: () => (mutations)
})

let rootSubscription = new GraphQLObjectType({
    name: 'Subscription',
    description: 'Subscription watch',
    fields: () => (subscriptions)
})

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
    subscription: rootSubscription
})

export default schema