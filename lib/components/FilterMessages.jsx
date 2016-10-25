import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend, filter } from 'lodash';
import moment from 'moment';
var _ = require('lodash');

export default class FilterMessages extends Component {
  render(){
    const {onFilterChange, sortMessages} = this.props;

    return (
      <div className = "filter-bar">
        <span className = 'title'>
          Shoot the Breeze
        </span>

        <input id = "filter-input"
          placeholder="Filter"
          onChange={(e) =>{onFilterChange(e.target.value)}}
        />

        <span>
          <button className='sort-btn'
            id='up-btn'
            onClick={sortMessages}>
            Sort &uarr;
          </button>

          <button className='sort-btn'
            id='down-btn'
            onClick={sortMessages}>
            Sort &darr;
          </button>
        </span>
      </div>
    );
  }
}
