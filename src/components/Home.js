import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import StopwatchContainer from './StopwatchContainer'
import WorkoutContainer from './WorkoutContainer'
import DemoVideo from './DemoVideo'


export default class Home extends Component {
  constructor(){
    super();
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
            <WorkoutContainer movements={this.props.movements} names={this.props.names} timeDomain={this.timeDomain} renderVideo={this.props.renderVideo} currentUser={this.props.currentUser}/>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="workout-detail">
              <DemoVideo url={this.props.demoVideo}/>
            </div>
          </Grid.Column>
          </Grid.Row>
        </Grid>
    </div>
    )
  }
}
