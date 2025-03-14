import { useState } from 'react'

// const NoteForm = ({ onSubmit, handleChange, value}) => {
const NoteForm = ({ createNote }) => {

  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = event => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id='note-input'
          value={newNote}
          onChange={handleChange}
          placeholder='write note content here' />

        {/* <input value="a" /> */}
        {/* <input value={newNote} onChange={event => setNewNote(event.target.value)} /> */}
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm