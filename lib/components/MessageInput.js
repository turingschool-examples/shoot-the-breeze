import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import ActionButton from './ActionButton';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draftMessage: '',
    };
  }

  clearInput() {
    this.setState({ draftMessage: '' });
  }

  addNewMessage() {
    const draftMessage = this.state.draftMessage;
    const user = this.props.user;
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: Date.now()
    });

    this.clearInput();
  }

  render() {

    return (
      <div className="MessageInput">
        <input
        placeholder="Message…"
        value={this.state.draftMessage}
        onChange={(event) => this.setState({ draftMessage: event.target.value })}
        />
        <span>{this.state.draftMessage.length}</span>

      <ActionButton
        text="Submit"
        handleClick= { () => this.addNewMessage() }
      />
      <ActionButton
        text="Clear"
        handleClick= { () => this.clearInput() }
      />
      </div>
    )
  }
}

export default MessageInput;
