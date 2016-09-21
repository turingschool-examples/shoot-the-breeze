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
    const { user, messages, draftMessage } = this.state;
    // const user = this.state.user;
    const dbMessages = this.state.messages;
    // const draftMessage = this.state.draftMessage;
    // const firstName = user.displayName.split(' ')[0]


    return (
      <div className="Application">

        <section
          className="lists-container">

          <MessageList
            messages={dbMessages} />

          <UserList
            messages={dbMessages} />

        </section>

          {user ? <p className="logged-in-as">Logged in as<span className="bold-first-name">{user.displayName.split(' ')[0]}</span>({user.email})</p> : <button onClick={() => signIn()}>Sign In</button> }

          <MessageInput
          user={this.state.user}/>

      </div>
    )
  }
}

export default Application
