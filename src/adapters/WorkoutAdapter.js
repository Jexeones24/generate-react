const path = 'http://localhost:3000/api/v1/workouts'

export default class WorkoutAdapter {

  static getWorkouts(currentUser) {
    return fetch(path, {
      headers: headers()
    })
      .then( resp => resp.json())
      .then( workouts => {
        return workouts.filter((w) => w.user_id === currentUser.id)
      })
    }

  static createWorkout(workoutName, workoutStyle, movementObjs, repsPer, currentUser) {
    let moveArr = movementObjs.map((m) => m.reps)
    return fetch(path, {
      method: 'post',
      headers: headers(),
      body: JSON.stringify({
        workout :{
          name: workoutName,
          style: workoutStyle,
          chosen_movements: moveArr,
          reps: repsPer,
          user_id: currentUser.id
        }
      })
    })
    .then( resp => resp.json())
  }
}

let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}
