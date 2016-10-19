import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

const DisplayMessages = ({messages})=>{
    return(
      <ul>
        {messages.map(m =>{
          return (
            <li key={m.key}>
              {m.user.displayName}: {m.content}
            </li>
          );
        })
      }
      </ul>
    );
  }

module.exports = DisplayMessages;
