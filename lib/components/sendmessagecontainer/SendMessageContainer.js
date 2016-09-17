import React, { Component } from 'react';
import { pick, map, extend } from 'lodash';
import CharacterCount from './CharacterCount.js';
import ClearButton from './ClearButton.js';
import SubmitButton from './SubmitButton.js';
import CurrentUser from './CurrentUser.js';

export default class SendMessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      draftMessage: '',
      user: this.props.user
    }
  }

  addNewMessage() {
    this.props.reference.push({
      user: pick(this.props.user, 'displayName', 'email', 'uid'),
      content: this.state.draftMessage,
      createdAt: Date.now()
    });
    this.setState({ draftMessage: '' });
  }

  render() {
    return (
      <footer className="send-message-container">
        <CurrentUser />
        <input
          placeholder="Message"
          className="message-input"
          onChange={(e) => {
            this.setState({ draftMessage: e.target.value })
          }}
        />
        <CharacterCount />
        <SubmitButton submit={() => this.addNewMessage()} />
        <ClearButton />
      </footer>
    )
  }
}
