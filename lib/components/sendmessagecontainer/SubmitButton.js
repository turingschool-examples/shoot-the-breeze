import React, { Component } from 'react';

export default class SubmitButton extends Component {

  render() {
    return (
      <section>
        <button
          className="submit-button"
          onClick={() => this.props.submit() }
        >
          Submit
        </button>
      </section>
    )
  }
}
