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

  loadMessages(){
    //load and listen for new messages
    this.messagesRef = this.database.ref('messages');
    this.messagesRef.off();

    //loads last 12 messages and listens for new ones
    let setMessage = function (data) {
      let val = data.val();
      this.displayMessage();
      //TODO: come back to this and pass in properties for each message
    }.bind(this);
    this.messagesRef.limitToLast(12).on('child_added', setMessage);
    this.messagesRef.limitToLast(12).on('child_changed', setMessage);
  } //end of loadMessages

  onAuthStateChanged(user){
    //is user signed in?
    if (user) {
      //Gets profile pic and user's name from Firebase user object
      let profilePicUrl = user.photoURL;
      let userName = user.displayName;

      //sets the profile pic and name for the user
      this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
      this.userName.textContent = userName;

      //shows user's profile and sign-out button
      this.userName.removeAttribute('hidden');

      //hide the sign-in button
      this.signInButton.setAttribute('hidden', 'true');

      //to load current chat messages
      this.loadMessages();

    } else {
      //if user is signed out, hide their profile and sign-out button
      this.userName.setAttribute('hidden', 'true');
      this.userPic.setAttribute('hidden', 'true');
      this.signOutButton.setAttribute('hidden', 'true');
      this.signInButton.removeAttribute('hidden');
    } //end of if/else statement
  } //end of onAuthStateChanged

  signIn(){
    let provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  }

  signOut(){
    this.auth.signOut();
  }

  render () {
    return (
      <div className="message-output-container">
        (messages appear here)
      </div>
    );
  }
} //end of ChatMaster

module.exports = Application;
