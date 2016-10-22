import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import { moment} from 'moment';

export default class FilterMessages extends Component {

  render(){
    return (
      <div className = "filter-bar">
        <span>Shoot the Breeze</span>
        <input id = "filter-input"
          placeholder="Filter"
        />
      </div>

    );
  }
}
