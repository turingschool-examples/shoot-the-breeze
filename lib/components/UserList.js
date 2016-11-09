import React, { Component } from 'react'
import { map } from 'lodash'

export default class UserList extends Component {
  render() {
    return(
    <div className='user-list'>
      <p
        className='users-text'
        onClick={this.props.clearUserState}
      >Users
      </p>
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
