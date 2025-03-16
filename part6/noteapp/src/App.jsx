import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import noteService from './services/notes'
//import { setState } from './reducers/noteReducer'
import { initializeNotes } from './reducers/noteReducer'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'


function App() {
  const dispatch = useDispatch()

  const hook = () => {
    // noteService.getAll()
    //   .then(notes=> dispatch(setState(notes)))
    dispatch(initializeNotes())
  }

  useEffect(hook, [])

  // const filterSelected = value => {
  //   console.log(value)
  // }

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
      <VisibilityFilter />
      {/* <div>
        all <input type='radio' name='filter' onChange={() => filterSelected('ALL')}/>
        important <input type='radio' name='filter' onChange={() => filterSelected('IMPORTANT')}/>
        nonimportant <input type='radio' name='filter' onChange={() => filterSelected('NONIMPORTANT')}/>
      </div> */}
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
