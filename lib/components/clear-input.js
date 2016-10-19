import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
// import SubmitMessage from './submit-message.js';

class ClearInput extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    return (
      <button className="clear-message-button" disabled>Clear Message</button>
    );
  }
} //end of ClearInput

module.exports = ClearInput;
