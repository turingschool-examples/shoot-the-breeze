import React, { Component } from 'react';
import Message from './Message.js';
import { pick, map, extend } from 'lodash';


export default class MessageContainer extends Component {

  renderMessages() {
    return this.props.messages.map(m => {
      return (
        <div key={m.key}>
          <Message m={m} />
        </div>
      )
    });
  }

  render() {
    return (
      <ul className="message-container">
        {this.renderMessages()}
      </ul>
    )
  }
}
