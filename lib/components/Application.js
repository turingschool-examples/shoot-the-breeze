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
      currentUser: '',
      submitButtonDisabled: true,
      clearButtonDisabled: true,
      search: '',
      filteredMessages: []
    };

  } //end of constructor

  //core built-in functions

  componentDidMount(){
    this.loadMessages();
    //populate filteredMessages on load

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

  hideClearMessageButton(){
    document.querySelector('.clear-message-button').setAttribute('hidden', 'true');
  }

  hideLogInButton(){
    document.querySelector('.login-button').setAttribute('hidden', 'true');
  }

  hideLogOutButton(){
    document.querySelector('.logout-button').setAttribute('hidden', 'true');
  }

  hideMessageEntryField(){
    document.getElementById('message-entry-field').setAttribute('hidden', 'true');
  }

  hideSubmitMessageButton(){
    document.querySelector('.submit-message-button').setAttribute('hidden', 'true');
  }

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
    reference.limitToLast(25).on('value', (snapshot) =>  {
      let messagesReturned = this.returnArray(snapshot.val());
      this.setState({ //change to setMessageStateToFirebaseData
          // that.setMessageStateToFirebaseData(messagesReturned);
        filteredMessages: messagesReturned,
        messages: messagesReturned
      });
    }); //end of snapshot function
  } //end of loadMessages

  makeNewMessageTheInputValue(e){
    this.setState({newMessage: e.target.value});
  }

  onAuthStateChanged(user){

    const items = {
      email: user.email,
      loggedInAs: document.querySelector('.logged-in-as'),
      userName: user.displayName
    };

    if (user) {
      //user is logged in
      this.showLoggedInUser(items.loggedInAs,   items.userName,items.email);
      this.showClearMessageButton();
      this.showLogOutButton();
      this.showMessageEntryField();
      this.showSubmitMessageButton();
      this.hideLogInButton();
    }

    else {
      //user is not logged in
      this.hideClearMessageButton();
      this.hideLogOutButton();
      this.showLogInButton();
      this.hideMessageEntryField();
      this.hideSubmitMessageButton();
    }

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
      let fullArray = Object.keys(snapshots).map((each)=>{
        array.push(snapshots[each]);
      });
    }
    return array;
  } //end of returnArray

  saveMessage(){
    let messageExists = this.state.newMessageLength > 0;
    let messageIsNotTooLong = this.state.newMessageLength < 140;
    let userIsSignedIn = this.isUserSignedIn();
    if ( messageExists && messageIsNotTooLong && userIsSignedIn) {
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

  showClearMessageButton(){
    document.querySelector('.clear-message-button').removeAttribute('hidden');
  }

  showLoggedInUser(loggedInAs, userName, email){
      loggedInAs.textContent = "Logged in as " + userName + " (" + email + ")" + ".";
  }

  showLogInButton(){
    document.querySelector('.login-button').removeAttribute('hidden');
  }

  showLogOutButton(){
    document.querySelector('.logout-button').removeAttribute('hidden');
  }

  showMessageEntryField(){
    document.getElementById('message-entry-field').removeAttribute('hidden');
  }

  showSubmitMessageButton(){
    document.querySelector('.submit-message-button').removeAttribute('hidden');
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

  updateSearch(event) {
    let searchValue = {search: event.target.value.substr(0, 20)};
    this.setState(searchValue);
    console.log('search ', searchValue);
    this.findMatchingMessages(searchValue);
  }

  findMatchingMessages(searchThing) {
    let result = this.state.messages.filter(
        (message) => {
          return message.body.indexOf(searchThing.search) !== -1;
        }
    );
    this.setState({filteredMessages: result});
  }
//testing: shallow wrapper set a state, click button, then make assertions
  render(){
    let filteredMessages = this.props.messages;
    return (
      <div onLoad={this.initFirebase()}>
        <header>
          <h2 id="page-main-title">Shoot the Breeze</h2>
          <input id="filter-input-field"
                 type="text"
                 placeholder="Filter"
                 value={this.state.search}
                 onChange={this.updateSearch.bind(this)} />
          <div className="buttons-container-header">

            <SortUp className="sort-up-button" handleClick={()=>this.sortUp()}/>
            <SortDown className="sort-down-button" handleClick={()=>this.sortDown()}/>
          </div>
        </header>
        <div className="body">
          <ChatMaster messages={this.state.filteredMessages}/>
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
