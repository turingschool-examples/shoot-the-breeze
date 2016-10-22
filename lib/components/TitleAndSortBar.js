import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

export default class TitleAndSortBar extends Component {
  constructor() {
    super()
    this.state = {
      filter: [],
    }
  }
  render() {
    return(
      <div className="header">
        <p className="title">Shoot the Breeze</p>
        <span className="up-down-button">
        <input className="filter-bar" placeholder="Filter"></input>
        <button className="sort-newest-user">Sort UP</button>
        <button className="sort-oldest-user">Sort DOWN</button></span>
      </div>
    )
  }
}
