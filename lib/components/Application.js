import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';


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
      createdAt: Date.now()
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

        <div className="LoginStatus">
          {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        </div>

        <div className="DisplayMessages">
          <DisplayMessages messages={this.state.messages} />
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
