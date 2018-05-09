import React, {Component} from 'react'
import {render} from 'react-dom'
import Logo from '../../src/Logo'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-3d-logo Demo</h1>
      <Logo/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
