import React from 'react'

const NewWorkoutDisplay = ({names, movements}) => {
  // console.log("in new workout", names, movements)
  return(
    <div>
      <h2>WORKOUT NAME:</h2>
      <li>movement1</li>
      <li>movement2</li>
      <li>movement3</li>
    </div>
  )
}

export default NewWorkoutDisplay
