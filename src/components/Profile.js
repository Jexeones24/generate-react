import React, { Component } from 'react'
import { Grid, Image, Card, Icon, Button, Input, Statistic } from 'semantic-ui-react'
import SessionAdapter from '../adapters/SessionAdapter'
import WorkoutAdapter from '../adapters/WorkoutAdapter'
import { Link } from 'react-router-dom';
import authorize from '../authorize'
import Detail from './Detail'
import Filter from './Filter'

class Profile extends Component {
  constructor(){
    super();

    this.state = {
      allWorkouts: [],
      workouts: [],
      currentUser: {},
      loggedIn: false,
      term: "",
      filteredWorkouts: []
    }
  }

  componentDidMount(){
    SessionAdapter.currentUser()
      .then(currentUser => {
        console.log("currentUser", currentUser)
        this.setState({currentUser, loggedIn: true})
      })
      .then( () => {
      WorkoutAdapter.getWorkouts(this.state.currentUser)
      .then( workouts => {
        console.log("workouts", workouts)
        this.setState({ workouts })
      })
    })
    fetch('http://localhost:3000/api/v1/workouts')
      .then( resp => resp.json())
      .then( allWorkouts => {
        console.log("allWorkouts", allWorkouts)
      this.setState({ allWorkouts })
    })
  }

  filteredWorkouts = (term) => {
    console.log("in profile", term)
    // debugger
    this.setState({ term })
    let workouts = this.state.allWorkouts
    let filteredWorkouts = this.state.allWorkouts.filter((w) =>
    w.name.toLowerCase().includes(term))
    // return filteredWorkouts
    this.setState({ filteredWorkouts })
  }


  render(){
    // debugger
    let day = ("0" + new Date().getDate()).slice(-2);
    let month = ("0" + (new Date().getMonth() + 1)).slice(-2);
    let today = new Date().getFullYear() + "-" + (month) + "-" + (day);
    let wod = this.state.workouts

    // why doesn't this work?
    // console.log(wod.filter((w) => w.created_at.substring(0, w.created_at.indexOf("T")) === today))

    console.log(this.state.workouts[0])
    return(
      <div>
        <div className="upper-profile">
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card>
                  <Image    src='https://images.unsplash.com/photo-1498309313100-e308c8946b45?dpr=2&auto=format&fit=crop&w=1199&h=1798&q=80&cs=tinysrgb&crop=' />
                  <Card.Content>
                  <Card.Header>
                    <div>{this.props.currentUser.username}</div>
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      Joined in 2017
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    {this.props.currentUser.username} is a human being living on Planet Earth.
                  </Card.Description>
                </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      22 Friends
                    </a>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <div className="stats">
                  <h1>STATS</h1>
                  <h3>Workouts Completed Today:</h3>
                  {wod.map((w, i) => <p key={i}>{w.name}</p>)}
                  <Statistic color='orange' value={this.state.workouts.length} label='Total Workouts'/>
                </div>
              </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        <Grid celled>
        <Grid.Row>
          <Grid.Column width={8}>
            <div className="">
              <h1 className="last-workout">WORKOUT DETAILS</h1>
              <Filter allWorkouts={this.state.allWorkouts} filteredWorkouts={this.filteredWorkouts}/>
              <div>
              <Detail workouts={this.state.filteredWorkouts}/>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Profile
