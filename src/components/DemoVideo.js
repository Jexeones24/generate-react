import React from 'react'
import ReactPlayer from 'react-player'


const DemoVideo = ({ url }) => {

    return(
      <div>
        <h1>DEMO VIDEOS</h1>
        <ReactPlayer url={url} playing />
     </div>
    )
}

export default DemoVideo
