import React, { Component } from 'react'

export default class NewWorkoutDisplay extends Component {
  constructor(){
    super();

    this.state = {
      value: ""
    }
  }

  handleClick = (e) => {
    this.props.video(e)
  }

  render(){
    let movements = this.props.chosenMovements.map((m) => m.name)
    let newArr = this.props.repsPer.map((rep, i) => [rep, movements[i]])
    
    return(
      <div className="workout-display">
        <h1 className="workout-title">{this.props.workoutName}</h1>
        { (this.props.workoutStyle === "As Many Rounds As Possible In") || (this.props.workoutStyle === "Every Minute On The Minute For") ? <h3>{this.props.workoutStyle} {this.props.timeDomain} Minutes</h3> : <h2>{this.props.workoutStyle}</h2>}
        {newArr.map((m, i) => <a key={i} onClick={this.handleClick.bind(this, m)}><h4>{m.join(' ')}</h4></a>)}
      </div>
    )
  }
}
