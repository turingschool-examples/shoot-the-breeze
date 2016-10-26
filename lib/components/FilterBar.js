import React from 'react'

export const FilterBar = ({ updateSearch }) => {
  return(
      <div className="header">
        <p className="title">
          Shoot the Breeze
        </p>
        <input
          className="filter-bar"
          onChange={updateSearch}
          placeholder="Filter">
        </input>
      </div>
    )
  }
