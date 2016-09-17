import React, { Component } from 'react';
import Message from './Message.js';

export default class MessageContainer extends Component {
  render() {
    return (
      <ul className="message-container">
        <Message />
      </ul>
    )
  }
}
