import React, { Component } from 'react';
import './App.css';
import { movements, workoutNames } from './movementData'
import NavBar from './components/NavBar'
import StopwatchContainer from './components/StopwatchContainer'
import WorkoutContainer from './components/WorkoutContainer'
// import { Grid, Image } from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super();

    this.state = {
      movements: movements,
      names: workoutNames
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <NavBar />
          <StopwatchContainer />
        </div>
        <div>
          <WorkoutContainer movements={this.state.movements} names={this.state.names} timeDomain={this.timeDomain}/>
        </div>
      </div>
    );
  }
}

export default App;
