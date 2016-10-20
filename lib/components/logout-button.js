import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

class LogOutButton extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    return (
      <button className="logout-button" onClick={this.props.handleClick2}>Log Out</button>
    );
  }
} //end of LogInButton

module.exports = LogOutButton;
