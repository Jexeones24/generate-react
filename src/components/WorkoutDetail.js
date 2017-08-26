import React, { Component } from 'react'
import ReactPlayer from 'react-player'


export default class WorkoutDetail extends Component {

  render(){
    return(
      <div>
        <h1>DEMO VIDEOS</h1>
        <ReactPlayer url='https://www.youtube.com/watch?v=EiqEFUFM-KI' playing />
     </div>
    )
  }
}
