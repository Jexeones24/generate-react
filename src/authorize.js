import React from 'react'
import PropTypes from 'prop-types'

function authorize(SomeComponent, inheritedProps) {
  return class extends React.Component {

    static contextTypes = {
      router: PropTypes.object
    }

    componentDidMount() {
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
