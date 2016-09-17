import React, { Component } from 'react';

export default class SubmitButton extends Component {

  render() {
    return (
      <section>
        <button
          className="submit-button"
          onClick={() => this.props.submit() }
          disabled={!this.props.draftMessage || this.props.draftMessage.length >= 140}
        >
          Submit
        </button>
      </section>
    )
  }
}
