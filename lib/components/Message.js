import React, { Component } from 'react';

export default class HeaderContainer extends Component {
  render() {
    return (
      <li>
        <h2 className="current-date">September 12, 4:35pm</h2>
        <h2 className="message-username">Mike</h2>
        <h2 className="message">Here is my message.</h2>
      </li>
    )
  }
}
