import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import SubmitMessage from './submit-message.js';
import ClearInput from './clear-input.js';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
      user: null
    };

  } //end of constructor

  render(){
    return (
      <div>
        <input id="message-entry-field" type="text" placeholder="Message"></input>
        <p id="character-counter-output">Count</p>
        <SubmitMessage />
        <ClearInput />
      </div>
    )
  }

} //end of Application

module.exports = Application;
