import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import ActionButton from './ActionButton';

class Header extends Component {
  constructor(props) {
    super(props);
      this.state = {
        filterField: '',
      };
  }

  render() {
    return (
      <section className="InputBlocks">

        <span class="app-title">Shoot the Breeze</span>
        <input
          className="filter-input-field"
          placeholder="Filter"
          value={this.state.filterField}
          onChange={(event) => this.setState({ filterField: event.target.value })}
          />
        <section className="button-group">

          <ActionButton
            className="sort-button"
            text="Sort Up"
          />
          <ActionButton
            className="sort-button"
            text="Sort Do"
          />

        </section>
      </section>
    )
  }
}

export default Header;


          // handleClick= { () => this.sortAsending() }
            // handleClick= { () => this.sortDesending() }
