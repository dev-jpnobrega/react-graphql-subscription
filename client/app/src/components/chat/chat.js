import React from 'react'

import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import red from '@material-ui/core/colors/red';

import ChatNew from './chat-new'
import ChatTable from './chat-table'
//import ChatCreateSubscription from './chat-create-subscription'


class Chat extends React.Component {

    state = {
        isNewChat: false
    }

    render() {
        let { isNewChat } = this.state
        return (
            <React.Fragment>
            <IconButton onClick={e => {
                e.preventDefault()
                this.setState({isNewChat: true})
            }} color={"primary"} style={{ position: 'absolute', float: 'right', backgroundColor: 'white', 
            marginRight: '5%'}}>
                 <AddIcon />
            </IconButton>
            <div>      
                {
                    isNewChat ?
                     <ChatNew {...this.props} /> :
                     <div/>
                }         
               <ChatTable { ...this.props } />
               
            </div>
            
            </React.Fragment>
        )
    }
}

export default Chat