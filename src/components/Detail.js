import React from 'react'

const Detail = ({workouts}) => {
  return(
    <div>
      {workouts.map((w, i) => <p key={i}>{w.name}</p>)}
    </div>
  )
}

export default Detail
