import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

export default class TitleAndSortBar extends Component {
  render() {
    return(
      <div className="header">
        <p className="title">Shoot the Breeze</p>
        <input className="filter-bar" onChange={this.props.updateSearch} placeholder="Filter"></input>
        <span className="up-down-button">
        <button className="sort-newest-user">New</button>
        <button className="sort-oldest-user">Old</button></span>
      </div>
    )
  }
}


// filteredMessages.length > 0 ? this.state.filteredMessages.map(fMessage =>
// <li key={fMessage.key}><span className="time-stamp">{fMessage.createdAt} </span>
// <span className="user-name-on-message">{fMessage.user.displayName.split(' ')[0]}</span><br/>
// {fMessage.content}</li>) :
//
// this.state.messages.map(message =>
// <li key={message.key}><span className="time-stamp">{message.createdAt} </span>
// <span className="user-name-on-message">{message.user.displayName.split(' ')[0]}</span><br/>
// {message.content}</li>)
