import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

const InputForm = ({draftedMessage, onDraftedMessageChange})=>{
  return (
    <input
      placeholder="Message…"
      value={draftedMessage}
      onChange={onDraftedMessageChange}
    />
  );
}

module.exports = InputForm;
