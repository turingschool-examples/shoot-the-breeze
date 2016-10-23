import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import moment from 'moment';

export default class FilterMessages extends Component {
  FilterMessages(filteredMessage){
    if(filteredMessage.length > 0){
      return this
    }
  }

  render(){
    const {filteredMessage} = this.props;

    return (
      <div className = "filter-bar">
        <span>Shoot the Breeze</span>
        <input id = "filter-input"
          type = 'text'
          placeholder="Filter"
          onChange={(e) => {
            FilterMessages(e.target.value)}
          }
        />
      </div>
    );
  }
}
