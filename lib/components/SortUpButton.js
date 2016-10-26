import React, { Component } from 'react'

export const SortUpButton = ({ sortMsgReverseChronologically }) => {
  return(
    <span className="sort-buttons">
      <button className="sort-up" onClick={sortMsgReverseChronologically}>Sort ⬆</button>
    </span>
  )
}
