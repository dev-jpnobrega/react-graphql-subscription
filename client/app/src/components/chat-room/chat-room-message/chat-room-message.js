import React from 'react'

const ChatRoomMessage = (props) => {


  return (
    <li className={props.type}>
        <div className="msg">
            <p><b>{ props.message.sendingUser.name }</b></p>
            <p>{ props.message.text }</p>
            <time>{ props.message.time || '10:00 PM' }</time>
        </div>
    </li>
  )
}

export default ChatRoomMessage