import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    //in reducer state must be composed of immutable objects
    //state.push(action.payload)
    return state.concat(action.payload)
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id:2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note =>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important': ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App/>)
}

renderApp()
store.subscribe(renderApp)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
