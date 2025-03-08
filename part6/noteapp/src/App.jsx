import { useSelector, useDispatch } from 'react-redux'

import NewNote from './components/NewNote'
import Notes from './components/Notes'


function App() {
  //const dispatch = useDispatch()
  //const notes = useSelector(state => state)

  // const addNote = event => {
  //   event.preventDefault()
  //   const content = event.target.note.value
  //   event.target.note.value = ''
  //   dispatch(createNote(content))
  // }

  // const toggleImportance = id => 
  //   dispatch(toggleImportanceOf(id))
  
  return (
    <div>
      <NewNote />
      {/* <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form> */}
      <Notes />
      {/* <ul>
        {notes.map(note =>
          <li
            key={note.id} 
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul> */}
    </div>
  )
}

export default App
