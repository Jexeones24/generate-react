import React, { Component } from 'react'
import {Redirect} from 'react-router'
import { Grid, Image } from 'semantic-ui-react'
import StopwatchContainer from './StopwatchContainer'
import WorkoutContainer from './WorkoutContainer'
import WorkoutDetail from './WorkoutDetail'
import { workoutNames } from '../movementData'


export default class Home extends Component {
  constructor(){
    super();

    this.state = {
      movements: [],
      names: workoutNames,
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/movements")
    .then( resp => resp.json())
      .then( movements => this.setState({ movements }))
  }

  render(){
    return(
      <div>
        <Grid centered columns={2}>
          <Grid.Column>
            <div className="stopwatch-container">
            <StopwatchContainer />
            </div>
          </Grid.Column>
        </Grid>
        <Grid celled>
          <Grid.Row>
          </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <div className="workout-container">
            <WorkoutContainer movements={this.state.movements} names={this.state.names} timeDomain={this.timeDomain}/>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="workout-detail">
            <WorkoutDetail />
            </div>
          </Grid.Column>
          </Grid.Row>
        </Grid>
    </div>
    )
  }
}
