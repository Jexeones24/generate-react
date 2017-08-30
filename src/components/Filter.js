import React, { Component } from 'react'
import { Menu, Form, Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class Filter extends Component {
  constructor(){
    super();

  }

  handleChange = (e) => {
    console.log("in filter", e.target.value)
    let term = e.target.value
    this.props.filteredWorkouts(term)
  }

  render(){
    return(
      <div className="filter">
        <Form onChange={this.handleChange}>
          <Form.Field inline>
            <Input placeholder='Filter by..' />
          </Form.Field>
        </Form>
        <Button>
          <Link to={"/"}>Gener8</Link>
        </Button>
      </div>
    )
  }
}
