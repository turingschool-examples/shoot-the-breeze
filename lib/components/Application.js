import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';


// const Filter = require('./Filter');
const InputForm = require('./InputForm');
// const LoginStatus = require('./LoginStatus');
const DisplayMessages = require('./DisplayMessages');
// const Sort = require('./Sort');

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
      createdAt: moment().format('MMMM Do, h:mm a')
    });

    this.setState({ draftMessage: '' });
  }

  updateMessageState (e){
    this.setState({ draftMessage: e.target.value});
  }

  render() {
    const { user, messages, draftMessage } = this.state;

    return (
      <section className="Application">
        <div className="DisplayMessages">
          <DisplayMessages
            messages={this.state.messages}
          />
        </div>
        <div className="LoginStatus">
          {user ? <p>Logged in as <span className= 'user-display'>{user.displayName}</span> ({user.email})</p> : <button className="LogIn-btn" onClick={() => signIn()}>Log In</button> }
        </div>
        <div className="InputForm">
          <InputForm
            draftedMessage={this.state.draftMessage}
            onDraftedMessageChange={this.updateMessageState.bind(this)}
            onMessageSubmit={() => this.addNewMessage()}
          />
        </div>
      </section>
    )
  }
}

module.exports = Application
