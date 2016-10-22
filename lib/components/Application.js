import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase'
import { pick, map, extend } from 'lodash'

import MessageInput from './MessageInput.js'
import TitleAndSortBar from './TitleAndSortBar.js'
import UserList from './UserList.js'

import moment from 'moment'

export default class Application extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      filteredMessages: [],
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
    firebase.auth().onAuthStateChanged(user => this.setState({ user }))
  }
  submitNewMessage(draftMessage) {
    const { user } = this.state
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: moment().format('MMMM D, h:mm a')
    })
  }
  // submitNewSearch(searchValue) {
  //   reference.push({
  //
  //   })
  // }
  //  addNewSearch={this.submitNewSearch.bind(this)}
  // filterMessages() {
  //   debugger
  //   let filteredMessages = this.messages.filter(
  //     (message) => {
  //       if (message.content === this.props.search) {
  //         return message
  //       }
  //     }
  //   )
  // }
  render() {
    const { user, messages } = this.state;
    return (
      <div className="application">
        <TitleAndSortBar/>
        <UserList messageList={this.state.messages} />
        <ul>
          { this.state.messages.map(m =>
            <li key={m.key}>{m.createdAt} <span className="user-name-on-message">{m.user.displayName.split(' ')[0]}</span><br/>
            {m.content}</li>) }
        </ul>
        <div className="footer">
          {user ? <div className="user-welcome-bar"><button onClick={() => signOut()}>Sign Out</button><p>Logged in as <span className="user-name-on-bar">{user.displayName.split(' ')[0]}</span> ({user.email})</p></div> : <button onClick={() => signIn()}>Sign In</button> }
          <MessageInput addNewMessage={this.submitNewMessage.bind(this)}/>
        </div>
      </div>
    )
  }
}

//pseudo code how to create "message" and user "constructor" dumb components
