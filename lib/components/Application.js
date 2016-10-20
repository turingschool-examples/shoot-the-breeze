import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import SubmitMessage from './submit-message.js';
import ClearInput from './clear-input.js';
import LogInButton from './login-button.js';
import LogOutButton from './logout-button.js';
import moment from 'moment';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      newMessage: '',
      user: ''
    };

  } //end of constructor

  componentDidMount(){
    //set state of user here
  } //end of componentDidMount

  handleInputChange(e){
    this.setState({newMessage: e.target.value});
    let submitButton = document.querySelector('.submit-message-button');
    let clearButton = document.querySelector('.clear-message-button');
    if (this.state.newMessage !== '') {
      submitButton.removeAttribute('disabled');
      clearButton.removeAttribute('disabled');
    }

  } //end of handleInputChange

  initFirebase(){ //needs to be called on page load
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  } // end of initFirebase

  loadMessages(){
    this.messagesRef = this.database.ref('messages');
    this.messagesRef.off();
  } //end of loadMessages

  onAuthStateChanged(user){ //we need to come back and complete this
    if (user) {
      // this.setState({user: user}); //freezes browser
      let profilePicUrl = user.photoURL;
      let userName = user.displayName;
      let userNameField = document.getElementById('user-name');
      let userPicField = document.getElementById('user-pic');
      let logInButton = document.querySelector('.login-button');
      let logOutButton = document.querySelector('.logout-button');
      userNameField.textContent = userName;
      userPicField.setAttribute('src', profilePicUrl);
      userNameField.removeAttribute('hidden');
      userPicField.removeAttribute('hidden');
      logOutButton.removeAttribute('hidden');
      logInButton.setAttribute('hidden', 'true');
      this.loadMessages();
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

  isUserSignedIn(){
    if (this.auth.currentUser) {
    return true;
    }
  } //end of isUserSignedIn

  saveMessage(){
    // event.preventDefault();
    // let that = this;
    if (this.state.newMessage !== '' && this.isUserSignedIn()) {
      //user is signed in
      let currentUser = this.auth.currentUser;
      let body = this.state.newMessage;
      this.state.messages.push(body);
      this.database.ref('messages').push({
        user: currentUser.displayName,
        body: body,
        photo: currentUser.photoURL,
        time: moment().toString()
      });
      this.setState({newMessage: ''});

    } //end of if statement
  } //end of saveMessage

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
        <SubmitMessage handleClick={()=>this.saveMessage()}/>
        <ClearInput  />
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
          <p>{this.props.message}</p>
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
