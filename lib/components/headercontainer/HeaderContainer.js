import React, { Component } from 'react';
import Search from './Search.js';
import Sort from './Sort.js';

export default class HeaderContainer extends Component {
  render() {
    return (
      <header>
        <h1>Shoot the Breeze</h1>
        <Search />
        <Sort />
      </header>
    )
  }
}
