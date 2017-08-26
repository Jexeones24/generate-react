import React, { Component } from 'react'

// width = digits in each span
// n = time
const leftPad = (width, n) => {
  // if time is greater than 2, return time
  if ((n + '').length > width) {
	  return n;
  }

  const padding = new Array(width).join('0');
  return (padding + n).slice(-width);
};

export default class TimerDisplay extends Component {

  getUnits = () => {
    const seconds = this.props.timeElapsed / 1000;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 1).toFixed(3).substring(2)
    };
  }

  render() {
    const units = this.getUnits();
    return (
      <div id={this.props.id}>
        <span>{leftPad(2, units.min)}:</span>
        <span>{leftPad(2, units.sec)}.</span>
        <span>{units.msec}</span>
      </div>
    );
  }
}
