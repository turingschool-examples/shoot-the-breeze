import React, { Component } from 'react'

export const SubmitButton = ({ createMessage, buttonToggle }) => {
  return(
    <button
      className="submit-button"
      type="submit"
      onClick={createMessage}
      disabled={buttonToggle}
    >Submit
    </button>
  )
}
