import uuid from 'uuid/v4'

import resolveCreate from '../resolvers/create'
import { createUserMutation } from './create-mutation'

import usersInMemory from '../../../__test__/__mock__/users.mock'
//import channelsInMemory from '../../../__test__/__mock__/channels.mock'

import { pubsub } from '../../../helpers/pubSub'

const USER_ADDED_TOPIC = 'USER_ADDED'

const resolvers = {
    create: resolveCreate
}

const fnMcock = {
    create: async(input) => {
        input.id = uuid()

        usersInMemory.push(input)
        
        pubsub.publish(USER_ADDED_TOPIC, { userAdded: input })
                
        return input
    }
}

const createUser = createUserMutation(resolvers, fnMcock)

export {
    createUser
}