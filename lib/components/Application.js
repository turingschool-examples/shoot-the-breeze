import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import UserList from './UserList';
import ActionButton from './ActionButton';

class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null
    };
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

  render() {
    // const { user, messages, draftMessage } = this.state;
    const user = this.state.user;
    const dbMessages = this.state.messages;
    const draftMessage = this.state.draftMessage;

    return (
      <div className="Application">
        {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        <MessageList
          messages={dbMessages} />
        <MessageInput
          user={this.state.user}/>
        <UserList
          messages={dbMessages} />
      </div>
    )
  }
}

export default Application
