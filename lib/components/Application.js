import React, { Component } from 'react';
import firebase, { reference, signIn, currUser } from '../firebase';
import { pick, map, extend } from 'lodash';
import SubmitMessage from './submit-message.js';
import ClearInput from './clear-input.js';
import LogInButton from './login-button.js';
import LogOutButton from './logout-button.js';
import SortUp from './sort-up.js';
import SortDown from './sort-down.js';
import moment from 'moment';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      newMessage: '',
      user: '',
      submitButtonDisabled: true,
      clearButtonDisabled: true,
      usersInChat: []
    };

  } //end of constructor

  componentDidMount(){

  } //end of componentDidMount

  clearInputField(){
    document.getElementById('message-entry-field').value = '';
    this.disableButtons();
    this.setState({newMessage: ''});
  }

  detectFieldContent(e){
    if (e.target.value !== '') {
      this.enableButtons();
    }
    else {
      this.disableButtons();
    }
  }

  disableButtons(){
    this.setState({submitButtonDisabled: true});
    this.setState({clearButtonDisabled: true});
  }

  enableButtons(){
    this.setState({submitButtonDisabled: false});
    this.setState({clearButtonDisabled: false});
  }

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
    reference.limitToLast(25).on('value', function (snapshot) {
      var messagesReturned = that.returnArray(snapshot.val());
      that.setState({messages: messagesReturned});
    }); //end of snapshot function
  } //end of loadMessages

  onAuthStateChanged(user){
    if (user) {
      let profilePicUrl = user.photoURL;
      let userName = user.displayName;
      // console.log(currUser);
      let logInButton = document.querySelector('.login-button');
      let logOutButton = document.querySelector('.logout-button');
      logOutButton.removeAttribute('hidden');
      logInButton.setAttribute('hidden', 'true');
      // this.loadMessages();
    } //end of if user is signed in
    else {
      let signOutButton = document.querySelector('.logout-button');
      signOutButton.setAttribute('hidden', 'true');
      //show the log in button of needed

    } //end of else user is signed out
  } //end of onAuthStateChanged

  isUserSignedIn(){
    if (this.auth.currentUser) {
    return true;
    }
  } //end of isUserSignedIn

  returnArray(snapshots){
    let array = [];
    if (snapshots) {
      var fullArray = Object.keys(snapshots).map((each)=>{
        var singleMessage = snapshots[each];
        // singleMessage['each'] = each;
        array.push(singleMessage);
      });
    }
    return array;
  } //end of returnArray

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
        time: moment().toString(),
        id: Date.now()
      });
      this.setState({newMessage: ''});
      this.disableButtons();
      this.loadMessages();
      currUser.push({
        user: currentUser.displayName
      });
      this.showUsers();
      // console.log(this.state.usersInChat);
    } //end of if statement
  } //end of saveMessage

  showUsers(){
    let that = this;
    currUser.on('value', (snapshot)=>{
      let users = that.returnArray(snapshot.val());
      that.setState({usersInChat: users});
    });
  } //end of showUsers

  signIn(){
    let provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  } //end of signIn

  signOut(){
    this.auth.signOut();
  }

  sortDown(){ //most recent at bottom
    this.loadMessages();
    this.sortMostRecentAtBottom();
  } //sortUp

  sortMostRecentAtBottom(){
    this.state.messages.sort((a, b)=>{
      return a.id - b.id;
    });
  }

  sortUp(){ //most recent at top
    this.loadMessages();
    let array = this.state.messages;
    let reversed = array.reverse();
    this.setState({messages: reversed});
  }

  render(){
    return (
      <div onLoad={this.initFirebase()}>
        <LogInButton handleClick={()=>this.signIn()}/>
        <LogOutButton handleClick={()=>this.signOut()}/>
        <input id="message-entry-field" type="text" placeholder="Message" onChange={this.handleInputChange.bind(this)} value={this.state.newMessage} onKeyUp={this.detectFieldContent.bind(this)} onBlur={this.detectFieldContent.bind(this)}></input>
        <p id="character-counter-output">Count</p>
        <SubmitMessage handleClick={()=>this.saveMessage()} isDisabled={this.state.submitButtonDisabled}/>
        <ClearInput handleClick={()=>this.clearInputField()} isDisabled={this.state.clearButtonDisabled}/>
        <ChatMaster user={this.state.user} messages={this.state.messages} usersInChat={this.state.usersInChat}/>
        <SortUp handleClick={()=>this.sortUp()}/>
        <SortDown handleClick={()=>this.sortDown()}/>
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

  showTheUsers(messages){
    return(
      <div>
        <p>User: {messages.user}</p>
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="message-output-container">
          <ul>
            <li>{this.props.messages.map(this.showMessages)}</li>
            <li>{this.props.messages.map(this.showTheUsers)}</li>
          </ul>
        </div>
        <div className="user-info-container">
          <h2>Users Present in the Chat Room:</h2>

        </div>

      </div> //end of main div
    );
  }
} //end of ChatMaster

module.exports = Application;
