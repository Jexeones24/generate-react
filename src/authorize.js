// we want a function that always spits out a new function that knows how to do auth

import React from 'react'
import PropTypes from 'prop-types'

function authorize(SomeComponent, inheritedProps) {
  console.log("Authorizing")
  return class extends React.Component {

    static contextTypes = {
      router: PropTypes.object
    }

    componentDidMount() {
      console.log("authorize mounted")
      if (!localStorage.getItem('token')) {
        this.context.router.history.push('login')
      }
    }

      render() {
        return (
          <SomeComponent {...inheritedProps}/>
        )
      }
  }
}

export default authorize
