import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { uniq, map } from 'lodash'

import Application from './Application.js'

export default class UserList extends React.Component {
  render () {
    // let userList = []
    let userList = uniq(this.props.messageList.map(m =>
      <li key={m.key}>{m.user.displayName.split(' ')[0]} {m.user.email} </li>))
    return(
      <aside>
        <ul className="user-list">
          { userList }
        </ul>
      </aside>
    )
  }
}


//make sure to wrap the email in parantheses
