import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { uniqBy, map } from 'lodash'

import Application from './Application.js'

export default class UserList extends React.Component {
  constructor() {
    super()
  }
  generateCurrentUsers() {
    let uniqueUserList = _.uniqBy(this.props.messageList, 'email')
    return(uniqueUserList.map(m =>
        <li key={m.key}>{m.user.displayName.split(' ')[0]} {m.user.email} </li>)
    )
  }
  render () {
    return(
      <aside>
        <ul className="user-list">
          { generateCurrentUsers() }
        </ul>
      </aside>
    )
  }

}
