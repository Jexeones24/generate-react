import React from 'react'

const Detail = ({workouts}) => {
  // debugger
  return(
    <div>
      {workouts.map((w, i) => <p key={i}>{w.name}</p>)}
    </div>
  )
}

export default Detail

// put the workout together again
// workouts = [{…}, {…}]
  // let names = workouts.map((w) => w.name)

// workout.chosen_movements ["1", "2", "3"]


// workout.reps ["1", "2", "3"]
// style = "3 Rounds For Time"
