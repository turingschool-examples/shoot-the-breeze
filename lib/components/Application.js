import React, { Component } from 'react';
import firebase, { reference, signIn} from '../firebase';
import { pick, map, extend, uniq} from 'lodash';
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
      uniqueArray: []
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

      if (this.state.newMessage.length >= 140) {
      submitButton.setAttribute('disabled', 'true');
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
    if (this.state.newMessage !== '' && this.isUserSignedIn()) {
      //user is signed in
      let currentUser = this.auth.currentUser;
      let body = this.state.newMessage;
      this.state.messages.push(body);
      reference.push({
        user: currentUser.displayName,
        body: body,
        photo: currentUser.photoURL,
        time: moment().format("MMMM D, h:mm a "),
        id: Date.now()
      });
      this.setState({newMessage: ''});
      this.disableButtons();
      this.loadMessages();
      this.uniqueUserArray();
    } //end of if statement
  } //end of saveMessage

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

  uniqueUserArray(){
    var userArray = [];
    var messages = this.state.messages;
    messages.forEach((message)=>{
      userArray.push(message.user);
    });
    this.createUniqueUserArray(userArray);
  }

  createUniqueUserArray(userArray){
    let unique = _.uniq(userArray);
    this.setState({uniqueArray: unique});
  }

  render(){
    return (
      <div onLoad={this.initFirebase()}>
        <header>
          <h2 id="page-main-title">Shoot the Breeze</h2>
          <input id="filter-input-field" type="text" defaultValue="Filter"></input>
          <SortUp className="sort-up-button" handleClick={()=>this.sortUp()}/>
          <SortDown className="sort-down-button" handleClick={()=>this.sortDown()}/>
        </header>
        <LogInButton handleClick={()=>this.signIn()}/>
        <LogOutButton handleClick={()=>this.signOut()}/>
        <input id="message-entry-field" type="text" placeholder="Message" onChange={this.handleInputChange.bind(this)} value={this.state.newMessage} onKeyPress={this.detectFieldContent.bind(this)} onBlur={this.detectFieldContent.bind(this)}></input>
        <p id="character-counter-output">
        Character Count: {this.state.newMessage.length}
        </p>
        <SubmitMessage handleClick={()=>this.saveMessage()} isDisabled={this.state.submitButtonDisabled}/>
        <ClearInput handleClick={()=>this.clearInputField()} isDisabled={this.state.clearButtonDisabled}/>
        <ChatMaster user={this.state.user} messages={this.state.messages} usersInChat={this.state.uniqueArray}/>
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
        <p>On {messages.time} {messages.user} says:</p>
        <p>{messages.body}</p>
      </div>
    )
  }

  showUsersInChat(user){
    return(
      <div>
        <p>{user}</p>
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
          <h2>Users Present in the Chat Room:</h2>
          <p>{this.props.usersInChat.map(this.showUsersInChat)}</p>

        </div>

      </div> //end of main div
    );
  }
} //end of ChatMaster

module.exports = Application;
