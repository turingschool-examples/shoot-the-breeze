import React, { Component } from 'react'

export const MessageList = ({ createdAt, user, content }) => {
  return (
    <p>
      <span className="time-stamp">{createdAt}</span>
      <span className="user-name-on-message">
      {user.displayName.split(' ')[0]}</span><br/>
      {content}
    </p>
  )
}
