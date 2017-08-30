import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import NewWorkoutDisplay from './NewWorkoutDisplay'
import DemoVideo from './DemoVideo'
import WorkoutAdapter from '../adapters/WorkoutAdapter'

export default class WorkoutContainer extends Component {
  constructor(){
    super();

    this.state = {
      timeDomain: null,
      currentUser: {},
      workoutName: "",
      workoutStyle: "",
      movementObjs: [],
      repsPer: []
    }
  }

  handleChange = (e) => {
    let timeDomain = e.target.value
    this.setState({ timeDomain })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let currentUser = this.props.currentUser
    this.setState({ currentUser })
    let workoutName = this.props.names[Math.floor(Math.random() * this.props.names.length)]
    let workoutStyle = this.chooseStyle()
    let movementObjs = this.chooseMovements()
    let repsPer = movementObjs.map((m) => m.reps)
    this.setWorkoutState(workoutName, workoutStyle, movementObjs, repsPer, currentUser)
  }

  setWorkoutState = (workoutName, workoutStyle, movementObjs, repsPer, currentUser) => {
    this.setState({
      workoutName,
      workoutStyle,
      movementObjs,
      repsPer,
      currentUser
    })
    WorkoutAdapter.createWorkout(workoutName, workoutStyle, movementObjs, repsPer, currentUser)
    .then( workout => { console.log(workout) })
  }

  getOption = (optionsArr) => {
     return optionsArr[Math.floor(Math.random() * optionsArr.length)]
  }

  chooseStyle = () => {
    let style = null;
    const styleArray = ["As Many Rounds As Possible", "Every Minute On The Minute", "3 Rounds For Time", "4 Rounds For Time"]
    return style = this.getOption(styleArray)
  }

  chooseMovements = () => {
    let number = this.props.movements.length - 3
    let chosenMovements = this.props.movements.sort( function() { return 0.5 - Math.random()}).slice(number)
    return chosenMovements
  }

  displayVideo = (e) => {
    let video = this.props.movements.filter((m) => m.name === e[1])
    this.props.renderVideo(video)
  }

  render(){
    let numbers = []
    for (var i = 10; i <= 25; i++) { numbers.push(i) }
    return(
      <div>
        <form className="time-domain-form" onSubmit={this.handleSubmit}>
          <h1>Enter Time Domain: </h1>
          <select className="time-domain-select"    onChange={this.handleChange}>
            {numbers.map((n, i) => <option value={n} key={i}>{n}</option>)}
          </select>
          <Button color='green' className="generate-button">Gener8</Button>
        </form>
          <div className="workout-display">
            <NewWorkoutDisplay
            workoutName={this.state.workoutName}
            timeDomain={this.state.timeDomain} workoutStyle={this.state.workoutStyle} chosenMovements={this.state.movementObjs} repsPer={this.state.repsPer} video={this.displayVideo}/>
        </div>
      </div>
    )
  }
}
