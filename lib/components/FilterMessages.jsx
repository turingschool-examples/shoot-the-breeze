import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';

export default class FilterMessages extends Component {
  constructor(){
    super();
    this.state ={
      filteredMessage: []
    };
  }

  UpdateFilteredState(user){
    this.setState(
      {filteredMessage: filter(this.state.messages, (message) => {
        return message.user.displayName.includes(user);
      })}
    );
  }

  FilterMessages(filteredMessage){
    if(filteredMessage.length > 0){
      return this
    }
  }

  render(){
    const {filteredMessage} = this.props;

    return (
      <div className = "filter-bar">
        <span className = 'title'>Shoot the Breeze</span>
        <input id = "filter-input"
          placeholder="Filter"
          onChange={(e) => {
            FilterMessages(e.target.value)}
          }
        />
      </div>
    );
  }
}
