import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'
import MessageInput from './MessageInput.js'

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
    firebase.auth().onAuthStateChanged(user => this.setState({ user }))
  }
  addNewMessage(draftMessage) {
    const { user } = this.state

    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: Date.now()
    })
  }
  render() {
    const { user, messages } = this.state;
    return (
      <div className="Application">
        {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        <ul>
          { this.state.messages.map(m => <li key={m.key}>{m.user.displayName}: {m.content}</li>) }
        </ul>
        <MessageInput />
      </div>
    )
  }
}
