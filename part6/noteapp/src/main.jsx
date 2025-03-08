
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
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
