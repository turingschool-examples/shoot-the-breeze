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
      user: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
    // reference.limitToLast(100).on('value', (snapshot) => {
    //   const messages = snapshot.val() || {};
    //   this.setState({
    //     messages: map(messages, (val, key) => extend(val, { key }))
    //   });
    // });
  }

  // addNewMessage() {
  //   const { user, draftMessage } = this.state;
  //
  //   console.log(this.state.draftMessage);
  //   console.log(this.state.user);
  //
  //   reference.push({
  //     user: pick(user, 'displayName', 'email', 'uid'),
  //     content: draftMessage,
  //     createdAt: Date.now()
  //   });
  //
  //   this.setState({ draftMessage: '' });
  // }

  render() {
    const { user, messages, draftMessage } = this.state;
    if (user) {
      return (
        <div className="Application">
          {/* {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
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
          </div> */}
          <HeaderContainer />
          <MessageContainer />
          <UsersContainer />
          <SendMessageContainer reference={reference} user={user} />
        </div>
      )
    }
    if(!user) {
      return (
        <section>
          <SignIn />
        </section>
      )
    }

  }
}
