import React, { Component } from 'react';
import MessageInput from './MessageInput.js';
import CharacterCount from './CharacterCount.js';
import ClearButton from './ClearButton.js';
import SubmitButton from './SubmitButton.js';

export default class SendMessageContainer extends Component {
  render() {
    return (
      <footer className="send-message-container">
        <input value="" placeholder="Message" />
        <CharacterCount />
        <SubmitButton />
        <ClearButton />
      </footer>
    )
  }
}
