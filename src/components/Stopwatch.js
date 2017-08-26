import React, { Component } from 'react'
import TimerDisplay from './TimerDisplay'

let seconds = 0, minutes = 0, hours = 0;

export default class Stopwatch extends Component {
  constructor(){
    super();

    this.state = {
      isRunning: false,
      lapTimes: [],
      timeElapsed: 0
    }

    this.initialState = this.state
  }

  // toggle so when click start, button shows stop
  toggle = () => {
    this.setState({ isRunning: !this.state.isRunning}, () => {
      this.state.isRunning ? this.startTimer() : clearInterval()
    });
  }

  count = () => {
    console.log("inside count")
    // how can i actually manipulate timer display ??
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
      }
    }

  startTimer = () => {
    console.log("in start")
    this.setState({ isRunning: true })
    this.count()
    // call function that starts timer
  }

  stop = () => {
    console.log("in stop")
  }

  lap = () => {
    console.log("in lap")
  }

  reset = () => {
    console.log("in reset")
    clearInterval()
    this.setState( this.initialState )
  }

  render(){
    return(
      <div className="timer">
        <TimerDisplay timeElapsed={this.state.timeElapsed}/>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.lap}>Lap</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}
