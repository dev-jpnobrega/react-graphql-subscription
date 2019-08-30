import React, { Component } from 'react'
import { Query } from 'react-apollo'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import '../../App.css';

import getByIdChat from './graphql/getByIdChat'
import subChatReceiver from '../chat/graphql/subscriptionChatReceiver'

import ChatRoomHeader from './chat-room-header'
import ChatRoomListMessages from './chat-room-list-messages'
import ChatRoomSendMessage from './chat-room-send-message'


let unSubscription = null

class ChatRoom extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            isSending: false,            
            chat: {},
            user: {}
        }
        this.handlerSubmitMessage = this.handlerSubmitMessage.bind(this)
    }

    componentDidMount() {
     //   this.scrollToBottom()
    }
    
    componentDidUpdate() {
        this.scrollToBottom()
    }
    
    componentWillMount() {
        let user = localStorage.getItem('currentUser')
        if (user) {
          user = JSON.parse(user)
          if (user.id)
            this.setState({user}, () => console.warn('user state', this.state.user))
        }      
    }

    handlerSubmitMessage() {
        console.warn('s')
    }

    render() {
        let { user } = this.state
        let { match:{ params: { chatId } } } = this.props

        if (!chatId) return <div/>

        return (
            <div>
                <Query query={getByIdChat} variables={{id: chatId}}>
                    {({ loading, error, data, subscribeToMore, refetch }) => {
                        if (loading)
                            return (<CircularProgress/>)
                    
                        if (!unSubscription) {
                            unSubscription = subscribeToMore({
                                document: subChatReceiver,
                                variables: { chatId: chatId, userId: user.id },
                                updateQuery: (prev, { subscriptionData }) => {
                                    if (!subscriptionData.data)
                                        return prev
                                    
                                    let { chat, message } = subscriptionData.data.chatReceiverMessages.receiver
                                    let { sendingUser } = message
                       
                                    return {
                                        ...prev,
                                        getByIdChat: {
                                            ...prev.getByIdChat,
                                            messages: prev.getByIdChat.messages ?
                                                 [ ...prev.getByIdChat.messages, message ] :
                                                 [ message ]
                                        }
                                    }
                                }
                            })
                        }

                        let chat = data.getByIdChat   
                        return (
                            <div>
                                <ChatRoomHeader user={ user } chat={ chat } { ...this.props } />
                                <ChatRoomListMessages user={ user } data={ chat.messages } />
                                <ChatRoomSendMessage handlerSubmitMessage={ this.handlerSubmitMessage } user={ user } chatId={ chatId } />
                            </div>
                        ) 
                    }}
                </Query>   
            </div> 
        )
    }
}

export default ChatRoom