import React from 'react'
import { Subscription } from 'react-apollo'

import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Message from '@material-ui/icons/Message'

import {
    showNotification,
    removeNotification
  } from 'mui-notifications'

import subChatReceiver from '../graphql/subscriptionChatReceiver'

const ChatReceiverSubscription= (props) => {
    console.warn('ChatReceiverSubscription', props.chatId)
    return (
        <Subscription subscription={subChatReceiver} variables={{chatId: props.chatId, userId: props.user.id}}>
            {({ data, error }) => {
                if (error)
                    return <div/>

                if (data) {
                    if (!data.chatReceiverMessages.receiver)
                        return <div/>

                    let { chat, message } = data.chatReceiverMessages.receiver
                    let { sendingUser } = message

                    showNotification(id => ({
                        title: chat.name,
                        subheader: `${sendingUser.name.toUpperCase()}: ${message.text}`,
                        avatar: (
                            <Link to={'/chat-room/' + chat.id}>
                                <Avatar style={{backgroundColor: '#002884'}}>
                                    <Message />
                                </Avatar>
                            </Link>
                          ),
                        timeout: 2000
                      })
                    )
                }
                return (<div/>)
            }}
        </Subscription>
    )
}

export default ChatReceiverSubscription