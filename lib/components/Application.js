import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
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
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  render() {
    const { user, messages, draftMessage } = this.state;
    if (user) {
      return (
        <div className="Application">
          <HeaderContainer />
          <MessageContainer reference={reference} user={user} />
          <UsersContainer />
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
