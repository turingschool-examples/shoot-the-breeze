import React, { Component } from 'react'

export const SortDownButton = ({ sortMsgReverseChronologically }) => {
  return(
    <span className="up-down-button">
      <button className="sort-oldest-user" onClick={sortMsgReverseChronologically}>Sort ⬇</button>
    </span>
  )
}
