import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import Application from './Application.js';

class SubmitMessage extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    return (
      <button isDisabled={this.props.isDisabled} className="submit-message-button" onClick={this.props.handleClick}>Submit Message</button>
    );
  }
} //end of SubmitMessage

module.exports = SubmitMessage;
