import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend, filter } from 'lodash';
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
      user: null,
      filteredMessages: [],
      filterString: ''
    };
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
        // sortMessages: map(messages, (val, key) => extend(val, { key })).reverse
      });
    });
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  UpdateFilteredState(filterString){
    this.setState(
      {filteredMessages: filter(this.state.messages, (message) => {
          return message.content.toLowerCase().includes(filterString.toLowerCase());
      }),
    filterString: filterString});
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
    const { user, messages, draftMessage, filteredMessages} = this.state;

    return (
      <section className="Application">
        <div className="FilterMessages">
          <FilterMessages
            onFilterChange={this.UpdateFilteredState.bind(this)}
          />
        </div>

        <div className="main">

          <DisplayMessages messages= {messages} filteredMessages = {filteredMessages} />
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
            // filteredMessage= {this.filteredMessages}
          />
        </div>
      </section>
    )
  }
}
