
import chatType  from '../../../models/chat/chat-type'

const chatAdded = (subscribe, resolve) => ({
    type: chatType,
    subscribe: subscribe,
    resolve: resolve
})

export { chatAdded }