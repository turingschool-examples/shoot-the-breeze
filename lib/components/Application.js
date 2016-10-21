import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

import MessageInput from './MessageInput.js'
import TitleAndSortBar from './TitleAndSortBar.js'
// import UserList from './UserList.js'

var moment = require('moment')

export default class Application extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      user: null
    }
  }
  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {}
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      })
    })
    //reference is the firebase database.
    //calls a pull of the last 100 messages
    //value indicates a change in which a snapshot of all changes are pulled
    //then the state of messages is changed to get set to new changes or empty obj
    firebase.auth().onAuthStateChanged(user => this.setState({ user }))
  }
  submitNewMessage(draftMessage) {
    const { user } = this.state

    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: moment().format('MMMM Do, h:mm a')
    })
  }
  //do we want to refactor 'submitNewMessage' into a constructor function?
  // <UserList />
  render() {
    const { user, messages } = this.state;
    return (
      <div className="Application">
        <TitleAndSortBar />
        <ul>
          { this.state.messages.map(m =>
            <li key={m.key}>{m.createdAt} {m.user.displayName}<br/>
            {m.content}</li>) }
        </ul>
        {user ? <p className="UserWelcomeBar">Logged in as <span className="UserName">{user.displayName.split(' ')[0]}</span> ({user.email})</p> : <button onClick={() => signIn()}>Sign In</button> }
        <MessageInput addNewMessage={this.submitNewMessage.bind(this)}/>
      </div>
    )
  }
}

//pseudo code how to create "message" and user "constructor" dumb components
