import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class SignUp extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  componentWillReceiveProps(props) {
     if (props.loggedIn) {
       props.history.push('/profile')
     }
  }

    handleChange = (e) => {
    const property = e.target.name
    const value = e.target.value
    this.setState({
      [property]:value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createUser(this.state)
  }

  render(){
    console.log(this.state)
    return(
      <div className="signup">
        <h1>SIGNUP</h1>
        <Form onSubmit={this.handleSubmit}>
           <Form.Field onChange={this.handleChange} value={this.state.username}>
             <label>Username</label>
             <input type="text" placeholder='Username' name="username" />
           </Form.Field>
           <Form.Field onChange={this.handleChange}value={this.state.email}>
             <label>Email</label>
             <input placeholder='Email' name="email" />
           </Form.Field>
           <Form.Field onChange={this.handleChange} value={this.state.password}>
             <label>Password</label>
             <input placeholder='Password' type="password" name="password"/>
           </Form.Field>
           <Button type='submit'>Submit</Button>
         </Form>
      </div>
    )
  }
}

export default SignUp
