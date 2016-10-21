import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import { moment} from 'moment';

export default class InputForm extends Component {
  toggleSubmitBtn(draftedMessage) {
    if(draftedMessage.length > 0 && draftedMessage.length <= 140){
      return false;
    }else{
      return true;
    }
  }

  render(){
    const {draftedMessage, onDraftedMessageChange, onMessageSubmit, clearField, } = this.props;

    const disabled = this.toggleSubmitBtn(draftedMessage);
    console.log(disabled);

    return (
      <div className = "input-bar">
        <input id = "message-input"
          placeholder="Message"
          value={draftedMessage}
          onChange={onDraftedMessageChange}
        />

        <div>{140 - draftedMessage.length}</div>

        <button className= 'submit-btn'
         disabled={disabled}
         onClick={onMessageSubmit}>Submit</button>

        { draftedMessage ? <button className = 'clear-btn'
          onClick = {clearField}> Clear </button> : document.getElementsByClassName('clear-btn').disabled = true}
      </div>
    );
  }
}
