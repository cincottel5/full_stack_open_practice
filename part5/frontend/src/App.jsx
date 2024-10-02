import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import NoteForm from './components/NoteForm'
import axios from 'axios'
import noteService from './services/notes'
import loginService from './services/login'

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
const App = () => {

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  //const [newNote, setNewNote] = useState('')
  //const [loginVisible, setLoginVisible] = useState(false)
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    //event.preventDefault()

    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      
    } catch (exception) {

      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note ${note.content} was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (noteObject) => {
    // event.preventDefault()
    // const noteObject = {
    //   content: newNote,
    //   important: Math.random() > 0.5,
    // }

    noteFormRef.current.toggleVisibility()

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        //setNewNote('')
      })
  }

  // const handleNoteChange = (event) => {
  //   setNewNote(event.target.value)
  // }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const loginForm = () => {
    //const hideWhenVisible = { display: loginVisible ? 'none': ''}
    //const showWhenVisible = { display: loginVisible ? '' : 'none'}
    
    return (
      <Toggable buttonLabel="login">
        <LoginForm
          // username={username}
          // password={password}
          // handleUsernameChange={({ target }) => setUsername(target.value)}
          // handlePasswordChange={({ target}) => handlePasswordChange(target.value)}
          // handleSubmit={handleLogin}
          handleLogin={handleLogin}
        />
      </Toggable>
    )

    // return (

    //   <div>
        
    //     <div style={hideWhenVisible}>
    //       <button onClick={() => setLoginVisible(true)}>log in</button>
    //     </div>

    //     <div style={showWhenVisible}>
    //       <LoginForm
    //         username={username}
    //         password={password}
    //         handleUsernameChange={({target}) => setUsername(target.value)}
    //         handlePasswordChange={({target}) => setPassword(target.value)}
    //         handleSubmit={handleLogin}
    //       />
    //       <button onClick={()=> setLoginVisible(false)}>cancel</button>
    //     </div>
    //   </div>


    // <form onSubmit={handleLogin}>
    //   <div>
    //     username
    //     <input
    //       type="text"
    //       value={username}
    //       name="Username"
    //       onChange={({ target }) => setUsername(target.value)}
    //     />
    //   </div>

    //   <div>
    //     password
    //     <input
    //       type="password"
    //       value={password}
    //       name="Password"
    //       onChange={({ target }) => setPassword(target.value)}
    //     />
    //   </div>
    //   <button type="submit">login</button>
    // </form>
  // )
  }

  const noteForm = () => (
    <Toggable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm 
        // onSubmit={addNote}
        // value={newNote}
        // handleChange={handleNoteChange}
        createNote={addNote}
      />
    </Toggable>
  )


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {/* {user === null && loginForm()}
      {user !== null && noteForm()} */}
      { user === null
        ? loginForm()
        : 
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App
