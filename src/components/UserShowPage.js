import React, { Component } from 'react'
import { Grid, Image, Card, Icon, } from 'semantic-ui-react'
import SessionAdapter from '../adapters/SessionAdapter'
import WorkoutAdapter from '../adapters/WorkoutAdapter'

export default class UserShowPage extends Component {
  constructor(){
    super();

    this.state = {
      workouts: [], //user's workouts
      currentUser: {},
      loggedIn: false
    }
  }

  componentWillReceiveProps(props) {
     {props.loggedIn ? props.history.push('home') : props.history.push('login')}
   }

  componentDidMount(){
    console.log("Mounting Main")
    SessionAdapter.currentUser()
      .then(currentUser => {
        console.log("Current User",currentUser)
        this.setState({currentUser, loggedIn: true})
      })
      .then( () => {
        console.log("Getting Workouts", this.state.currentUser)
        WorkoutAdapter.getWorkouts(this.state.currentUser)
          .then( workouts => {
            console.log(workouts)
            this.setState({ workouts })
          })
      })

}

  render(){
    // debugger
    return(
      <div>
        USERSHOWPAGE
          <Grid centered columns={4}>
            <Grid.Column>
              <div className="">
                <Card>
                  <Image src='https://images.unsplash.com/photo-1498309313100-e308c8946b45?dpr=2&auto=format&fit=crop&w=1199&h=1798&q=80&cs=tinysrgb&crop=' />
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
                      Jessica is a human being living on Planet Earth.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='user' />
                      22 Friends
                    </a>
                  </Card.Content>
                </Card>
              </div>
            </Grid.Column>
          </Grid>
          <Grid celled>
            <Grid.Row>
            </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <div className="stats">
                STATS
                <li>workouts completed today</li>
                <li>workouts completed this week</li>
                <li>workouts completed this month</li>
                <li>total workouts</li>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className="last-workout">
                LAST WORKOUT
                {this.state.workouts.map((w) => <li>{w}</li>)}
              </div>
            </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}
