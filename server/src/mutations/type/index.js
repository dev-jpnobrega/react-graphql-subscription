
import resolveCreate from './resolvers/create'
import { createTypeMutation } from './type-mutation'
//import TypeRepository from '../../repositories/type'

import types from '../../__test__/__mock__/types.mock'

import { pubsub } from '../../helpers/pubSub'
const CHANNEL_ADDED_TOPIC = 'CHAT_ADDED'


const resolvers = {
    create: resolveCreate
}

const fnMcock = {
    create: async(input) => {
        types.push(input)
        pubsub.publish(CHANNEL_ADDED_TOPIC, { typeAdded: input })
        return input
    }
}

//const repo = new TypeRepository()
const createType = createTypeMutation(resolvers, fnMcock)

export {
    createType
}