import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

const InputForm = ({draftedMessage, onDraftedMessageChange, onMessageSubmit})=>{
  return (
    <div>
      <input
        placeholder="Message…"
        value={draftedMessage}
        onChange={onDraftedMessageChange}
      />
      <button onClick={onMessageSubmit}>Add New Message</button>

    </div>
  );
}

module.exports = InputForm;
