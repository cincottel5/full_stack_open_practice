import { useState } from 'react'
import Note from './components/Note'

// const Note =  ({note}) => {
//   return (
//     <li>
//       {note.content}
//     </li>
//   )
// }

//const App = (props) => {
//const App = ({notes}) => {
const App = (props) => {
  
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note')
  //const [notes, setNotes] = useState([props.notes])  
  //const { notes } = props

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note}/>
          // <li key={note.id}>{note.content}</li>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        {/* <input/> */}
        <button type="Submit">save</button>
      </form>
    </div>
  )

}

export default App
