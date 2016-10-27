import React from 'react'

export const SortUpButton = ({ sorter, css, text }) => {
  return(
    <span className="sort-buttons">
      <button className={css} onClick={sorter}>{text}</button>
    </span>
  )
}
