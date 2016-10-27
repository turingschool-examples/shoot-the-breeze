import React from 'react'

export const SortButtons = ({ sortDown, sortUp }) => {
  return(
    <span className="sort-buttons">
      <button
        className='sort-down'
        onClick={() => sortDown}
      >Sort ⬇
      </button>
      <button
        className='sort-up'
        onClick={() => sortUp}
      >Sort ⬆
      </button>
    </span>
  )
}

// { classDown, classUp, sortDown, sortUp, sortDownText, sortUpText }
