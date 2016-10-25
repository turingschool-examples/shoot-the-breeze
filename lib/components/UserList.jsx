import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { uniqBy, sortedUniqBy } from 'lodash';

export default class UserList extends Component {
  get displayUsers() {
    let users = this.props.messages.map(m => {
      return {
        userName: m.user.displayName,
        id: m.user.uid,
        email: m.user.email
      };
    });
    
    var findUser = uniqBy(users, 'id');
    return sortedUniqBy(findUser, 'userName');
  }

  render() {
    return (
      <div id="user-list">
        <h3>Users</h3>
        <ul>
          {this.displayUsers.map(u => {
            return <li key= {u.createdAt}>{u.userName} ({u.email})</li>
          })}
        </ul>
      </div>
    )
  }
}
