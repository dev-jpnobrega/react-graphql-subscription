import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import sendMessage from '../graphql/sendMessage'

class ChatRoomSendMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSending: false,            
            chat: {},
            textInput: ''
        }
        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.handleChange  = this.handleChange.bind(this)
        this.onCompleted   = this.onCompleted.bind(this)
        
    }
    
    componentWillMount() {
              
    }

    handlerSubmit(mutation) {
        let { textInput } = this.state
        let { user, chatId } = this.props

        let variables = {
            chatId: chatId,
            text: textInput,
            sendingUser: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
        
        this.setState({ isSending: true, textInput: '' })
        this.props.handlerSubmitMessage()
        return mutation({variables})
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value})
    }

    onCompleted(result) {
        let { sendMessage: { message, erros } } = result
        
        if (erros.length > 0) {
            alert('Erro ao criar criar.')
            return
        }
        
        this.textIn.focus()
        this.setState({ isSending: false })
    }

    

    render() {
        let { isSending, textInput } = this.state
        let { user } = this.props
        
        return (
            <div>
                <Mutation
                    mutation={sendMessage}
                    onCompleted={this.onCompleted}>
                    { ( mutation, { data , loading } ) => {
                        if (isSending) {
                            
                        }

                        if (loading)
                            return (<CircularProgress/>) 

                        return (
                            <input className="textarea" 
                                value={textInput} 
                                id="textInput" 
                                name="textInput"
                                ref={ (node) => this.textIn = node } 
                                onChange={this.handleChange} 
                                onKeyDown={e => {
                                    if (e.keyCode === 13) {
                                        this.handlerSubmit(mutation)
                                    }
                                }}  
                                type="text" 
                                placeholder="Type here!"
                            />
                        )
                    }}
                </Mutation>
            </div> 
        )
    }
}

export default ChatRoomSendMessage