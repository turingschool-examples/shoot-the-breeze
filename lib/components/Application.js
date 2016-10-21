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
  //
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
    let that = this;
    reference.on('value', function (snapshot) {
      var messagesReturned = that.returnArray(snapshot.val());
      that.setState({messages: messagesReturned});
    }); //end of snapshot function
  } //end of loadMessages

  returnArray(snapshots){
    let array = [];
    if (snapshots) {
      var fullArray = Object.keys(snapshots).map((each)=>{
        var singleMessage = snapshots[each];
        singleMessage['each'] = each;
        array.push(singleMessage);
      });
    }
    return array;
  } //end of returnArray

  onAuthStateChanged(user){
    if (user) {
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
      reference.push({
        user: currentUser.displayName,
        body: body,
        photo: currentUser.photoURL,
        time: moment().toString()
      });
      this.setState({newMessage: ''});
      this.loadMessages();
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
        <ChatMaster user={this.state.user} messages={this.state.messages}/>
      </div>
    )
  }

} //end of Application

class ChatMaster extends React.Component {
  constructor(props) {
    super(props);

  } //end of constructor

  showMessages(messages){ //the card for each message
    return(
      <div>
        <img className="chat-card-img" src={messages.photo}/>
        <p>On {messages.time}, {messages.user} says:</p>
        <p>{messages.body}</p>
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="message-output-container">
          <ul>
            <li>{this.props.messages.map(this.showMessages)}</li>
          </ul>
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
