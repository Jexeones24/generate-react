import React, { Component } from 'react'
import TimerDisplay from './TimerDisplay'
import { Button } from 'semantic-ui-react'

let seconds = 0, minutes = 0, hours = 0;

export default class Stopwatch extends Component {
  constructor(){
    super();

    this.state = {
      isRunning: false,
      time: 0,
      interval: null,
      offset: 0, // time passed
    }
  }

  // adding time passed to time
  update = () => {
    let time = this.state.time
    this.setState({ time: time + this.delta()})
    let formattedTime = this.timeFormatter(time)
    console.log(this.timeFormatter())
  }

  // represents time passed
  delta = () => {
    let now = Date.now();
    let timePassed = now - this.state.offset
    this.setState({ offset: now })
    return timePassed
  }

  timeFormatter = (timeInMillisecs) => {
    let time = new Date(timeInMillisecs);
    let mins = time.getMinutes().toString();
    let secs = time.getSeconds().toString();
    let millisecs = time.getMilliseconds().toString();

    if(mins.length < 2){
      mins = '0' + mins;
    }

    if(secs.length < 2){
      secs = '0' + secs;
    }

    while(millisecs.length < 3){
      millisecs = '0' + millisecs
    }

    return mins + ' : ' + secs + ' . ' + millisecs
  }

  // if length is less than 2, add 0 in front, else will look like:
    // 0 : 1 : 234
    // want: 00 : 01 : 234

  start = () => {
    // debugger
    if(!this.state.isRunning) {
      this.setState({ interval: setInterval(this.update, 10),
      offset: Date.now(),
      isRunning: true
      })
    }
  }

  stop = () => {
    if(this.state.isRunning) {
      clearInterval(this.state.interval)
      this.setState({
        interval: null,
        isRunning: false
      })
    }
  }

  reset = () => {
    this.setState({ time: 0})
  }

  toggle = () => {
    if(this.state.isRunning){
      this.stop();
    } else {
      this.start();
    }
  }

  render(){
    return(
      <div className="timer">
        <h1>{this.timeFormatter(this.state.time)}</h1>
        <Button primary className="toggle" onClick={this.toggle}>{this.state.isRunning ? "Pause" : "Start"}</Button>
        <Button secondary className="reset" onClick={this.reset}>Reset</Button>
        <Button color='green'>Save</Button>
      </div>
    )
  }
}
