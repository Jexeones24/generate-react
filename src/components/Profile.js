import React, { Component } from 'react'
import { Grid, Image, Card, Icon, Button } from 'semantic-ui-react'
import SessionAdapter from '../adapters/SessionAdapter'
import WorkoutAdapter from '../adapters/WorkoutAdapter'
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  constructor(){
    super();

    this.state = {
      workouts: [],
      currentUser: {},
      loggedIn: false
    }
  }

  componentWillReceiveProps(props) {
     {props.loggedIn ? props.history.push('home') : props.history.push('login')}
   }

  componentDidMount(){
    SessionAdapter.currentUser()
      .then(currentUser => {
        this.setState({currentUser, loggedIn: true})
      })
      .then( () => {
        WorkoutAdapter.getWorkouts(this.state.currentUser)
          .then( workouts => {
            console.log(workouts)
            this.setState({ workouts })
          })
      })
    }

  render(){
    // debugger
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear() + "-" + (month) + "-" + (day);
    let wodsToday = this.state.workouts.filter((w) => { return w.created_at.substring(0, w.created_at.indexOf("T")) === today })

    return(
      <div>
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
              </div>
            </Grid.Column>
          </Grid>
          <Grid celled>
            <Grid.Row>
            </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <div className="stats">
                <h1>STATS</h1>
                <div className="stats">
                  <h3>Workouts Completed Today:</h3>
                  {wodsToday.map((w, i) => <li key={i}>{w.name}</li>)}
                  <h3>Workouts This Week:</h3>
                  <h3>Workouts This Month:</h3>
                  <h3>Total Workouts:</h3>
                  <p>{this.state.workouts.length}</p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className="last-workout">
                <h1>LAST WORKOUT</h1>
                <div>
                  {/* {this.state.workouts.slice(-1)[0].name} */}
                </div>
              </div>
              <Link to={"/"}><Button id="gener8">Gener8</Button></Link>
            </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}
