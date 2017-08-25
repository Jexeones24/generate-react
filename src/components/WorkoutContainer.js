import React, { Component } from 'react'
import NewWorkout from './NewWorkout'
import WorkoutDetail from './WorkoutDetail'

export default class WorkoutContainer extends Component {
  constructor(){
    super();

    this.state = {
      timeDomain: '' // get this from form input
    }
  }

  // chooses randomly from array
  getOption = (options) => {
     return options[Math.floor(Math.random() * options.length)]
  }

  // chooses workout style 
  chooseStyle = (timeDomain) => {
    let style = null;
    const lowVol = ["As Many Rounds As Possible In", "Every Minute On The Minute","3 Rounds For Time"]
    const medVol = ["As Many Rounds As Possible In", "Every 2 Minutes On The Minute", "4 Rounds For Time"]
    const hiVol = ["Every 3 Minutes On The Minute", "5 Rounds For time"]

    if(timeDomain >= 5 || timeDomain <= 10){
      return style = this.getOption(lowVol)
    } else if (timeDomain >= 9 || timeDomain <= 19){
      return style = this.getOption(medVol)
    } else {
      return style = this.getOption(hiVol)
      }
    }


  assignReps = () => {

  }

  numberOfMovements = () => {

  }

  chooseMovements = () => {

  }


  render(){
    console.log("in workout container", this.props)
    return(
      <div>
        <h1>Workout Container</h1>
        <div className="ui grid">
          <div className="eight wide column">
            <NewWorkout names={this.props.names} movements={this.props.movements}/>
          </div>
        </div>
        <div className="ui grid">
          <div className="eight wide column">
            <WorkoutDetail movements={this.props.movements}/>
          </div>
        </div>
      </div>
    )
  }
}
