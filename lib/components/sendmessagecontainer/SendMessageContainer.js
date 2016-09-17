import React, { Component } from 'react';
import { pick, map, extend } from 'lodash';
import CharacterCount from './CharacterCount.js';
import ClearButton from './ClearButton.js';
import SubmitButton from './SubmitButton.js';
import CurrentUser from './CurrentUser.js';
import MessageInput from './MessageInput.js';

export default class SendMessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      draftMessage: '',
      characterCount: 0,
      user: this.props.user
    };
    this.handleMessageInput = this.handleMessageInput.bind(this);
  }

  addNewMessage() {
    this.props.reference.push({
      user: pick(this.props.user, 'displayName', 'email', 'uid'),
      content: this.state.draftMessage,
      createdAt: Date.now()
    });
    this.handleClearDraft();
  }

  handleClearDraft() {
    this.setState({ draftMessage: '' });
  }

  handleMessageInput(e) {
    const inputValue = e.target.value;
    this.setState({ draftMessage: inputValue });
  }

  render() {
    return (
      <footer className="send-message-container">
        <CurrentUser />
        <MessageInput
          draftMessage={this.state.draftMessage}
          handleMessageInput={this.handleMessageInput}
        />
        <CharacterCount
          draftMessage={this.state.draftMessage}
        />
        <SubmitButton submit={() => this.addNewMessage()}
          draftMessage={this.state.draftMessage}
        />
        <ClearButton clear={() => this.handleClearDraft()}
          draftMessage={this.state.draftMessage}
        />
      </footer>
    )
  }
}
