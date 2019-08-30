import * as queriesType              from './type'
import { getAllChats, getByIdChat } from './chat'
import { getAllUsers } from './user'

import types from '../__test__/__mock__/types.mock'

const fnMocks = { 
    getAll() {
        return types
    },
    getById(id) {
        return types.filter(e => e.typeId == id)[0]
    }
}

//const typeRepository = new TypeRepository()
const getAllTypes = queriesType.getAllTypes(fnMocks.getAll)
const getTypeById = queriesType.getTypeById(fnMocks.getById)
      
export {
    getAllTypes,
    getTypeById,
    getAllChats,
    getByIdChat,
    getAllUsers
}