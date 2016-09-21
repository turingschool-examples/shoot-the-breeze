import React, { Component } from 'react';
import Application from './Application';
import moment from 'moment';

class MessageList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ul className='message-list-ul'>
        { this.props.messages.map(m =>
              <li key={m.key}>
                <p>
                  <span className='time-stamp'>
                    {moment(m.createdAt).format("MMMM Do, h:mm a")}
                  </span>
                  <span className='first-name'>
                    {m.user.displayName.split(' ')[0]}
                  </span>
                </p>
                <p>
                  {m.content}
                </p>
              </li>
              )
        }
      </ul>
    )
  }
}

export default MessageList;
