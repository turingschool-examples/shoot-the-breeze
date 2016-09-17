import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import SignIn from './SignIn';
import HeaderContainer from './headercontainer/HeaderContainer';
import MessageContainer from './messagecontainer/MessageContainer';
import UsersContainer from './userscontainer/UsersContainer';
import SendMessageContainer from './sendmessagecontainer/SendMessageContainer';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      });
    });
  }

  render() {
    const { user, messages, draftMessage } = this.state;
    if (user) {
      return (
        <div className="Application">
          <HeaderContainer />
          <MessageContainer
            reference={reference}
            messages={this.state.messages}
          />
          <UsersContainer
            messages={this.state.messages}
            user={this.state.user}
          />
          <SendMessageContainer reference={reference} user={user} />
        </div>
      )
    }
    return (
      <section>
        <SignIn signIn={signIn}/>
      </section>
    )
  }
}
