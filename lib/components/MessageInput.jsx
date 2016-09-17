import React, { Component } from 'react';
import { reference } from '../firebase';


export default class MessageInput extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      characterCount: 140,
    };
  }

  characterCountDown() {
    this.setState({ characterCount: (this.state.characterCount - this.state.message.val()) });
  }

  createMessage(e) {
    e.preventDefault();

    const { message } = this.state;

    reference.push({ message });
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
