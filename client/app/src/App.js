import React, { Component } from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify'
import {
    Notification,
    NotificationProvider,
    showNotification,
    removeNotification
  } from 'mui-notifications'

import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider, FixedWrapper, darkTheme, elegantTheme, purpleTheme, defaultTheme } from '@livechat/ui-kit'



//import Tasks from './components/tasks'
import Maximized from './Maximized'
import UserNew from './components/user/user-new'
import Chat from './components/chat'
import ChatRoom from './components/chat-room'
import Header from './components/common/header'
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#72125d',
          main: '#72125d',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#72125d',
          main: '#72125d',
          dark: '#ba000d',
          contrastText: '#000',
        },
    },
    appBar: {
        backgroundColor: '#72125d'
    },
  });

const themes = {
  defaultTheme: {
      FixedWrapperMaximized: {
          css: {
              boxShadow: '0 0 1em rgba(0, 0, 0, 0.1)',
          },
      },
  },
  purpleTheme: {
      ...purpleTheme,
      TextComposer: {
          ...purpleTheme.TextComposer,
          css: {
              ...purpleTheme.TextComposer.css,
              marginTop: '1em',
          },
      },
      OwnMessage: {
          ...purpleTheme.OwnMessage,
          secondaryTextColor: '#fff',
      },
  },
  elegantTheme: {
      ...elegantTheme,
      Message: {
          ...darkTheme.Message,
          secondaryTextColor: '#fff',
      },
      OwnMessage: {
          ...darkTheme.OwnMessage,
          secondaryTextColor: '#fff',
      },
  },
  darkTheme: {
      ...darkTheme,
      Message: {
          ...darkTheme.Message,
          css: {
              ...darkTheme.Message.css,
              color: '#fff',
          },
      },
      OwnMessage: {
          ...darkTheme.OwnMessage,
          secondaryTextColor: '#fff',
      },
      TitleBar: {
          ...darkTheme.TitleBar,
          css: {
              ...darkTheme.TitleBar.css,
              padding: '1em',
          },
      },
  },
}

class App extends Component {

  state = {
    theme: 'darkTheme',
    user: undefined,
    chatId: undefined
  }

  componentWillMount() {
    let user = localStorage.getItem('currentUser')
    
    if (user) {
      user = JSON.parse(user)
      if (user.id)
        this.setState({user}, () => console.warn('user state', this.state.user))
    }      
  }

  handleThemeChange = ({ target }) => {
      this.setState({
          theme: target.name + 'Theme',
      })
  }

  handleChatClick = (chatId) => {
        if (!chatId)
            return

        this.setState({chatId: chatId})
  }

  handleBackChatList = () => {
    this.setState({chatId: undefined})
  }

  render() {
    let { user , chatId } = this.state

    return (
      <ThemeProvider theme={themes[this.state.theme]}>
        <MuiThemeProvider theme={theme}>          
                  <div> 
                    <Header user={user}/>
                    { 
                      (user) ? 
                        <Chat { ...this.props } handleChatClick={ this.handleChatClick }  user={ user }/>  : 
                        <UserNew />
                     }     
                    
                    <NotificationProvider
                        desktop={true}
                        transitionName={{
                            leave: 'dummy',
                            leaveActive: 'fadeOut',
                            appear: 'dummy',
                            appearActive: 'zoomInUp'
                        }}
                        transitionAppear={true}
                        transitionLeave={true}
                        />
                  </div>
              
        </MuiThemeProvider>
      </ThemeProvider>
    )
  }
}

export default App
