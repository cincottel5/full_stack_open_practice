const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  }
]

const initialUser = {
  username: 'test',
  name: 'Testuser',
  password: 'test'
}

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethisson'})
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInBd = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInBd = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialUserInDb = async () => 
  await User.findOne({username: initialUser.username})


module.exports = {
  initialNotes, 
  initialUser,
  nonExistingId, 
  notesInBd,
  usersInBd,
  initialUserInDb
}