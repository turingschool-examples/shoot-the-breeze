import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';

export default class InputForm extends Component {
  toggleSubmitBtn(draftedMessage) {
    if(draftedMessage.length > 0 && draftedMessage.length <= 140){
      return false;
    }else{
      return true;
    }
  }
    toggleClearBtn(draftedMessage){
      if(draftedMessage.length > 0){
        return false;
      }else{
        return true;
      }
    }

  render(){
    const {draftedMessage, onDraftedMessageChange, onMessageSubmit, clearField} = this.props;

    const disabledSubmit = this.toggleSubmitBtn(draftedMessage);
    const disabledClear = this.toggleClearBtn(draftedMessage);


    return (
      <div className = "input-bar">
        <input id = "message-input"
          placeholder="Message"
          value={draftedMessage}
          onChange={onDraftedMessageChange}
        />

        <div>{140 - draftedMessage.length}</div>

        <button
          className= 'submit-btn'
          disabled={disabledSubmit}
          onClick={onMessageSubmit}>Submit</button>

        <button
          className = 'clear-btn'
          disabled={disabledClear}
          onClick = {clearField}>Clear</button>
      </div>
    );
  }
}
