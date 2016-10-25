import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase'
import { pick, map, extend, uniqBy } from 'lodash'

import MessageInput from './MessageInput.js'
import TitleAndSortBar from './TitleAndSortBar.js'
import UserList from './UserList.js'

import moment from 'moment'

export default class Application extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      users: [],
      user: null,
      filteredText: '',
      userState: ''
      // filteredMessages: [],
      // sortedByNewMessages: false
    }
  }
  //2 functions: sort UP and sort DOWN
  //both have this.state.messages.reverse()
  //this.setState({sortedByNewMessages: true/false})
  //if true, do the false one, vice versa

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
  filterMessages(searchValue) {
    this.setState({filteredMessages: this.state.messages.filter((message) => {
      return (message.content.includes(searchValue))
      })
    })
  }
  updateSearch(e) {
    this.setState({ filteredText: e.target.value })
  }

  // filterMessagesByText(filteredMessages) {
  //   let currentMessages = filteredMessages || this.state.messages
  //   currentMessages.filter(message =>
  //     message.content.toLowerCase().indexOf(this.state.filteredText.toLowerCase()) !== -1
  //     || message.user.displayName.toLowerCase().indexOf(this.state.filteredText.toLowerCase()) !== -1
  //     || message.user.email.toLowerCase().indexOf(this.state.filteredText.toLowerCase()) !== -1)
  // }

  // function filterAll(messages) {
  //   var filter1 = filter1(messages);
  //   var filter2 = filter2(filter1);
  // }
  //
  // filterAll(this.state.messages)
// _________________________
  // filterAllMessages() {
  //   this.filterMessagesByText()
  // }
  // _____________________________
  // filterMessagesByUserClick() {
  //   debugger
  //   let filteredMessages = this.state.messages.filter(message =>
  //     message.user.email === this.state.userState)
  //   this.renderMessages(filteredMessages)
  // }
  renderMessages(filteredMessages) {
    let currentMessages = filteredMessages ? filteredMessages : this.state.messages
    return currentMessages.map(message => {
      return (
        <li key={message.key}>
          <span className="time-stamp">{message.createdAt}</span>
          <span className="user-name-on-message">
          {message.user.displayName.split(' ')[0]}</span><br/>
          {message.content}
        </li>
      )
    })
  }
  setUserState(e){
    this.setState({ userState: e.target.attributes[0].value })
  }
  render() {
    const { user, messages, filteredMessages, userText } = this.state;
    return (
      <div className="application">
        <TitleAndSortBar updateSearch={(e) => this.updateSearch(e)} />
        <UserList
          users={this.state.users}
          setUserState={(e) => this.setUserState(e)}
        />
        <ul className='messageWindow'>
          { this.renderMessages() }
        </ul>
        <div className="footer">
          {
            user ?
            <div className="user-welcome-bar">
              <button onClick={() => signOut()}>
                Sign Out
              </button>
              <p>Logged in as <span className="user-name-on-bar">{user.displayName.split(' ')[0]}</span> ({user.email})</p>
            </div> :
            <button onClick={() => signIn()}>Sign In</button>
          }
          <MessageInput addNewMessage={this.submitNewMessage.bind(this)} />
        </div>
      </div>
    )
  }

}
