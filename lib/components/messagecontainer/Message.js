import React, { Component } from 'react';
import moment from 'moment';

export default class Message extends Component {
  render() {
    const { m } = this.props

    return (
      <li>
        <h2 className="current-date">date</h2>
        <h2>{moment(m.createdAt).format('MMMM Do, h:mm a')}</h2>
        <h2 className="message-username">{m.user.displayName}</h2>
        <h2 className="message">{m.content}</h2>
      </li>
    )
  }
}
