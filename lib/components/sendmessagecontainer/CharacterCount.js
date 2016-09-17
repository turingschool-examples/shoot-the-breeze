import React, { Component } from 'react';

export default class CharacterCount extends Component {
  render() {
    return (
      <section>
        <h2 className="character-count">
          {140 - this.props.draftMessage.length}
        </h2>
      </section>
    )
  }
}
