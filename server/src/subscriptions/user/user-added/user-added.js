
import userType  from '../../../models/user/user-type'

const userAdded = (subscribe, resolve) => ({
    type: userType,
    subscribe: subscribe,
    resolve: resolve
})

export { userAdded }