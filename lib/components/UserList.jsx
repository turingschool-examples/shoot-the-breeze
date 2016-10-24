import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { sortedUniqBy } from 'lodash';

export default class UserList extends Component {
  get displayUsers() {
    let users = this.props.messages.map(m => {
      return { userName: m.user.displayName, email: m.user.email};
    });
    return sortedUniqBy(users, 'userName');
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
