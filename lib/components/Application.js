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
        <ChatMaster />
      </div>
    )
  }

} //end of Application

class ChatMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      date: Date.now(),
      content: ''
    };
  }

  initFirebase() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  }

  render () {
    return (
      <div className="message-output-container">

      </div>
    );
  }
} //end of ChatMaster

module.exports = Application;
