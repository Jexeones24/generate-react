import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {

  logout = () => {
    localStorage.clear()
  }

  // want to say logged in if logged out, vice versa
  // say profile if on home, vice versa
  render(){
    // debugger
    return(
      <div>
        <Menu pointing secondary>
          <Menu.Menu position='right'>
            <NavLink to="/"><Menu.Item name='home'/></NavLink>
            {(this.props.loggedIn === false) ? <NavLink to="/login"><Menu.Item name='login'/></NavLink> : <NavLink to="/login"><Menu.Item name='logout' onClick={this.logout}/></NavLink>}
            <NavLink to="/signup"><Menu.Item name='signup'/></NavLink>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }

}
