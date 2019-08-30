import { chatAdded } from './chat-added.js'

import { pubsub }  from '../../../helpers/pubSub'

const CHANNEL_ADDED_TOPIC = 'CHAT_ADDED'

const subscription = () => pubsub.asyncIterator(CHANNEL_ADDED_TOPIC)
const resolver = (payload) => { return payload.chatAdded }

const chatAddedSubscriptionExec = chatAdded(subscription, resolver)

export default chatAddedSubscriptionExec




