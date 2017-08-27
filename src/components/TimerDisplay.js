import React, { Component } from 'react'

export default class TimerDisplay extends Component {

  render() {
    return (
      <div className="timer">
        <h1>00 : 00 . 000</h1>
        <button className="toggle">Start</button>
        <button className="reset">Reset</button>
      </div>
    );
  }
}
