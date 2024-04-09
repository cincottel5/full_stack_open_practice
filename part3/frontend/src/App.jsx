import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import axios from 'axios'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinky 2024</em>
    </div>
  )
}

//const App = (props) => {
const App = () => {

  //const [notes, setNotes] = useState(props.notes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // useEffect(() => {
  //   console.log('effect')

  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }, [])

  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }

  // const hook = () => {
  //     //console.log('effect')

  //     const eventHandler = response => {
  //       //console.log('promise fulfilled')
  //       setNotes(response.data)
  //     }

  //     const promise = axios.get('http://localhost:3001/notes')
  //     promise.then(eventHandler)
  // }

  //useEffect(hook, [])

  // useEffect(()=> {
  //   noteService
  //     .getAll()
  //     .then(response => {
  //       setNotes(response.data)
  //     })
  // }, [])

  useEffect(()=> {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  //console.log('render', notes.length, 'notes')

  const toggleImportanceOf = (id) => {
    //console.log(`importance of ${id} needs to be toggled`)
    //const url = `http://localhost:3001/notes/${id}`
    //const note = notes.find(n => n.id === id)
    //const changedNote = {...note, important: !note.important}

    // axios.put(url, changedNote).then(response => {
    //   console.log('response', response)
    //   setNotes(notes.map(n=> n.id !== id ? n : response.data))
    // })

    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(n=> n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note ${note.content} was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n=> n.id !== id)) 
        //alert(`the note ${note.content} was already deleted from server`)
        //setNotes(notes.filter(n=> n.id !== id))
      })
      // .then(response => {
      //   setNotes(notes.map(n=> n.id !== id ? n : response.data))
      // })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      //id: notes.length + 1,
    }

    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response => {
    //     console.log(response)
    //     setNotes(notes.concat(response.data))
    //     setNewNote('')
    //   })
    
  
    //setNotes(notes.concat(noteObject))
    //setNewNote('')

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      // .then(response => {
      //   setNotes(notes.concat(response.data))
      //   setNewNote('')
      // })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={()=>toggleImportanceOf(note.id)} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
      <Footer/>
    </div>
  )
}

export default App
