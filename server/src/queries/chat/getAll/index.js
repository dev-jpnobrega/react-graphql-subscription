import getAllQuery from './getAll-query'


import chatsMocks from '../../../__test__/__mock__/chats.mock'

const fnMocks = { 
    getAll() {
        return chatsMocks
    }
}

//const typeRepository = new TypeRepository()
const getAllChats = getAllQuery(fnMocks.getAll)

export default getAllChats