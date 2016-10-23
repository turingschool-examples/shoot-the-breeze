import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import Application from './Application.js';

class SubmitMessage extends React.Component {
  constructor(props) {
    super(props);

  }//end of constructor

  componentDidMount(){
    // document.querySelector('.submit-message-button').setAttribute('disabled', 'true');
  } //end of componentDidMount

  render () {
    return (
      <button className="submit-message-button" onClick={this.props.handleClick} disabled={this.props.isDisabled} hidden>Submit Message</button>
    );
  }
} //end of SubmitMessage

module.exports = SubmitMessage;
