import React, { Component } from 'react';
import Message from './Message.js';
import { pick, map, extend } from 'lodash';


export default class MessageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      user: this.props.user
    };
  }

  componentWillMount() {
    this.props.reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      });
    });
  }

  renderMessages() {
    return this.state.messages.map(m => {
      return (
        <div key={m.key}>
          <Message m={m} />
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <ul className="message-container">
          {this.renderMessages()}
        </ul>
        <NavBar message={this.state.messages} />
      </div>
    )
  }
}
