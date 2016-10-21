import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

const DisplayMessages = ({messages})=>{
    return(
      <ul>
        {messages.map(m =>{
          return (
            <li className='single-message' key={m.key}>
              <span className = 'timestamp'>{m.createdAt}</span>
              <span className = 'username'>{m.user.displayName}</span>
              <br/>
              <span className= 'message-content'>{m.content}</span>
            </li>
          );
        })
      }
      </ul>
    );
  }

module.exports = DisplayMessages;
