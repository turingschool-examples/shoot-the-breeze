import React, { Component } from 'react';
import MessageInput from './MessageInput.js';
import CharacterCount from './CharacterCount.js';
import ClearButton from './ClearButton.js';
import SubmitButton from './SubmitButton.js';
import CurrentUser from './CurrentUser.js';

export default class SendMessageContainer extends Component {
  render() {
    return (
      <footer className="send-message-container">
        <CurrentUser />
        <MessageInput />
        <CharacterCount />
        <SubmitButton />
        <ClearButton />
      </footer>
    )
  }
}
