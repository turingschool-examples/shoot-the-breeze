import React, { Component } from 'react';
import firebase, { reference, signIn, signOut } from '../firebase';
import { pick, map, extend, filter } from 'lodash';
import moment from 'moment';
import InputForm from './InputForm';
import FilterMessages from './FilterMessages';
import UserList from './UserList';
import DisplayMessages from './DisplayMessages';
import LoggedInStatus from './LoggedInStatus';

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

  UpdateFilteredState(filterString){
    this.setState(
      {filteredMessages: filter(this.state.messages, (message) => {
          return message.content.toLowerCase().includes(filterString.toLowerCase());
      }),
    filterString: filterString});
  }

  toggleShownMessage(){
    if(this.state.filterString){
      return this.state.filteredMessages;
    }else{
      return this.state.messages;
    }
  }

  sortMessages() {
    let array = this.state.messages;
    let reversed = array.reverse();
    this.setState({messages: reversed});
  }

  render() {
    const { user, messages, draftMessage, filteredMessages} = this.state;
    const toggleShownMessage = this.toggleShownMessage();

    return (
      <section className="Application">
        <div className="FilterMessages">
          <FilterMessages
            onFilterChange={this.UpdateFilteredState.bind(this)}
            sortMessages={this.sortMessages.bind(this)}
          />
        </div>

        <div className="main">
          <DisplayMessages
            messages= {toggleShownMessage}
          />

          <UserList
            messages={messages}
          />
        </div>

        <div className="Log-in-Status">
          <LoggedInStatus
            user = {user}
          />
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
