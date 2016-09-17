import React, { Component } from 'react';

export default class ClearButton extends Component {
  render() {
    return (
      <section>
        <button
          className="clear-button"
          onClick={this.props.clear}
          disabled={!this.props.draftMessage}
        >
        Clear
        </button>
      </section>
    )
  }
}
