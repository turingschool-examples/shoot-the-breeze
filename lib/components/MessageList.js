import React, { Component } from 'react';
import Application from './Application';
import moment from 'moment';

class MessageList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ul>
        { this.props.messages.map(m => <li key={m.key}>{m.user.displayName}: {m.content} {moment(m.createdAt).format("MMMM Do, h:mm a")}</li>) }
      </ul>
    )
  }
}

export default MessageList;
