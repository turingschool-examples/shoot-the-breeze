import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

const InputForm = ({draftedMessage, onDraftedMessageChange, onMessageSubmit})=>{
  return (
    <div className = "input-bar">
      <input id = "message-input"
        placeholder="Message"
        value={draftedMessage}
        onChange={onDraftedMessageChange}
      />
      <button className= 'submit-btn'
        onClick={onMessageSubmit}>
        Submit
      </button>
      <button className = 'clear-btn'>
        {/* {onClick = {document.getElementById('message-input').value = ''}> */}
        Clear
      </button>
    </div>
  );
}

module.exports = InputForm;
