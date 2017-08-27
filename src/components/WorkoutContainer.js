import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import NewWorkoutDisplay from './NewWorkoutDisplay'
import DemoVideo from './DemoVideo'
import WorkoutAdapter from '../adapters/WorkoutAdapter'

export default class WorkoutContainer extends Component {
  constructor(){
    super();

    this.state = {
      timeDomain: 5,
      workoutName: "",
      workoutStyle: "",
      chosenMovements: [],
      repsPer: []
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ timeDomain: e.target.value })
    let workoutName = this.props.names[Math.floor(Math.random() * this.props.names.length)]
    let workoutStyle = this.chooseStyle()
    let numberOfMovements = this.numberOfMovements(workoutStyle)
    let chosenMovements = this.chooseMovements(numberOfMovements)
    let repsPer = chosenMovements.map((m) => this.assignReps(m))
    this.makeWorkout(workoutName, workoutStyle, chosenMovements, repsPer)
  }

  // save entire workout here
  makeWorkout = (workoutName, workoutStyle, chosenMovements, repsPer) => {
    this.setState({
      workoutName,
      workoutStyle,
      chosenMovements,
      repsPer
    })
    WorkoutAdapter.createWorkout(workoutName)
  }

  getOption = (optionsArr) => {
     return optionsArr[Math.floor(Math.random() * optionsArr.length)]
  }

  chooseStyle = () => {
    let style = null;
    const lowVol = ["As Many Rounds As Possible In", "Every Minute On The Minute For","3 Rounds For Time"]
    const medVol = ["As Many Rounds As Possible In", "Every 2 Minutes On The Minute For", "4 Rounds For Time"]
    const hiVol = ["Every 3 Minutes On The Minute For", "5 Rounds For time"]
    if(this.state.timeDomain >= 5 || this.state.timeDomain <= 10){
      return style = this.getOption(lowVol)
    } else if (this.state.timeDomain >= 11 || this.state.timeDomain <= 20){
      return style = this.getOption(medVol)
    } else {
      return style = this.getOption(hiVol)
      }
    }


  numberOfMovements = (style) => {
    let numberOfMovements = null;
    if(style === "As Many Rounds As Possible In" || style === "Every Minute On The Minute" || style === "3 Rounds For Time" || style === "Every 2 Minutes On The Minute"){
      return numberOfMovements = Math.floor(Math.random() * (3 - 2) + 2)
    } else {
      return numberOfMovements = Math.floor(Math.random() * (4 - 3) + 3)
    }
  }

  chooseMovements = (numberOfMovements) => {
    let number = this.props.movements.length - numberOfMovements
    let chosenMovements = this.props.movements.sort( function() { return 0.5 - Math.random()}).slice(number)
    return chosenMovements
  }

  assignReps = (m) => {
    let reps = null;
    if (m.description === "Cardio"){
      return reps = m.seconds_per
    } else if(m.skill === "High"){
      return reps = Math.floor(Math.random() * (8 - 3) + 3)
    } else if (m.skill === "Moderate"){
      return reps = Math.floor(Math.random() * (15 - 9) + 9)
    } else {
      return reps = Math.floor(Math.random() * (40 - 16) + 16)
    }
  }

  displayVideo = (e) => {
    let video = this.props.movements.filter((m) => m.name === e[1])
    this.props.renderVideo(video)
  }

  render(){
    let numbers = []
    for (var i = 5; i <= 60; i++) { numbers.push(i) }
    return(
      <div>
        <form className="time-domain-form" onSubmit={this.handleSubmit}>
          Enter Time Domain:
          <select>
            {numbers.map((n, i) => <option value={n} key={i}>{n}</option>)}
          </select>
          <button name="submit">Gener8</button>
        </form>
          <div className="workout-display">
            <NewWorkoutDisplay
            workoutName={this.state.workoutName}
            timeDomain={this.state.timeDomain} workoutStyle={this.state.workoutStyle} chosenMovements={this.state.chosenMovements} repsPer={this.state.repsPer} video={this.displayVideo}/>
        </div>
      </div>
    )
  }
}
