import React, { Component } from 'react'
import { pick, map, extend, uniqBy } from 'lodash'


export default class UserList extends Component {

  render() {
    return(
    <div className='userList'>
      <p className='users-text'>Users</p>
      <section>
        {
          this.props.users.map(user =>
            <p
              key={user.key}
              value={user.email}
              onClick= {this.props.setUserState}
            >
              {user.displayName.split(' ')[0]} ({user.email})
            </p>
          )
        }
      </section>
    </div>
    )
  }
}
