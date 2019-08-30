import { GraphQLList } from 'graphql'

import userType from '../../../models/user/user-type'

const getAllUsers = (getAll) => ({
    type: new GraphQLList(userType),
    description: 'GET all user actives',  
    resolve: async () => {
        return await getAll()
    }    
})

export default getAllUsers