import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import createTask from '../graphql/createTask'

class TaskNew extends Component {
    state = {
        isSending: false,
        textInput: '',
        tasksMenoryId: 2
    }

    onCreateTasks(mutation) {
        let { textInput, tasksMenoryId } = this.state
        let variables = {
            typeId: (tasksMenoryId+1),
            typeName: textInput
        }
        
        this.setState({ isSending: true, textInput: '', tasksMenoryId: (tasksMenoryId+1) })
        return mutation({variables})
    }

    onChange(e) {
        this.setState({textInput: e.target.value})
    }

    render() {
        let { isSending, textInput } = this.state

        return (
            <div id='myDIV' className='header'>
                <h2 style={{margin: '5px'}} >My To Do List</h2>
                <input type={'text'} value={textInput} onChange={this.onChange.bind(this)} id='myInput' placeholder='Title...' />
                <Mutation
                    mutation={createTask}
                    onCompleted={() => this.setState({ isSending: false })}>
                    {s => {
                        if (isSending) {
                            
                        }

                        return (
                            <span onClick={e => { 
                                e.preventDefault()
                                this.onCreateTasks(s) 
                            }} className='addBtn'>
                                Add
                            </span>
                        )
                    }}
                </Mutation>
                
            </div>
        )
    }
}

export default TaskNew