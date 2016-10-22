import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import Application from './Application.js';

class SortUp extends React.Component {
  constructor(props) {
    super(props);

  }//end of constructor

  render () {
    return (
      <button className="sort-up-button" onClick={this.props.handleClick}>Sort Up</button>
    );
  }
} //end of SubmitMessage

module.exports = SortUp;
