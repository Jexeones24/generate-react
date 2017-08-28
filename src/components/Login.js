import React, { Component } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

export default class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: ""
    }
  }

  componentWillReceiveProps(props) {
     if (props.loggedIn) {
       props.history.push('/profile')
     }
  }

  handleChange = (e) => {
    const value = e.target.value
    const property = e.target.name
    this.setState({ [property]:value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getUser(this.state)
  }

  render(){
    return(
      <div className="login">
        <h1>LOGIN</h1>
        <Segment inverted>
          <Form inverted onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input type="text" name="username"
              label="Username" value={this.state.username}
              onChange={this.handleChange} />
              <Form.Input type="password" name="password"
              label="Password" value={this.state.password}
              onChange={this.handleChange}/>
            </Form.Group >
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    </div>
    )
  }
}
