import React, { Component } from 'react'
import NewWorkoutDisplay from './NewWorkoutDisplay'
import WorkoutDetail from './WorkoutDetail'

export default class WorkoutContainer extends Component {
  constructor(){
    super();

    this.state = {
      timeDomain: 5
    }
  }

  handleChange = (e) => {
    let timeDomain = e.target.value
    this.setState({ timeDomain })
    let workoutStyle = this.chooseStyle()
    console.log("workout style", workoutStyle)
    let numberOfMovements = this.numberOfMovements(workoutStyle)
    console.log("number of movements", numberOfMovements)
    let chosenMovements = this.chooseMovements(numberOfMovements)
    console.log("chosen movements", chosenMovements)
    this.assignReps()
  }

  // chooses randomly from array
  getOption = (optionsArr) => {
     return optionsArr[Math.floor(Math.random() * optionsArr.length)]
  }

  // chooses workout style ("AMRAP")
  chooseStyle = () => {
    let style = null;
    const lowVol = ["As Many Rounds As Possible In", "Every Minute On The Minute","3 Rounds For Time"]
    const medVol = ["As Many Rounds As Possible In", "Every 2 Minutes On The Minute", "4 Rounds For Time"]
    const hiVol = ["Every 3 Minutes On The Minute", "5 Rounds For time"]
    if(this.state.timeDomain >= 5 || this.state.timeDomain <= 10){
      return style = this.getOption(lowVol)
    } else if (this.state.timeDomain >= 11 || this.state.timeDomain <= 20){
      return style = this.getOption(medVol)
    } else {
      return style = this.getOption(hiVol)
      }
    }


  numberOfMovements = (style) => {
    // debugger
    let numberOfMovements = null;
    if(style === "As Many Rounds As Possible In" || style === "Every Minute On The Minute" || style === "3 Rounds For Time" || style === "Every 2 Minutes On The Minute"){
      return numberOfMovements = Math.floor(Math.random() * (3 - 2) + 2)
    } else {
      return numberOfMovements = Math.floor(Math.random() * (4 - 3) + 3)
    }
  }

  chooseMovements = (numberOfMovements) => {
    // debugger
    let number = this.props.movements.length - numberOfMovements
    let chosenMovements = this.props.movements.sort( function() { return 0.5 - Math.random()}).slice(number)
    return chosenMovements
  }

  assignReps = () => {
    console.log("in assign reps")
    // seconds per movement
    // only if EMOM 
  }


  render(){
    let numbers = []
    for (var i = 5; i <= 60; i++) { numbers.push(i) }

    return(
      <div>
        <h1>Workout Container</h1>
        <form className="time-domain-form" onChange={this.handleChange}>
          Enter Time Domain:
          <select>
            {numbers.map((n, i) => <option value={n} key={i}>{n}</option>)}
          </select>
        </form>
        <div className="ui grid">
          <div className="eight wide column">
            <NewWorkoutDisplay names={this.props.names} movements={this.props.movements}/>
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
