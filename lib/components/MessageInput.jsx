import React, { Component } from 'react';
import { reference } from '../firebase';


export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      characterCount: 140,
    };
  }

  characterCountDown() {
    const characterRemaining = 140 - this.state.message.length;
    return this.setState({ characterCount: characterRemaining }) ;
  }

  createMessage(e) {
    e.preventDefault();

    const { message } = this.state;
    const user = this.props.user;

    reference.push({
      user: user.displayName,
      content: message,
      createdAt: Date.now()
    });
    this.setState({ message: '' });
  }

  render() {
    return (
      <form className="footer" onSubmit={(e) => this.createMessage(e)}>
        <input
          className='footer-message-input'
          type='text'
          maxLength='140'
          placeholder='Message'
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
          onKeyUp={() => this.characterCountDown()}
        />
        <p className='character-count'>{this.state.characterCount}</p>
        <input
          type='button'
          value='Clear'
          className='footer-clear-button'
          onClick={() => this.setState({ message: '' })}
        />
        <input
          type='submit'
          value='Submit'
          className='footer-submit-button'
        />
      </form>
    );
  }
}
