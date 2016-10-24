import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import Application from './Application.js';

class SortDown extends React.Component {
  constructor(props) {
    super(props);

  }//end of constructor

  render () {
    return (
      <button className="sort-down-button" onClick={this.props.handleClick}>Sort Down</button>
    );
  }
} //end of SubmitMessage

module.exports = SortDown;
