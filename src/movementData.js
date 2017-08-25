const movements = [
  {
    id: 1,
    name: "Back Squat",
    description: "Powerlifting",
    skill: "Low",
    secondsPer: 3,
    loads: {
      light: 95,
      moderate: 135,
      heavy: 205
    },
  },
  {
    id: 2,
    name: "Pullup",
    description: "Gymnastics",
    skill: "Moderate",
    secondsPer: 3,
    loads: {
      light: "Bodyweight",
      moderate: 10,
      heavy: 45
    },
  },
  {
    id: 3,
    name: "Deadlift",
    description: "Powerlifting",
    skill: "Low",
    secondsPer: 4,
    loads: {
      light: 135,
      moderate: 225,
      heavy: 315
    },
  },
  {
    id: 4,
    name: "Muscle-Up",
    description: "Gymnastics",
    skill: "High",
    secondsPer: 10,
    loads: {
      light: null,
      moderate: null,
      heavy: null
    },
  },
  {
    id: 5,
    name: "Wallball",
    description: "Odd-object",
    skill: "Low",
    secondsPer: 4,
    loads: {
      light: 14,
      moderate: 20,
      heavy: 30
    },
  }
]

const workoutNames = [
  "Ball Crusher", "Whipped Cream", "Cake Cake Cake", "Thor", "Heaven & Hell"
]

export { movements, workoutNames }
