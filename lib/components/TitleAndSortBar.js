import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase'
import { pick, map, extend } from 'lodash'

export default class TitleAndSortBar extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
  }
  // updateSearch(e) {
  //   this.setState({ search: e.target.value })
  // }
  // createSearch(e) {
  //   e.preventDefault()
  //   this.props.addNewMessage(this.state.draftMessage)
  //   this.setState({ draftMessage: '' })
  // }
  //  searchValue={this.state.search}
  render() {
    return(
      <div className="header">
        <p className="title">Shoot the Breeze</p>
        <span className="up-down-button">
        <input className="filter-bar" onChange={(e) => this.setState({ search: e.target.value }) } placeholder="Filter"></input>
        <button className="sort-newest-user">Sort UP</button>
        <button className="sort-oldest-user">Sort DOWN</button></span>
      </div>
    )
  }
}


// search: function(searchInput) {
//     if (searchInput !== "") {
//       $('.task-list').find('article:not(:contains('+ searchInput + '))').slideUp();
//       $('.task-list').find('article:contains(' + searchInput + ')').slideDown();
//     } else {
//       $('.task-list').find('article').slideDown();
//     }
//   },
//
//   filterByImportance: function(specificButton) {
//     $('.task-list').find('article:not(:contains('+ specificButton + '))').slideUp();
//     $('.task-list').find('article:contains(' + specificButton + ')').slideDown();
//   },
//
//   filterAll: function() {
//     $('.task-list').find('article').slideDown();
//   },
