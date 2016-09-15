import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  render () {
    return (
      <p className="hello-world">Hello World</p>
    )
  }
}

render(<App />, document.getElementById('application'))
