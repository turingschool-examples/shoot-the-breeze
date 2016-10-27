import React from 'react'

export const SortDownButton = ({ sortMsgChronologically }) => {
  return(
    <span className="sort-buttons">
      <button className="sort-down" onClick={sortMsgChronologically}>Sort ⬇</button>
    </span>
  )
}
