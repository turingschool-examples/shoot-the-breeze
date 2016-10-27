import React from 'react'

import { SortButtons } from './SortButtons.js'

export const FilterBar = ({ updateSearch, sortDown, sortUp }) => {
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
      <SortButtons
        sortDown={sortDown}
        sortUp={sortUp}
      />
    </div>
  )
}
