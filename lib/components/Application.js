import React, { Component } from 'react';
import firebase, { reference, signIn} from '../firebase';
import { pick, map, extend, uniq, filter} from 'lodash';
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
      newMessageLength: '',
      user: '',
      submitButtonDisabled: true,
      clearButtonDisabled: true,
      userFilter: ''
    };

  } //end of constructor

  //core built-in functions

  componentDidMount(){
    this.loadMessages();
  } //end of componentDidMount

  //regular functions

  assignNewMessageLength(){
    this.setState({newMessageLength: this.state.newMessage.length});
  }

  clearInputField(){
    this.clearMessageInput();
    this.disableButtons();
    this.resetNewMessageState();
    this.resetNewMessageLengthState();
  }

  clearMessageInput(){
    document.getElementById('message-entry-field').value = '';
  }

  detectFieldContent(e){
    if (e.target.value !== '') {
      this.enableButtons();
    }
    else {
      this.disableButtons();
      this.resetNewMessageLengthState();
    }
  } //end of detectFieldContent

  disableButtons(){
    this.setState({submitButtonDisabled: true});
    this.setState({clearButtonDisabled: true});
  }

  enableButtons(){
    this.setState({submitButtonDisabled: false});
    this.setState({clearButtonDisabled: false});
  }

  handleInputChange(e){

    const items = {
      thereIsANewMessage: this.state.newMessage.length > 0,
      messageIsTooLong: this.state.newMessage.length >= 140
    };

    this.makeNewMessageTheInputValue(e);

    if (items.thereIsANewMessage) {
      this.assignNewMessageLength();
      this.enableButtons();
    }

    if (items.messageIsTooLong) {
      this.setState({submitButtonDisabled: true});
    }

  } //end of handleInputChange

  initFirebase(){
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  } // end of initFirebase

  isUserSignedIn(){
    if (this.auth.currentUser) {
      return true;
    }
  } //end of isUserSignedIn

  loadMessages(){
    let that = this;
    reference.limitToLast(25).on('value', (snapshot) =>  {
      let messagesReturned = this.returnArray(snapshot.val());
      that.setMessageStateToFirebaseData(messagesReturned);
    });
  } //end of loadMessages

  makeNewMessageTheInputValue(e){
    this.setState({newMessage: e.target.value});
  }

  onAuthStateChanged(user){

    const items = {
      charCountOutput: document.getElementById('character-counter-output'),
      clearMessageButton: document.querySelector('.clear-message-button'),
      email: user.email,
      footerBottomComponent: document.querySelector('.footer-bottom-component'),
      loggedInAs: document.querySelector('.logged-in-as'),
      logInButton: document.querySelector('.login-button'),
      logOutButton: document.querySelector('.logout-button'),
      messageEntryField: document.getElementById('message-entry-field'),
      submitMessageButton: document.querySelector('.submit-message-button'),
      userName: user.displayName
    };

    if (user) {
      //user is logged in
      this.showItem(items.clearMessageButton);
      this.showLoggedInUser(items.loggedInAs, items.userName, items.email);
      // items.loggedInAs.textContent = "Logged in as " + items.userName + " (" + items.email + ")" + ".";
      items.logInButton.setAttribute('hidden', 'true');
      items.logOutButton.removeAttribute('hidden');
      items.messageEntryField.removeAttribute('hidden');
      items.submitMessageButton.removeAttribute('hidden');
    } //end of if user is signed in

    else {
    //user is not logged in
    items.clearMessageButton.setAttribute('hidden', 'true');
    items.logInButton.removeAttribute('hidden');
    items.logOutButton.setAttribute('hidden', 'true');
    items.messageEntryField.setAttribute('hidden', 'true');
    items.submitMessageButton.setAttribute('hidden', 'true');
    } //end of else user is signed out

  } //end of onAuthStateChanged

  resetNewMessageLengthState(){
    this.setState({
      newMessageLength: ''
    });
  } //end of resetNewMessageLengthState

  resetNewMessageState(){
    this.setState({
      newMessage: '',
    });
  } //end of resetNewMessageState

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
    if (this.state.newMessageLength > 0 && this.state.newMessageLength < 140  && this.isUserSignedIn()) {
      //user is signed in
      let currentUser = this.auth.currentUser;
      let body = this.state.newMessage;
      const newMsgObj = {
        user: currentUser.displayName,
        body: body,
        photo: currentUser.photoURL,
        email: currentUser.email,
        time: moment().format("MMMM D, h:mm a "),
        id: Date.now(),
      };
      reference.push(newMsgObj);
      this.resetNewMessageState();
      this.setStateToUser(currentUser);
      this.disableButtons();
      this.loadMessages();
      this.setState({newMessageLength: ''});
    } //end of if statement

  } //end of saveMessage

  setMessageStateToFirebaseData(messagesReturned){
    this.setState({
      messages: messagesReturned,
    });
  } //end of setMessageStateToFirebaseData

  setStateToUser(currentUser){
    this.setState({
      user: currentUser.displayName,
    });
  }

  showItem(item){
    item.removeAttribute('hidden');
  }

  showLoggedInUser(loggedInAs, userName, email){
      loggedInAs.textContent = "Logged in as " + userName + " (" + email + ")" + ".";
  }

  signIn(){
    let provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
    this.setState({logOutButtonClass: 'logout-button'});
  } //end of signIn

  signOut(){
    const warning = confirm("Are you sure you want to log out?");
    if (warning) {
      this.auth.signOut();
      window.location.reload();
    }
  } //end of signOut

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

  // filterUserMessages(user){
  //   // let array = this.state.messages;
  //   // let filteredUserMessages =_.filter(array, function(message) {
  //   //     return message.user === this.state.filteredUser;
  //   //   });
  //   // modify this.state to add a filter to the messages array
  //   console.log(user);
  //   this.setState(filterUser: user);
  //   // Rendering messages needs to filter messages based on this.state.filterUser.
  //   // If this.state.filterUser is the empty string, show all messages. Otherwise,
  //   // show only the messages for the filtered user
  //   //find messages based on user that was clicked
  //   //assign those messages to a new variable
  //   //display the messages from the user
  // }

  //the render function for Application

  render(){
    return (
      <div onLoad={this.initFirebase()}>
        <header>
          <h2 id="page-main-title">Shoot the Breeze</h2>
          <input id="filter-input-field" type="text" placeholder="Filter"></input>
          <div className="buttons-container-header">
            <SortUp className="sort-up-button" handleClick={()=>this.sortUp()}/>
            <SortDown className="sort-down-button" handleClick={()=>this.sortDown()}/>
          </div>
        </header>
        <div className="body">
          <ChatMaster messages={this.state.messages}/>
        </div>
        <footer>
          <div className="footer-top-component">
            <p className="logged-in-as"></p>
          </div>
          <div className="footer-bottom-component">
            <LogInButton handleClick={()=>this.signIn()}/>
            <LogOutButton handleClick={()=>this.signOut()}/>
            <input id="message-entry-field" type="text" placeholder="Message" onChange={this.handleInputChange.bind(this)} value={this.state.newMessage} onKeyPress={this.detectFieldContent.bind(this)} onBlur={this.detectFieldContent.bind(this)} hidden></input>
            <p id="character-counter-output">
              {this.state.newMessageLength}
            </p>
            <div className="buttons-container-footer">
              <SubmitMessage handleClick={()=>this.saveMessage()} isDisabled={this.state.submitButtonDisabled}/>
              <ClearInput handleClick={()=>this.clearInputField()} isDisabled={this.state.clearButtonDisabled}/>
            </div>
          </div>
        </footer>
      </div>
    )
  }

} //end of Application

class ChatMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredMssgs: []
    }

  } //end of constructor

  filterMessages(user){
    let newMssgs = this.props.messages.filter((message)=>{
      return message.user === user;
    });
    document.querySelector('.messages').textContent = '';
    this.setState({filteredMssgs: newMssgs});
  }

  showMessages(messages){ //the card for each message
    return(
      <div className="each-message-card">
        <p><span className="each-message-date">{messages.time}</span><span className="each-message-user-name">{messages.user}</span> <a href={"mailto:" + messages.email}>({messages.email})</a></p>
        <p className="each-message-body-text">{messages.body}</p><br/>
      </div>
    )
  }

  render () {
    const { messages, filterUser } = this.props;
    const users = messages.map(message => message.user);
    const uniqueUsers = _.uniq(users);
    return (
      <div>
        <div className="message-output-container">
          <ul>
            <li className="messages">{messages.map(this.showMessages)}</li>
            <li>{this.state.filteredMssgs.map(this.showMessages)}</li>
          </ul>
        </div>
        <div className="user-info-container">
          <h2>Users Present in the Chat Room:</h2>
          <p>
            {uniqueUsers.map(user =>
              <button className="users-present-button" onClick={() => this.filterMessages(user)}>{user}</button>
            )}
          </p>
        </div>

      </div> //end of main div
    );
  }
} //end of ChatMaster

module.exports = Application;
