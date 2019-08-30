import { userAdded } from './user-added'

import { pubsub }  from '../../../helpers/pubSub'
//import channelsInMemory from '../../../__test__/__mock__/channels.mock'


const USER_ADDED_TOPIC = 'USER_ADDED'
//console.warn('USER_ADDED_TOPIC', USER_ADDED_TOPIC)
const subscription = () => pubsub.asyncIterator(USER_ADDED_TOPIC)
const resolver = (payload) => { return payload.userAdded}

const userAddedSubscriptionExec = userAdded(subscription, resolver)

export default userAddedSubscriptionExec




