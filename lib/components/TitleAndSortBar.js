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
      <div>
        <p className="title">Shoot the Breeze</p>
        <input className="filter-bar" placeholder="Filter"></input>
        <button className="sort-newest-user">Sort UP</button>
        <button className="sort-oldest-user">Sort DOWN</button>
      </div>
    )
  }
}
