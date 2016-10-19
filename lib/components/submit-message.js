import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
// import ClearInput from './clear-input.js';

class SubmitMessage extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    return (
      <button className="submit-message-button" disabled>Submit Message</button>
    );
  }
} //end of SubmitMessage

module.exports = SubmitMessage;
