import getAllQuery from './getAll-query'

import usersMocks from '../../../__test__/__mock__/users.mock'

const fnMocks = { 
    getAll() {
        return usersMocks
    }
}

//const typeRepository = new TypeRepository()
const getAllUsers = getAllQuery(fnMocks.getAll)

export default getAllUsers