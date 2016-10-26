import React, { Component } from 'react'

export const SortButtons = props => {
  const { sortMsgChronologically, sortMsgReverseChronologically } = props
  return(
    <span className="up-down-button">
      <button className="sort-newest-user" onClick={sortMsgChronologically}>Sort ⬆</button>
      <button className="sort-oldest-user" onClick={sortMsgReverseChronologically}>Sort ⬇</button>
    </span>

  )
}
