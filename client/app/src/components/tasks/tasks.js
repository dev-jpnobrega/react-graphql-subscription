import React from 'react'

import TasksNew from './task-new'
import TasksTable from './task-table'
import TasksAddSubscription from './task-add-subscription'

const Tasks = (props) => {
    return (
        <div>
            <header className="App-header">                
                <h1 className="App-title">Tasks Control</h1>
            </header>
            <div className="App-intro">
                <TasksNew />
                <TasksTable  />

                <TasksAddSubscription/>
            </div>
        </div>
    )
}

export default Tasks