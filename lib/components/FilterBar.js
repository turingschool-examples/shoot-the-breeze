import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

export default class FilterBar extends Component {
  render() {
    return(
      <div className="header">
        <p className="title">Shoot the Breeze</p>
        <input className="filter-bar" onChange={this.props.updateSearch} placeholder="Filter"></input>
      </div>
    )
  }
}
