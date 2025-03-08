const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    //in reducer state must be composed of immutable objects
    //state.push(action.payload)
    return state.concat(action.payload)
  }

  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload] 
      //return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE': 
      const id = action.payload.id
      const noteToChange = state.find(n=> n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }

      return state.map(note => note.id !== id ? note : changedNote)
    default: 
      return state
  }
}

export default noteReducer