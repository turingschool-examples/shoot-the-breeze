import React, { Component } from 'react'

export const SortUpButton = ({ sortMsgChronologically }) => {
  return(
    <span className="up-down-button">
      <button className="sort-newest-user" onClick={sortMsgChronologically}>Sort ⬆</button>
    </span>
  )
}
