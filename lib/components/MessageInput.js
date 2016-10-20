import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

export default class MessageInput extends Component {
  constructor() {
    super()
    this.state = {
      draftMessage: ''
    }
  }
  submitMessage(e) {
    e.preventDefault()
    this.props.addNewMessage(this.state.draftMessage)
    this.setState({ draftMessage: '' })
  }
  render() {
    let buttonToggle = false
    if (!this.state.draftMessage || this.state.draftMessage.length > 140) {
      buttonToggle = true
    }
    return(
      <form className="MessageInput">
        <input
        placeholder="Message…"
        value={this.state.draftMessage}
        onChange={(e) => this.setState({ draftMessage: e.target.value })}
        />
        <p className="CharacterCounter">{140 - this.state.draftMessage.length}</p>

        <button className="SubmitButton" onClick={() => this.props.addNewMessage()} disabled={buttonToggle}>Submit</button>

        <button className="ClearButton" onClick={() => this.setState({ draftMessage: ''})} disabled={!this.props.draftMessage}>Clear</button>
      </form>
    )
  }
}

//should we have the clear and submit button in this component? (they both clearly relate with the message input field); is it better to break this down further?
