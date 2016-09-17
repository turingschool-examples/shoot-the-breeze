import React, { Component } from 'react';
import User from './User.js';

export default class UsersContainer extends Component {


  render() {
    return (
      <aside className="users-container">
        <h1>Users</h1>
        <User />
      </aside>
    )
  }
}
