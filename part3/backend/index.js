require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

//const http = require('http')

/**
 * Dummy data
 */
// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

/**
 * Mongo configuration
 */
// const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.rrian.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.set('strictQuery', false)

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean
// })

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Note = mongoose.model('Note', noteSchema)

/**
 * Middlewares
 * 
 */
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(requestLogger)


// const app = http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'application/json'})
//   response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  
  // const note  = notes.find(note => note.id === id)
  // //const note = notes.find(note => {
  //   //console.log(note.id, typeof note.id, id, typeof id, note.id === id)
  //   //return note.id === id
  //   //note.id === id
  // //})
  // //console.log(note)

  // if (note) {
  //   response.json(note)
  // } else {
  //   response.status(404).end()
  // } 

  //response.json(note)

  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
      //console.log(error)
      //response.status(400).send({error: 'malformatted id'})
    })
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  
  // if (!body.content) {
  //   return response.status(400).json({error: 'content missing'})
  // }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
    //id: generateId()
  })

  //const note = request.body
  //note.id = maxId + 1
  //notes = notes.concat(note)
  //response.json(note)

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

app.get('/api/notes', (request, response) => {
  //response.json(notes)
  Note.find({}).then(notes =>{
    response.json(notes)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  
  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  //const id = Number(request.params.id)
  //notes = notes.filter(note => note.id !== id)
  //response.status(204).end()

  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({eror: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message})
  }

  next(error)
}

app.use(errorHandler)



//const PORT = process.env.PORT  || 3001
const PORT = process.env.PORT
//app.listen(PORT)
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})
//console.log(`Server running on port ${PORT}`)
//console.log("Hello world")