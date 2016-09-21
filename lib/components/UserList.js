import React, { Component } from 'react';
import MessageList from './MessageList';
import { uniqWith, map, isEqual } from 'lodash';
import User from './User';

class UserList extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    let usersArray = [];
    map(this.props.messages, (message) => usersArray.push(message.user));
    const uniqueUsers = (_.uniqWith(usersArray, _.isEqual));
    const displayUsers = map(uniqueUsers, (user) => {
        return <User  user={user}
                      key={user.uid}
                      filterMethod={this.props.filterMethod}
                    />

    })



    return(

      <ul className='user-list'>
        <h3 className="user-list-title">Users</h3>
        {displayUsers}
      </ul>

    )
  }
}

export default UserList;
