import React, { Component } from 'react'
import Stopwatch from './Stopwatch'

export default class StopwatchContainer extends Component {

  render(){
    return(
      <div>
        <h2>Stopwatch Container</h2>
        <Stopwatch />
      </div>
    )
  }
}
