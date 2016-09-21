import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import ActionButton from './ActionButton';

class SortHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;
    return (
      <section className="InputBlocks">

        <span className="app-title">Shoot the Breeze</span>
        <input
          className="filter-input-field"
          placeholder="Filter"
          onChange={(event) => {this.props.handleFilterInput(event)}}
          />
        <section className="button-group">

          <button
            onClick={() => this.props.handleSortUp()}
            className="sort-button sort-up">
            Sort Up
          </button>

          <button
            onClick={() => this.props.handleSortDown()}
            className="sort-button sort-down">
            Sort Do
          </button>

        </section>
      </section>
    )
  }
}

export default SortHeader;


          // handleClick= { () => this.sortAsending() }
            // handleClick= { () => this.sortDesending() }
