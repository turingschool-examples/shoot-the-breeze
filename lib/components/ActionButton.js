import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MessageInput from './MessageInput';

class ActionButton extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <button
        onClick={ () => this.props.handleClick() }>
          {this.props.text}
      </button>
    )
  }
}

module.exports = ActionButton;
