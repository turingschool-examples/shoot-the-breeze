import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    const { m } = this.props

    return (
      <li>
        <h2 className="current-date">date</h2>
        <h2 className="message-username">{m.user.displayName}</h2>
        <h2 className="message">{m.content}</h2>
      </li>
    )
  }
}
