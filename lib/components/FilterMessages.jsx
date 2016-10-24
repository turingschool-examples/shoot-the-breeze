import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend, filter } from 'lodash';
import moment from 'moment';
var _ = require('lodash');

export default class FilterMessages extends Component {
  render(){
    const {onFilterChange} = this.props;

    return (
      <div className = "filter-bar">
        <span className = 'title'>Shoot the Breeze</span>
        <input id = "filter-input"
          placeholder="Filter"
          onChange={onFilterChange}
        />
      </div>
    );
  }
}
