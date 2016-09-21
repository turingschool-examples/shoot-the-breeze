import React, { Component } from 'react';
import Application from './Application';
import Message from './Message';
import moment from 'moment';
import { pick, map, extend } from 'lodash';
import firebase, { reference } from '../firebase';
import SortHeader from './SortHeader'

class MessageList extends Component {
  constructor(){
    super();
    this.state = {
      messages: null,
      order: 'chronological',
      activeMessages: null,
    }
  }

  putsMessagesInChronologicalOrder(messages) {
    const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);
    this.setState({ activeMessages: sortedMessages, order: 'chronological' });
  }

  putsMessagesInReverseChronologicalOrder(messages) {
    const sortedMessages = messages.sort((a, b) => b.createdAt - a.createdAt);
    this.setState({ activeMessages: sortedMessages,  order: 'reverse-chronological' });
  }

  filterMessagesByText(input) {
    const { messages } = this.state
    const result = messages.filter(function( message ) {
      return message.content.indexOf(input) != -1;
      });
    this.setState({ activeMessages: result })
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      })
      this.setState({
          activeMessages: map(messages, (val, key) => extend(val, { key }))
        });
    });
  }

  render() {
    const { messages, activeMessages } = this.state;
    const displayMessages = map(this.state.activeMessages, (message) => {return  <Message {...message}/>})
    return (
      <section>
        <SortHeader
          messages={messages}
          handleSortUp={() => this.putsMessagesInChronologicalOrder (activeMessages) }
          handleSortDown={() => this.putsMessagesInReverseChronologicalOrder (activeMessages) }
          handleFilterInput={(event) => this.filterMessagesByText(event.target.value)}/>
        <ul className='message-list-ul'>
          {displayMessages}
        </ul>
      </section>
    )
  }
}

export default MessageList;
