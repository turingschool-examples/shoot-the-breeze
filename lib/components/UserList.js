import React, { Component } from 'react'
import { pick, map, extend, uniqBy } from 'lodash'


export default class UserList extends Component {

  render() {
    return(
    <ul className='userList'>
      {
        this.props.users.map(user =>
          <li
            key={user.key}
            value={user.email}
            onClick= {this.props.setUserState}
          >
            {user.displayName.split(' ')[0]} ({user.email})
          </li>
        )
      }
    </ul>
    )
  }
}
