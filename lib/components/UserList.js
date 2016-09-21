import React, { Component } from 'react';
import Application from './Application';
import { uniqWith, map, isEqual } from 'lodash';

class UserList extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    let usersArray = [];

    map(this.props.messages, (message) => usersArray.push(message.user))

    const uniqueUsers = (_.uniqWith(usersArray, _.isEqual))


    return(

      <ul className='user-list'>
        <h3 className="user-list-title">Users</h3>
        { uniqueUsers.map(u => <li key={u.uid}>{u.displayName.split(' ')[0]} ({u.email}) </li>) }
      </ul>

    )
  }
}

export default UserList;
