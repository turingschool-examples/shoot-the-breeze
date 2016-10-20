import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import SubmitMessage from './submit-message.js';
import ClearInput from './clear-input.js';
import LogInButton from './login-button.js';
import LogOutButton from './logout-button.js';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      newMessage: '',
      nameOfUser: ''
    };

  } //end of constructor

  initFirebase(){ //needs to be called on page load
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  } // end of initFirebase

  handleInputChange(e){
    this.setState({newMessage: e.target.value});
  } //end of handleInputChange

  onAuthStateChanged(user){ //we need to come back and complete this
    if (user) {
      let profilePicUrl = user.photoURL;
      let userName = user.displayName;
      let userNameField = document.getElementById('user-name');
      let userPicField = document.getElementById('user-pic');
      let logInButton = document.querySelector('.login-button');
      let logOutButton = document.querySelector('.logout-button');
      userNameField.textContent = userName;
      userPicField.setAttribute('src', profilePicUrl);
      // this.setState({nameOfUser: userName}); //causes browser to freeze and crash
      userNameField.removeAttribute('hidden');
      userPicField.removeAttribute('hidden');
      logOutButton.removeAttribute('hidden');
      logInButton.setAttribute('hidden', 'true');
      // //load existing messages
      // this.loadMessages();
    } //end of if user is signed in
    else {
      let userNameField = document.getElementById('user-name');
      let userPicField = document.getElementById('user-pic');
      let signOutButton = document.querySelector('.logout-button');
      userNameField.setAttribute('hidden', 'true');
      userPicField.setAttribute('hidden', 'true');
      signOutButton.setAttribute('hidden', 'true');
      //show the log in button of needed

    } //end of else user is signed out
  } //end of onAuthStateChanged

  signIn(){
    let provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  } //end of signIn

  signOut(){
    this.auth.signOut();
  }

  render(){
    return (
      <div onLoad={this.initFirebase()}>
        <LogInButton handleClick={()=>this.signIn()}/>
        <LogOutButton handleClick={()=>this.signOut()}/>
        <input id="message-entry-field" type="text" placeholder="Message" onChange={this.handleInputChange.bind(this)} value={this.state.newMessage}></input>
        <p id="character-counter-output">Count</p>
        <SubmitMessage />
        <ClearInput />
        <ChatMaster message={this.state.newMessage} nameOfUser={this.state.nameOfUser}/>
      </div>
    )
  }

} //end of Application

class ChatMaster extends React.Component {
  constructor(props) {
    super(props);

  } //end of constructor

  render () {
    return (
      <div>
        <div className="message-output-container">

        </div>
        <div className="user-info-container">
          <img id="user-pic" hidden/>
          <div id="user-name" hidden></div>
        </div>

      </div> //end of main div
    );
  }
} //end of ChatMaster

module.exports = Application;

// initFirebase() {
//   this.auth = firebase.auth();
//   this.database = firebase.database();
//   this.storage = firebase.storage();
//   this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
// }
//
// loadMessages(){
//   //load and listen for new messages
//   this.messagesRef = this.database.ref('messages');
//   this.messagesRef.off();
//
//   //loads last 12 messages and listens for new ones
//   let setMessage = function (data) {
//     let val = data.val();
//     this.displayMessage();
//     //TODO: come back to this and pass in properties for each message
//   }.bind(this);
//   this.messagesRef.limitToLast(12).on('child_added', setMessage);
//   this.messagesRef.limitToLast(12).on('child_changed', setMessage);
// } //end of loadMessages
//
// onAuthStateChanged(user){
//   //is user signed in?
//   if (user) {
//     //Gets profile pic and user's name from Firebase user object
//     let profilePicUrl = user.photoURL;
//     let userName = user.displayName;
//
//     //sets the profile pic and name for the user
//     this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
//     this.userName.textContent = userName;
//
//     //shows user's profile and sign-out button
//     this.userName.removeAttribute('hidden');
//
//     //hide the sign-in button
//     this.signInButton.setAttribute('hidden', 'true');
//
//     //to load current chat messages
//     this.loadMessages();
//
//   } else {
//     //if user is signed out, hide their profile and sign-out button
//     this.userName.setAttribute('hidden', 'true');
//     this.userPic.setAttribute('hidden', 'true');
//     this.signOutButton.setAttribute('hidden', 'true');
//     this.signInButton.removeAttribute('hidden');
//   } //end of if/else statement
// } //end of onAuthStateChanged
//
// signIn(){
//   let provider = new firebase.auth.GoogleAuthProvider();
//   this.auth.signInWithPopup(provider);
// }
//
// signOut(){
//   this.auth.signOut();
// }
