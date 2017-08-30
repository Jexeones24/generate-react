import React, { Component } from 'react'
import { Grid, Image, Card, Icon, Button, Input, Statistic, Dropdown, Menu } from 'semantic-ui-react'
import SessionAdapter from '../adapters/SessionAdapter'
import WorkoutAdapter from '../adapters/WorkoutAdapter'
import { Link } from 'react-router-dom';
import authorize from '../authorize'
import Detail from './Detail'

class Profile extends Component {
  constructor(){
    super();

    this.state = {
      workouts: [],
      currentUser: {},
      loggedIn: false,
      term: "",
      filteredWorkouts: []
    }
  }

  // componentWillReceiveProps(props) {
  //    {props.loggedIn ? props.history.push('home') : props.history.push('login')}
  //  }

  componentDidMount(){
    SessionAdapter.currentUser()
      .then(currentUser => {
        this.setState({currentUser, loggedIn: true})
      })
      .then( () => {
      WorkoutAdapter.getWorkouts(this.state.currentUser)
      .then( workouts => {
        this.setState({ workouts })
      })
    })
  }

  handleChange = (e) => {
    let term = e.target.value
    let filteredWorkouts = this.state.workouts.filter((w) =>
      w.name.includes(term))
      this.setState({ filteredWorkouts })
  }


  render(){
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear() + "-" + (month) + "-" + (day);
    let wodsToday = this.state.workouts.filter((w) => { return w.created_at.substring(0, w.created_at.indexOf("T")) === today })
    let filterOptions = [ { key: 'All', value: 'All', text: 'All' }, { key: 'Name', value: 'Name', text: 'Name' }, { key: 'Movements', value: 'Movements', text: 'Movements' }, { key: 'Month', value: 'Month', text: 'Month' } ]

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
                  {wodsToday.map((w, i) => <p key={i}>{w.name}</p>)}
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
              <Menu vertical>
                <Menu.Item>
                  <Link to={"/"}>Gener8</Link>
                </Menu.Item>
                <Dropdown text='Month' pointing='left' className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>January</Dropdown.Item>
                    <Dropdown.Item>February</Dropdown.Item>
                    <Dropdown.Item>March</Dropdown.Item>
                    <Dropdown.Item>April</Dropdown.Item>
                    <Dropdown.Item>May</Dropdown.Item>
                    <Dropdown.Item>June</Dropdown.Item>
                    <Dropdown.Item>July</Dropdown.Item>
                    <Dropdown.Item>August</Dropdown.Item>
                    <Dropdown.Item>September</Dropdown.Item>
                    <Dropdown.Item>October</Dropdown.Item>
                    <Dropdown.Item>November</Dropdown.Item>
                    <Dropdown.Item>December</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
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
