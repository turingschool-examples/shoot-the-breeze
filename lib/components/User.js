import React, { Component } from 'react';
import UserList from './UserList';
import MessageList from './MessageList';

class User extends Component {
  constructor(props) {
    super();
  }

  render() {
    const name = this.props.user.displayName
    return(
      <li
        className="User"
          key={this.props.user.uid}
          onClick={(e) => this.props.filterMethod(name)}
          >
        <p>{this.props.user.displayName.split(' ')[0]} ({this.props.user.email})</p>
      </li>
    )
  }
}

export default User;
