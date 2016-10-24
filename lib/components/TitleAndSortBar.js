import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

export default class TitleAndSortBar extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <div className="header">
        <p className="title">Shoot the Breeze</p>
        <input className="filter-bar" onChange={(e) => this.props.createNewSearch(e.target.value.toLowerCase()) } placeholder="Filter"></input>
        <span className="up-down-button">
        <button className="sort-newest-user">New</button>
        <button className="sort-oldest-user">Old</button></span>
      </div>
    )
  }
}
