import getByIdQuery from './getById-query'


import chatsMocks from '../../../__test__/__mock__/chats.mock'

const fnMocks = { 
    getById(id) {
        return chatsMocks.find(_ => _.id == id)
    }
}

//const typeRepository = new TypeRepository()
const getByIdChat = getByIdQuery(fnMocks.getById)

export default getByIdChat