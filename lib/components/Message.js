import React from 'react';
import firebase, { database, auth } from '../firebase';
import MessageList from './MessageList';
import moment from 'moment'

class Message extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    let time = this.props.createdAt;
    let realTime = moment(time).format("DD MMM YYYY hh:mm a")
    return(
      <li key={this.props.key}>
        <p>
          <span className='short-date time-stamp'>
            {moment(this.props.createdAt).format("M/D, h:mm a")}
          </span>

          <span className='long-date time-stamp'>
            {moment(this.props.createdAt).format("MMMM Do, h:mm a")}
          </span>

          <span className='first-name'>
            {this.props.user.displayName.split(' ')[0]}
          </span>
        </p>
        <p>
          {this.props.content}
        </p>
      </li>
    )
  }
}

export default Message;
