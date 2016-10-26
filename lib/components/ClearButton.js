import React, { Component } from 'react'

export const ClearButton = ({ clearMessage, draftMessage }) => {
  return(
    <button
      className="clear-button"
      onClick={clearMessage}
      disabled={!draftMessage}
    >Clear
    </button>
  )
}
