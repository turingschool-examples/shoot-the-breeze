import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import { moment} from 'moment';

const InputForm = ({draftedMessage, onDraftedMessageChange, onMessageSubmit, clearField})=>{
  return (
    <div className = "input-bar">
      <input id = "message-input"
        placeholder="Message"
        value={draftedMessage}
        onChange={onDraftedMessageChange}
      />
      { draftedMessage ? <button className= 'submit-btn'
        onClick={onMessageSubmit}>Submit</button> : document.getElementsByClassName("submit-btn").disabled = true }
      { draftedMessage ? <button className = 'clear-btn'
        onClick = {clearField}> Clear </button> : document.getElementsByClassName('clear-btn').disabled = true}

    </div>
  )
}

module.exports = InputForm;
