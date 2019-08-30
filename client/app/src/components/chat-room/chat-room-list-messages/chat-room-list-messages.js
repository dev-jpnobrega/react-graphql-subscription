import React from 'react'

import ChatRoomMessage from '../chat-room-message'

class ChatRoomListMessages extends React.Component {
  componentDidMount() {
    this.onScroll()
  }

  componentWillUnmount() {
    this.onScroll()
  }

  componentDidUpdate() {
    this.onScroll()
  }

  onScroll = () => {
    window.scrollTo(0,  this.endList.scrollHeight)
  }

  render() {
    let { data, user } = this.props
    return (
      <ul className="chat" ref={(node) => { this.endList = node }}>
          {
              data ?
                data.map((message, key) => (
                    <ChatRoomMessage key={ key } type={ user.id === message.sendingUser.id ? 'self' : 'outher' } message={message} />       
                )) :
                <li>No messages</li>
          }
      </ul>
    )
  }
}

export default ChatRoomListMessages