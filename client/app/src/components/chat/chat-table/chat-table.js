import React from 'react'
import { Query, Mutation } from 'react-apollo'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { ChatList, ChatListItem, Avatar, Column, Row, Title, Subtitle,  } from '@livechat/ui-kit' 

import addParticipant from '../graphql/addParticipant'
import getAllChats from '../graphql/getAllChats'
import subChatAdded from '../graphql/subscriptionChatAdded'
import ChatReceiverSubscription from '../chat-receiver-subscription'


let unSubscription = null

const ChatTable =  (props) => {
    return (
        <Card style={{margin: '20px'}}>
            <Query query={getAllChats}>
                {({ loading, error, data, subscribeToMore, refetch }) => {
                    if (loading)
                        return (<CircularProgress/>)
                    
                    if (!unSubscription) {
                        unSubscription = subscribeToMore({
                            document: subChatAdded,
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data)
                                    return prev
                                
                                const { chatAdded } = subscriptionData.data
                                return {
                                    ...prev,
                                    getAllChats: [...prev.getAllChats, chatAdded]
                                }
                            }
                        })
                    }
                    
                    return  (
                        <CardContent >
                            <Typography gutterBottom variant="headline" component="h2">
                                Chats actives
                            </Typography>
                            <Typography component="p">
                                    
                            </Typography>
                            <React.Fragment>
                                <ChatList style={{ maxWidth: 500 }}>
                                    {    
                                        data.getAllChats ? (
                                            data.getAllChats.map((chat, key) => (
                                                <Mutation key={key}
                                                    mutation={addParticipant}
                                                    variables={{userId: props.user.id, chatId: chat.id}}
                                                    onCompleted={result => {
                                                        let { validation } = result.addParticipant

                                                        if (validation)
                                                            props.history.push("/chat-room/" + chat.id)//props.handleChatClick(chat.id)
                                                        else 
                                                            alert('Erros add in chat!')

                                                        return                                                       
                                                    }}>
                                                    { ( mutation, { data , loading } ) => {
                                                        
                                                        if (loading)
                                                            return (<CircularProgress/>) 

                                                        return (
                                                            <ChatListItem onClick={e => {                                                                
                                                                 e.preventDefault()

                                                               // let variables = {userId: props.user.id, chatId: chat.id}
                                                                mutation()                                                                
                                                            }} key={key}>
                                                                <Avatar style={{backgroundColor: 'orange'}} letter={chat.name.substring(0, 1).toUpperCase()} />
                                                                <Column fill={'fill'}>
                                                                    <Row justify>
                                                                        <Title ellipsis>{chat.name}</Title>
                                                                        <Subtitle nowrap>{'14:31 PM'}</Subtitle>
                                                                    </Row>
                                                                    <Subtitle ellipsis>
                                                                        {chat.messages ? chat.messages[chat.messages.length-1].text : 'No messages'}
                                                                    </Subtitle>
                                                                    <ChatReceiverSubscription chatId={chat.id} { ...props } />
                                                                </Column>
                                                            </ChatListItem>  
                                                        )
                                                    }}         
                                                </Mutation>                                     
                                            ))
                                        ) : <div/>
                                        } 
                                </ChatList>                                                              
                            </React.Fragment>
                        </CardContent>
                    )
                }}
            </Query>
        </Card>
    )
}

export default ChatTable