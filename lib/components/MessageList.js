import React, { Component } from 'react'

export const MessageList = ({ createdAt, user, content }) => {
  return (
    <li>
      <span className="time-stamp">{createdAt}</span>
      <span className="user-name-on-message">
      {user.displayName.split(' ')[0]}</span><br/>
      {content}
    </li>
  )
}


// renderMessages(filteredMessages) {
//   debugger
//   let currentMessages = filteredMessages ? filteredMessages : this.state.messages
    // })
  // }

// renderMessages(filteredMessages) {
//   debugger
//   let currentMessages = filteredMessages ? filteredMessages : this.state.messages
//   // currentMessages = filteredMessages.filter(message =>
//   //   message.user.email === this.state.userState)
//     // currentMessages = this.
//   return currentMessages.map(message => {
//     return (
//       <li key={message.key}>
//       <span className="time-stamp">{message.createdAt}</span>
//       <span className="user-name-on-message">
//       {message.user.displayName.split(' ')[0]}</span><br/>
//       {message.content}
//       </li>
//     )
//   })
// }
