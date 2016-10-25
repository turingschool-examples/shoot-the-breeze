import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

export default class DisplayMessages extends Component {

  render(){
    const {messages} = this.props;

    return(
      <ul className='message-field'>
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
}
