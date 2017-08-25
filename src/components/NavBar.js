import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class NavBar extends Component {

  render(){
    return(
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home'/>
          <Menu.Item name='messages'/>
          <Menu.Item name='friends' />
          <Menu.Menu position='right'>
            <Menu.Item name='logout' />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }

}
