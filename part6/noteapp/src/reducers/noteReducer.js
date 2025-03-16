import { createSlice, current } from "@reduxjs/toolkit"
import noteService from '../services/notes'

// const initialState = [
//   {
//     content: 'reducers defines how redux store works',
//     important: true,
//     id: 1
//   },
//   {
//     content: 'state of store can contain any data',
//     important: true,
//     id: 2
//   }
// ]

//const generateId = () => Number((Math.random()) * 1000000).toFixed(0)

const noteSlice = createSlice({
  name: 'notes',
  // initialState,
  initialState: [],
  reducers: {
    // createNote(state, action) {
    //   const content = action.payload
    //   // state.push({
    //   //   content, 
    //   //   important: false,
    //   //   id: generateId()
    //   // })
    //   state.push(action.payload)
    // },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n=> n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      //console.log(current(state))
      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setState(state, action) {
      return action.payload
    }
  }
})

export const { toggleImportanceOf, appendNote, setState } = noteSlice.actions
export default noteSlice.reducer

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setState(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

// const noteReducer = (state = initialState, action) => {
//   //console.log('ACTION', action)
//   if (action.type === 'NEW_NOTE') {
//     //in reducer state must be composed of immutable objects
//     //state.push(action.payload)
//     return state.concat(action.payload)
//   }

//   switch (action.type) {
//     case 'NEW_NOTE':
//       return [...state, action.payload] 
//       //return state.concat(action.payload)
//     case 'TOGGLE_IMPORTANCE': 
//       const id = action.payload.id
//       const noteToChange = state.find(n=> n.id === id)
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important
//       }

//       return state.map(note => note.id !== id ? note : changedNote)
//     default: 
//       return state
//   }
// }



// export const createNote = content => ({
//   type: 'NEW_NOTE',
//   payload: {
//     content: content,
//     important: true,
//     id: generateId()
//   }
// })

// export const toggleImportanceOf = id => ({
//   type: 'TOGGLE_IMPORTANCE',
//   payload: { id }
// })

// export default noteReducer