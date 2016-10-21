import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

import Application from './Application.js'


export default class UserList extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      // user: null
    }
  }

  updateUserList() {

  }

  render() {
    return(
      <ul>
        { this.props.state.messages.uniq().map(m =>
        <li key={m.key}>{m.user.displayName} {user.email} </li>) }
      </ul>
    )
  }


  // <ul className="user-list">
  //   <li className="user">{}</li>
  // </ul>
