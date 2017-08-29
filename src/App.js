import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Profile from './components/Profile'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserAdapter from './adapters/UserAdapter'
import SessionAdapter from './adapters/SessionAdapter'
import authorize from './authorize'
import { workoutNames } from './movementData'


class App extends Component {
  constructor(){
    super();

    this.state = {
      movements: [],
      names: workoutNames,
      demoVideo: [],
      loggedIn: false,
      currentUser: {}
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

  createUser = (user) => {
    UserAdapter.createUser(user)
    .then( user => {
      this.setState({
      currentUser: user,
      loggedIn: true
    })
    localStorage.setItem('token', user.jwt)}
    )
  }


  getUser = (username, password) => {
    console.log("in get user")
    SessionAdapter.getUser(username, password)
      .then( data => {
        localStorage.setItem('token', data.jwt)
        this.setState({ loggedIn: true, currentUser: data })
      })
    }

  logout = () => {
    this.setState({loggedIn: false, currentUser: {}})
    localStorage.token = ""
    this.props.history.push("login")
  }

  renderLogin = (params) => {
    return(
      <Login getUser={this.getUser} history={params.history} loggedIn={this.state.loggedIn}/>
    )
  }

  renderSignUp = (params) => {
    return(
      <Signup createUser={this.createUser} history={params.history} loggedIn={this.state.loggedIn}/>
    )
  }

  renderHome = (params) => {
    const AuthorizedHome = authorize(Home, {loggedIn: this.state.loggedIn, logout: this.logout, currentUser: this.state.currentUser, movements: this.state.movements, names: this.state.names, renderVideo: this.renderVideo })
    return(
      <AuthorizedHome />
    )
  }

  renderProfile = () => {
    const AuthorizedProfile = authorize(Profile, {logout: this.logout, currentUser: this.state.currentUser, getUser: this.getUser, movements: this.state.movements })
    return(
      <AuthorizedProfile />
    )
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar loggedIn={this.props.loggedIn} logout={this.logout} />
            <Route exact path="/" render={this.renderHome} />
            <Route exact path="/profile" render={this.renderProfile} />
            <Route exact path="/login" render={this.renderLogin} />
            <Route exact path="/signup" render={this.renderSignUp} />
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
