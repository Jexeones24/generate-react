import React, { Component } from 'react';
import './App.css';
import { workoutNames } from './movementData'
import NavBar from './components/NavBar'
import StopwatchContainer from './components/StopwatchContainer'
import WorkoutContainer from './components/WorkoutContainer'
import WorkoutDetail from './components/WorkoutDetail'
import { Grid, Image } from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super();

    this.state = {
      movements: [],
      names: workoutNames
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/movements")
    .then( resp => resp.json())
      .then( movements => this.setState({ movements }))
  }

  render() {
    return (
      <div className="App">
      <NavBar />
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
    );
  }
}

export default App;
