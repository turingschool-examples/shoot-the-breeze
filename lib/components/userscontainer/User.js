import React, { Component } from 'react';

export default class User extends Component {
  render() {
    return (
      <article className="users-container-user">
        <h2>
          Blake
          <span>(blakeworsley@gmail.com)</span>
        </h2>
        <div className="active"></div>
      </article>
    )
  }
}
