import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase'
import { pick, map, extend, uniqBy } from 'lodash'

import { FilterBar } from './FilterBar.js'
import { MessageList } from './MessageList.js'
import UserList from './UserList.js'
import MessageInput from './MessageInput.js'

import moment from 'moment'

export default class Application extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      users: [],
      user: null,
      filteredText: "",
      userState: '',
      reverseMessages: false
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
    this.setMessagesAndUsers(currentMessages, currentUsers)
    })
    firebase.auth().onAuthStateChanged(user => this.setState({ user }))
  }
  setMessagesAndUsers(currentMessages, currentUsers) {
    this.setState({
      messages: currentMessages,
      users: uniqBy(currentUsers, 'email')
    })
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
      return (message.content.indexOf(searchValue) >= 0)
      })
    })
  }
  updateSearch(e) {
    this.setState({ filteredText: e.target.value })
  }
  filterMessagesByText() {
    let filteredMessages = this.state.messages.filter(message =>
       this.filterMessageContent(message) ||
       this.filterMessageUser(message)  ||
       this.filterMessageTime(message)
     )
    return this.filterMessagesByUserClick(filteredMessages)
  }
  filterMessageContent(message) {
    return(message.content.toLowerCase().indexOf(this.state.filteredText.toLowerCase()) !== -1)
  }
  filterMessageUser(message) {
    return(message.user.displayName.toLowerCase().indexOf(this.state.filteredText.toLowerCase()) !== -1)
  }
  filterMessageTime(message) {
    return(message.createdAt.toLowerCase().indexOf(this.state.filteredText.toLowerCase()) !== -1)
  }
  setUserState(e) {
    this.setState({ userState: e.target.attributes[0].value })
  }
  filterMessagesByUserClick(filteredMessages) {
    if (this.state.userState) {
      return filteredMessages.filter(message =>
        message.user.email === this.state.userState)
      } else {
        return filteredMessages
    }
  }
  sortMsgChronologically() {
    this.setState({ reverseMessages: false })
  }
  sortMsgReverseChronologically() {
    this.setState({ reverseMessages: true })
  }
  render() {
    const { user, messages, filteredMessages, userText } = this.state
    let filtered = this.filterMessagesByText()
    let theMessages = filtered.map((messageProps) =>
      <MessageList {...messageProps}
    key={messageProps.key} /> )
    let displayedMessages;
    if (this.state.reverseMessages === false) {
      displayedMessages = theMessages;
    } else {
      displayedMessages = theMessages.reverse();
    }
    return (
      <div className="application">
        <FilterBar
          updateSearch={this.updateSearch.bind(this)}
          sortDown={this.sortMsgChronologically.bind(this)}
          sortUp={this.sortMsgReverseChronologically.bind(this)}
        />
        <section className='message-user-container'>
          <section className='message-window'>
            {displayedMessages}
          </section>
          <UserList
            users={this.state.users}
            setUserState={(e) => this.setUserState(e)}
            clearUserState={() => this.setState({userState: ''})}
          />
        </section>
        <div className="footer" onClick={() => this.setState({userState: ''})}>
          {
            user ?
            <div className="user-welcome-bar">
              <p className="welcome-message">Logged in as
                <span
                  className="user-name-on-bar">
                  {user.displayName.split(' ')[0]}
                </span> ({user.email})
              </p>
              <button
                className="sign-in-button"
                onClick={() =>
                  signOut()}>
                  Sign Out
              </button>
            </div> :
            <button
              className="sign-out-button"
              onClick={() =>
                signIn()}>
                Sign In
            </button>
          }
          <MessageInput
            className="message-input-container"
            addNewMessage={this.submitNewMessage.bind(this)}
          />
        </div>
      </div>
    )
  }

}
