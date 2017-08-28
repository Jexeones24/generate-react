import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import StopwatchContainer from './StopwatchContainer'
import WorkoutContainer from './WorkoutContainer'
import DemoVideo from './DemoVideo'
import { workoutNames } from '../movementData'


export default class Home extends Component {
  constructor(){
    super();

    this.state = {
      movements: [],
      names: workoutNames,
      demoVideo: []
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/movements")
    .then( resp => resp.json())
      .then( movements => this.setState({ movements }))
  }

  renderVideo = (video) => {
    let demoVideo = video[0].url
    this.setState({ demoVideo })
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
            <WorkoutContainer movements={this.state.movements} names={this.state.names} timeDomain={this.timeDomain} renderVideo={this.renderVideo} currentUser={this.props.currentUser}/>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="workout-detail">
              <DemoVideo url={this.state.demoVideo}/>
            </div>
          </Grid.Column>
          </Grid.Row>
        </Grid>
    </div>
    )
  }
}
