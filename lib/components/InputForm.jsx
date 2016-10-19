import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

const InputForm = ({draftedMessage, onDraftedMessageChange})=>{
  return (<div>
    <input
      placeholder="Message…"
      value={draftedMessage}
      onChange={onDraftedMessageChange}
    />
    </div>
  );
}

module.exports = InputForm;
