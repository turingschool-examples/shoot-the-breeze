import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase'
import { pick, map, extend, uniqBy } from 'lodash'

import MessageInput from './MessageInput.js'
import TitleAndSortBar from './TitleAndSortBar.js'
// import UserList from './UserList.js'

import moment from 'moment'

export default class Application extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      users: [],
      user: null
    }
  }
  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {}
      const currentMessages = map(messages, (val, key) => extend(val, { key }))
      let currentUsers = []
      currentMessages.forEach((message) => {
        currentUsers.push({ key: message.user.uid, displayName: message.user.displayName, email: message.user.email })
      })
      this.setState({
        messages: currentMessages,
        users: uniqBy(currentUsers, 'email')
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
  // <UserList messageList={this.state.messages} />
  render() {
    const { user, messages } = this.state;
    return (
      <div className="application">
        <TitleAndSortBar/>
        <ul>
          { this.state.users.map(user =>
            <li key={user.key}>{user.displayName.split(' ')[0]} ({user.email}) </li>) }
        </ul>
        <ul>
          { this.state.messages.map(message =>
            <li key={message.key}><span className="time-stamp">{message.createdAt} </span><span className="user-name-on-message">{message.user.displayName.split(' ')[0]}</span><br/>
            {message.content}</li>) }
        </ul>
        <div className="footer">
          {user ? <div className="user-welcome-bar"><button onClick={() => signOut()}>Sign Out</button><p>Logged in as <span className="user-name-on-bar">{user.displayName.split(' ')[0]}</span> ({user.email})</p></div> : <button onClick={() => signIn()}>Sign In</button> }
          <MessageInput addNewMessage={this.submitNewMessage.bind(this)}/>
        </div>
      </div>
    )
  }

}
