import React, { Component } from 'react'

export default class WorkoutDetail extends Component {

  // need to be fed single
  render(){
    console.log("in workout detail", this.props)


    return(
      <div>
        {/* <p>{this.props.movements.name}</p>
        <p>{this.props.description}</p>
        <p>{this.props.secondsPer}</p>
        <p>{this.props.skill}</p>
        <p>{this.props.loads}</p> */}
      </div>
    )
  }
}
