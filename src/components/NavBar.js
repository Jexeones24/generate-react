import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {

  render(){
    return(
      <div>
        <Menu pointing secondary>
          <Menu.Menu position='right'>
            <NavLink to="/"><Menu.Item name='home'/></NavLink>
            <NavLink to="/login"><Menu.Item name='login'/></NavLink>
            <NavLink to="/signup"><Menu.Item name='signup'/></NavLink>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }

}
