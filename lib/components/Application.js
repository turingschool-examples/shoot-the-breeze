import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

// Very few things in this component are a good idea.
// Feel free to blow it all away.

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
      user: null
    }
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      });
    });

    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  addNewMessage() {
    const { user, draftMessage } = this.state;

    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: Date.now()
    });

    this.setState({ draftMessage: '' });
  }

  render() {
    const { user, messages, draftMessage } = this.state;

    return (
      <div className="Application">
        {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        <ul>
          { this.state.messages.map(m => <li key={m.key}>{m.user.displayName}: {m.content}</li>) }
        </ul>
        <div className="MessageInput">
          <input
            placeholder="Message…"
            value={this.state.draftMessage}
            onChange={(e) => this.setState({ draftMessage: e.target.value })}
          />
          <button onClick={() => this.addNewMessage()}>Add New Message</button>
        </div>
      </div>
    )
  }
}
