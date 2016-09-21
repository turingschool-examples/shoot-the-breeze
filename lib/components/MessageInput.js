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
      <section className="InputBlocks">
        <input
        className="message-input-field"
        placeholder="Message…"
        value={this.state.draftMessage}
        onChange={(event) => this.setState({ draftMessage: event.target.value })}
        />
        <span>{this.state.draftMessage.length}</span>

      <ActionButton
        className="submit-button"
        text="Submit"
        handleClick= { () => this.addNewMessage() }
        isDisabled={ !this.state.draftMessage.length || this.state.draftMessage.length > 140 }
      />
      <ActionButton
        className="clear-button"
        text="Clear"
        handleClick= { () => this.clearInput() }
        isDisabled={ !this.state.draftMessage.length }
      />
      </section>
    )
  }
}

export default MessageInput;
