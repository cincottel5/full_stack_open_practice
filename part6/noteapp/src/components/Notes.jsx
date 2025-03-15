import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"
import noteService from '../services/notes'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''} </strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  //const notes = useSelector(state => state)
  // const notes = useSelector(state => state.notes)
  // const notes = useSelector(state => {
  //   if (state.filter === 'ALL')
  //     return state.notes
  //   return state.filter === 'IMPORTANT'
  //     ? state.notes.filter(note => note.important)
  //     : state.notes.filter(note => !note.important)
  // })
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') return notes
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const toggleImportance = async (note) => {
    const updatedNote = {...note, important: !note.important}
    const newNote = await noteService.updateNote(updatedNote)
    dispatch(toggleImportanceOf(newNote.id))
  }


  return (
    <ul>
      {notes.map(note => 
        <Note 
          key={note.id}
          note={note}
          handleClick={() => toggleImportance(note) }
        />
      )}
    </ul>
  )
}

export default Notes