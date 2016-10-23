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
      user: '',
      submitButtonDisabled: true,
      clearButtonDisabled: true,
      userFilter: '',
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
    reference.limitToLast(25).on('value', (snapshot) =>  {
      var messagesReturned = this.returnArray(snapshot.val());
      this.setState({
        messages: messagesReturned,
      });
    }); //end of snapshot function
  } //end of loadMessages

  onAuthStateChanged(user){
    if (user) {
      let profilePicUrl = user.photoURL;
      let userName = user.displayName;
      let email = user.email;
      let logInButton = document.querySelector('.login-button');
      let logOutButton = document.querySelector('.logout-button');
      let loggedInAs = document.querySelector('.logged-in-as');
      logOutButton.removeAttribute('hidden');
      logInButton.setAttribute('hidden', 'true');
      // loggedInAs.textContent = "Logged in as " + userName + " " + "(" + email + ")";
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
      const newMsgObj = {
        user: currentUser.displayName,
        body: body,
        photo: currentUser.photoURL,
        email: currentUser.email,
        time: moment().format("MMMM D, h:mm a "),
        id: Date.now(),
      };
      reference.push(newMsgObj);
      this.setState({
        newMessage: '',
      });
      this.setStateToUser(currentUser);
      this.disableButtons();
      this.loadMessages();
    } //end of if statement
  } //end of saveMessage

  setStateToUser(currentUser){
    this.setState({
      user: currentUser.displayName
    });
  }

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

  filterUserMessages(user){
    // let array = this.state.messages;
    // let filteredUserMessages =_.filter(array, function(message) {
    //     return message.user === this.state.filteredUser;
    //   });
    // modify this.state to add a filter to the messages array
    console.log(user);
    this.setState(filterUser: user);
    // Rendering messages needs to filter messages based on this.state.filterUser.
    // If this.state.filterUser is the empty string, show all messages. Otherwise,
    // show only the messages for the filtered user
    //find messages based on user that was clicked
    //assign those messages to a new variable
    //display the messages from the user
  }

  render(){
    return (
      <div onLoad={this.initFirebase()}>
        <header>
          <h2 id="page-main-title">Shoot the Breeze</h2>
          <input id="filter-input-field" type="text" defaultValue="Filter"></input>
          <div className="buttons-container">
            <SortUp className="sort-up-button" handleClick={()=>this.sortUp()}/>
            <SortDown className="sort-down-button" handleClick={()=>this.sortDown()}/>
          </div>
        </header>
        <div className="body">
          <ChatMaster messages={this.state.messages}/>
        </div>
        <footer>
          <p className="logged-in-as">Logged in as {this.state.user}</p>
          <LogInButton handleClick={()=>this.signIn()}/>
          <LogOutButton handleClick={()=>this.signOut()}/>
          <input id="message-entry-field" type="text" placeholder="Message" onChange={this.handleInputChange.bind(this)} value={this.state.newMessage} onKeyPress={this.detectFieldContent.bind(this)} onBlur={this.detectFieldContent.bind(this)}></input>
          <p id="character-counter-output">
          {this.state.newMessage.length}
          </p>
          <SubmitMessage handleClick={()=>this.saveMessage()} isDisabled={this.state.submitButtonDisabled}/>
          <ClearInput handleClick={()=>this.clearInputField()} isDisabled={this.state.clearButtonDisabled}/>
        </footer>
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
            <li>{messages.map(this.showMessages)}</li>
          </ul>
        </div>
        <div className="user-info-container">
          <h2>Users Present in the Chat Room:</h2>
          <p>
            {uniqueUsers.map(user =>
              <button onClick={() => filterUser(user)}>{user}</button>
            )}
          </p>
        </div>

      </div> //end of main div
    );
  }
} //end of ChatMaster

module.exports = Application;
