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
    const dbMessages = this.state.messages;

    return (
      <div className="Application">

        <MessageList
          messages={dbMessages} />


        <section className="login-section">
          <section className="login-block">

            {user ? <p className="logged-in-as">Logged in as<span className="bold-first-name">{user.displayName.split(' ')[0]}</span>({user.email})</p> : <button onClick={() => signIn()}>Sign In</button> }

          </section>

          <MessageInput
            user={this.state.user}/>
          
        </section>

      </div>
    )
  }
}

export default Application
