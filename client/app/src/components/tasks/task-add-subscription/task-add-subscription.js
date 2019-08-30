import React from 'react'
import { Subscription } from 'react-apollo'
import { toast } from 'react-toastify'


import subTasksAdded from '../graphql/subscriptionTasksAdded'

const TaskAddSubscription= () => {
    return (
        <Subscription subscription={subTasksAdded}>
            {({ data }) => {
                if (data)
                    toast.info(' 🦄 New task added. Task ' + data.typeAdded.typeName)

                return (<p/>)
                
                //return <h3>Newest task: {!data ? "Waiting..." : data.typeAdded.typeName}</h3>;
            }}
        </Subscription>
    )
}

export default TaskAddSubscription