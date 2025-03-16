
import { createRoot } from 'react-dom/client'
// import { createStore, combineReducers } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
//import noteReducer, { appendNote, setState } from './reducers/noteReducer'
//import filterReducer from './reducers/filterReducer'
//import noteService from './services/notes'
import setStore from './store'

// const reducers = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

//const store = createStore(noteReducer)
//const store = createStore(reducers)
// const store = configureStore({
//   reducer: {
//     notes: noteReducer,
//     filter: filterReducer
//   }
// })

// noteService.getAll().then(notes => {
//   // notes.forEach(note => {
//   //   store.dispatch(appendNote(note))
//   // })
//   store.dispatch(setState(notes))
// })

//console.log(store.getState())

//store.subscribe(() => console.log(store.getState()))
//store.dispatch(filterChange('IMPORTANT'))
//store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

createRoot(document.getElementById('root')).render(
    <Provider store={setStore()}>
      <App />
    </Provider>
)


// const noteReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'NEW_NOTE': 
//       return state.concat(action.payload)
//     case 'TOGGLE_IMPORTANCE':
//       return { ...state, important: !state.important}
//   }

//   if (action.type === 'NEW_NOTE') {
//     //in reducer state must be composed of immutable objects
//     //state.push(action.payload)
//     return state.concat(action.payload)
//   }

//   return state
// }

//const store = createStore(noteReducer)

// const generateId = () => Number((Math.random()) * 1000000).toFixed(0)

// const createNote = content => ({
//   type: 'NEW_NOTE',
//   payload: {
//     content: content,
//     important: true,
//     id: generateId()
//   }
// })

// const toggleImportanceOf = id => ({
//   type: 'TOGGLE_IMPORTANCE',
//   payload: { id }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'state changes are made with actions',
//     important: false,
//     id:2
//   }
// })

// store.dispatch(createNote('the app state is in redux store'))
// store.dispatch(createNote('state changes are made with actions'))


// const App = () => {
//   const addNote = event => {
//     event.preventDefault()
//     const content = event.target.note.value
//     event.target.note.value = ''
//     store.dispatch(createNote(content))
//     // store.dispatch({
//     //   type: 'NEW_NOTE',
//     //   payload: {
//     //     content,
//     //     important: false,
//     //     id: generateId()
//     //   }
//     // })
//   }

//   const toggleImportance = id => {
//     store.dispatch(toggleImportanceOf(id))
//     // store.dispatch({
//     //   type: 'TOGGLE_IMPORTANCE',
//     //   payload: { id }
//     // })
//   }

//   return(
//     <div>
//       <form onSubmit={addNote}>
//         <input type="text" name="note" />
//         <button type="button">add</button>
//       </form>
//       <ul>
//         {store.getState().map(note =>
//           <li 
//             key={note.id}
//             onClick={() => toggleImportance(note.id)}
//           >
//             {note.content} <strong>{note.important ? 'important': ''}</strong>
//           </li>
//         )}
//       </ul>
//     </div>
//   )
// }

// const root = createRoot(document.getElementById('root'))

// const renderApp = () => {
//   root.render(<App/>)
// }

// renderApp()
// store.subscribe(renderApp)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
