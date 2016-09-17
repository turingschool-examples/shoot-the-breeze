import React from 'react';

const Message = props => {
  const { m } = props

  return (
    <li>
      <h2 className="current-date">date</h2>
      <h2 className="message-username">{m.user.displayName}</h2>
      <h2 className="message">{m.content}</h2>
    </li>
  )
}

export default Message
