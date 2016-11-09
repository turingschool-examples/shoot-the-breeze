import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

import { ClearButton } from './ClearButton.js'
import { SubmitButton } from './SubmitButton.js'

export default class MessageInput extends Component {
  constructor() {
    super()
    this.state = {
      draftMessage: ''
    }
  }
  createMessage(e) {
    e.preventDefault()
    this.props.addNewMessage(this.state.draftMessage)
    this.setState({ draftMessage: '' })
  }
  clearMessage(e) {
    e.preventDefault()
    this.setState({ draftMessage: ''})
  }
  render() {
    let buttonToggle = false
    if (!this.state.draftMessage || this.state.draftMessage.length > 140) {
      buttonToggle = true
    }
    return(
      <form className="message-input-form">
        <input
          className="message-input"
          placeholder="Message…"
          value={this.state.draftMessage}
          onChange={(e) =>
              this.setState({ draftMessage: e.target.value }) }
        />
        <p className="char-counter">
          {140 - this.state.draftMessage.length}
        </p>
        <SubmitButton
          buttonToggle={buttonToggle}
          createMessage={this.createMessage.bind(this)}
        />
        <ClearButton
          clearMessage={this.clearMessage.bind(this)}
          draftMessage={this.state.draftMessage}
        />
      </form>
    )
  }
}
