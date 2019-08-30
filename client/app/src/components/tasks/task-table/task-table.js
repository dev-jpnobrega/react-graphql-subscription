import React from 'react'

import { Query } from 'react-apollo'
import getAllTasks from '../graphql/getAllTasks'
import subTasksAdded from '../graphql/subscriptionTasksAdded'

let unSubscription = null

const TaskTable =  () => {
    return (
        <Query query={getAllTasks}>
            {({ loading, error, data, subscribeToMore, refetch }) => {
                if (loading)
                    return (<p> Loading... </p>)
                
                if (!unSubscription) {
                    unSubscription = subscribeToMore({
                        document: subTasksAdded,
                        updateQuery: (prev, { subscriptionData }) => {
                            if (!subscriptionData.data)
                                return prev
                            
                            const { typeAdded } = subscriptionData.data
                            return {
                                ...prev,
                                getAllTypes: [...prev.getAllTypes, typeAdded]
                            }
                        }
                    })
                }
                
                return  (
                    <React.Fragment>
                        <ul  id={"myUL"}>
                            {
                                data.getAllTypes.map((task, key) => (<li key={key}>{task.typeId} - {task.typeName}</li>))
                            }
                        </ul>                                
                    </React.Fragment>
                )
            }}
        </Query>)
}

export default TaskTable