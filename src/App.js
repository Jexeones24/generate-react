import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import UserShowPage from './components/UserShowPage'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserAdapter from './adapters/UserAdapter'
import SessionAdapter from './adapters/SessionAdapter'


class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedIn: false,
      currentUser: {}
    }
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

  // this gives an undefined token
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

  // where did params come from?
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
    return(
      <Home
        history={params.history}
        loggedIn={this.state.loggedIn}
        logout={this.logout}/>
    )
  }


  renderUser = () => {
    return(
      <UserShowPage logout={this.logout} currentUser={this.state.currentUser} getUser={this.getUser}/>
    )
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar loggedIn={this.props.loggedIn} logout={this.logout} />
            <Route exact path="/" render={this.renderHome} />
            <Route exact path="/login" render={this.renderLogin} />
            <Route exact path="/signup" render={this.renderSignUp} />
            <Route exact path="/user" render={this.renderUser} />
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
