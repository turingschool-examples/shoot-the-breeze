import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';
import InputForm from './InputForm';
import FilterMessages from './FilterMessages';
import UserList from './UserList';
const DisplayMessages = require('./DisplayMessages');

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
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

  addNewMessage() {
    const { user, draftMessage } = this.state;
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: moment().format('MMMM Do, h:mm a')
    });
    this.setState({ draftMessage: '' });
  }

  updateMessageState (e){
    this.setState({ draftMessage: e.target.value});
  }

  render() {
    const { user, messages, draftMessage, filteredMessage} = this.state;

    return (
      <section className="Application">
        <div className="FilterMessages">
          <FilterMessages
            filterUser={filteredMessage}
            />
        </div>

        <div className="main">
          <DisplayMessages messages={messages} />
          <UserList messages={messages} />
        </div>

        <div className="LoginStatus">
          {user ? <p>Logged in as <span className= 'user-display'>{user.displayName}</span> ({user.email})</p> : <button
          className="LogIn-btn"
          onClick={() => signIn()}>Log In</button> }
        </div>

        <div className="InputForm">
          <InputForm
            draftedMessage={draftMessage}
            onDraftedMessageChange={this.updateMessageState.bind(this)}
            onMessageSubmit={() => this.addNewMessage()}
            clearField = {()=> {this.setState({draftMessage: ''})}}
          />
        </div>
      </section>
    )
  }
}
