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
  createMessage(e) {
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

        <button className="SubmitButton" type="submit" onClick={(e) => this.createMessage(e)} disabled={buttonToggle}>Submit</button>

        <button className="ClearButton" onClick={() => this.setState({ draftMessage: ''})} disabled={!this.state.draftMessage}>Clear</button>
      </form>
    )
  }
}
